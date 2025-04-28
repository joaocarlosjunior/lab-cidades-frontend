import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../../core/models/Document';
import { DocumentService } from '../../shared/services/document.service';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {
  documentList: Document[] = [];
  searchStarted: boolean = false;
  documentNotFound = false;
  currentSearch!: string;
  loading: boolean = false;
  advancedSearch: boolean = false;
  currentForm!: FormGroup;
  currentSource!: number;
  currentQueryAdvancedSearch!: string;
  isAdvancedSearch: boolean = false;
  private destroyRef = inject(DestroyRef);

  @ViewChild(BuscadorFormComponent)
  buscadorFormComponent!: BuscadorFormComponent;

  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _documentService: DocumentService,
    private _toatrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event: Event) => {
      if (
        event instanceof NavigationEnd &&
        isPlatformBrowser(this.platformId)
      ) {
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const subjectSearch = params['q'];
      if (subjectSearch !== this.currentSearch && subjectSearch !== undefined) {
        this.setSearchSubject(subjectSearch, this.pageIndex, this.pageSize);
      }
    });
  }

  private setSearchSubject(query: string, pageIndex: number, pageSize: number) {
    this.loading = true;

    if (query !== this.currentSearch) {
      pageIndex = this.pageIndex;
      pageSize = this.pageSize;
    }

    this.currentSearch = query;

    this._documentService
      .searchSubject(query.trim(), pageIndex, pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (document) => {
          this.loading = false;
          this.documentList = document.content;
          this.length = document.page.totalElements;
          this.pageSize = document.page.size;
          this.pageIndex = document.page.number;
        },
        error: () => {
          this.loading = false;
          this.documentNotFound = true;
          this.documentList = [];
          this.length = 0;
        },
      });
  }

  async setAdvancedSearch(
    form: FormGroup,
    pageIndex: number = 0,
    pageSize: number = 10
  ) {
    try {
      this.loading = true;
      const [query, source] = await Promise.all([
        this.generateQueryAdvancedSearch(form),
        this.getDocumentType(form),
      ]);

      if (
        query !== this.currentQueryAdvancedSearch &&
        source !== this.currentSource
      ) {
        pageIndex = this.pageIndex;
        pageSize = this.pageSize;
      }

      this.currentForm = form;
      this.currentQueryAdvancedSearch = query;
      this.currentSource = source;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { advanced: query, source: source },
      });

      this._documentService
        .searchAdvanced(query, source, pageIndex, pageSize)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (document) => {
            this.loading = false;
            this.documentList = document.content;
            this.length = document.page.totalElements;
            this.pageSize = document.page.size;
            this.pageIndex = document.page.number;
          },
          error: () => {
            this.loading = false;
            this.documentNotFound = true;
            this.documentList = [];
            this.length = 0;
          },
        });
    } catch (error) {
      this._toatrService.error('Por favor recarregue a página e tente novamente', 'Erro ao realizar busca');
    }
  }

  checkAdvancedSearch(event: boolean) {
    this.isAdvancedSearch = event;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setSearchSubject(this.currentSearch, this.pageIndex, this.pageSize);
  }

  onPageChangeAdvancedSearch(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setAdvancedSearch(this.currentForm, this.pageIndex, this.pageSize);
  }

  private generateQueryAdvancedSearch(formGroup: FormGroup): Promise<string> {
    const formFilters = formGroup.get('filters')?.value;

    if (!formFilters || formFilters.length === 0) {
      throw new Error('Erro ao realizar busca');
    }

    const groups: string[] = [];
    let currentGroup: string[] = [];
    formFilters.forEach((filters: any, index: number) => {
      const { filter, searchTerm, operator } = filters;
      const filterExpression = `${filter}:contains(${searchTerm})`;

      if (index === 0) {
        // O primeiro filtro inicia o primeiro grupo
        currentGroup.push(filterExpression);
      } else if (operator === 'AND') {
        // Filtros com 'AND' permanecem no mesmo grupo
        currentGroup.push(filterExpression);
      } else if (operator === 'OR') {
        // Se for 'OR', fecha o grupo atual e inicia um novo
        if (currentGroup.length > 0) {
          groups.push(`(${currentGroup.join(' AND ')})`);
        }
        currentGroup = [filterExpression];
      }
    });

    // Adicionar o último grupo a query
    if (currentGroup.length > 0) {
      groups.push(`(${currentGroup.join(' AND ')})`);
    }

    // Unir todos os grupos com OR
    return Promise.resolve(groups.join(' OR '));
  }

  private getDocumentType(form: FormGroup): Promise<number> {
    return Promise.resolve(form.get('documentType')?.value);
  }
}
