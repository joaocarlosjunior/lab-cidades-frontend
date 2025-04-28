import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
import { DocumentService } from '../../../../../../shared/services/document.service';
import { DocumentDataSource } from '../../datasource/DocumentDataSource';
import { ModalDetalharDocumentoComponent } from '../modal-detalhar-documento/modal-detalhar-documento.component';
import { ModalFormDocumentoComponent } from '../modal-form-documento/modal-form-documento.component';

@Component({
  selector: 'app-tabela-documento',
  templateUrl: './tabela-documento.component.html',
  styleUrl: './tabela-documento.component.scss',
})
export class TabelaDocumentoComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'id',
    'titulo',
    'anoPublicacao',
    'cidade',
    'estado',
    'mesorregiao',
    'tipoDocumento',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];
  documentDataSource!: DocumentDataSource;
  searchTerm: string = '';
  loading: boolean = true;
  private destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _documentService: DocumentService,
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(){
    this.initDataSource();
    this.configureSubscriptions();
  }

  ngAfterViewInit(){
    this.configurePagination();
    this.searchDocuments();
  }

  private initDataSource(){
    this.documentDataSource = new DocumentDataSource(
      this._documentService,
      this._toastr,
      this.destroyRef
    );
  }

  private configureSubscriptions(){
    this.documentDataSource.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.loading = loading;
        this._cdRef.detectChanges();
      });

    this.documentDataSource.counter$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((total) => {
          if (this.paginator) {
            this.paginator.length = total;
          }
        })
      )
      .subscribe();
  }

  private configurePagination(){
    this.paginator.page
      .pipe(
        tap(() => this.searchDocuments()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  searchDocumentsByTitle(event: Event){
    this.searchTerm = (event.target as HTMLInputElement).value.trim();
    this.paginator.pageIndex = 0;
    this.searchDocuments();
  }

  reloadTable(){
    this.searchTerm = '';
    this.searchDocuments();
  }

  private searchDocuments(){
    if (!this.paginator) return;

    if (this.searchTerm) {
      this.documentDataSource.getDocumentsByTitle(
        this.searchTerm,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    } else {
      this.documentDataSource.getPaginatedDocuments(
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }
  }

  onClickEditDocument(id: number){
    this.openModalDocument(id, 'Editar Documento');
  }

  onClickViewDetailDocument(idDocument: number){
    this._dialog.open(ModalDetalharDocumentoComponent, {
      width: '80vh',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { id: idDocument },
    });
  }

  onClickDeleteDocument(id: number){
    if (!id) {
      this._toastr.error('Documento inválido');
    }

    this._documentService
      .deleteDocument(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._toastr.success('Documento removido com sucesso');
          this.adjustPaginationAfterDeletingDocument();
        },
        error: () => this._toastr.error('Erro ao remover documento'),
      });
  }

  private adjustPaginationAfterDeletingDocument(){
    this.documentDataSource.counterNumeroDocumentoPorPagina$
      .pipe(take(1))
      .subscribe((total) => {
        if (total - 1 === 0) {
          this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
        }
        this.searchDocuments();
      });
  }

  private openModalDocument(id: number, title: string){
    this._dialog
      .open(ModalFormDocumentoComponent, {
        width: 'auto',
        height: '80vh',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          modalTitle: title,
          id: id
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.reloadTable());
  }
}
