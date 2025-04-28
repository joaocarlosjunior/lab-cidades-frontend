import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
import { DocumentTypeService } from '../../../../../../shared/services/document-type.service';
import { DocumentTypeDataSource } from '../../datasource/DocumentTypeDataSource';
import { ModalFormTipoDocumentoComponent } from '../modal-form-tipo-documento/modal-form-tipo-documento.component';

@Component({
  selector: 'app-tabela-tipo-documento',
  templateUrl: './tabela-tipo-documento.component.html',
  styleUrl: './tabela-tipo-documento.component.scss',
})
export class TabelaTipoDocumentoComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'id',
    'tipoDocumento',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];

  documentTypeDataSource!: DocumentTypeDataSource;
  loading!: boolean;
  private destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializerDataSource();
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    this.configurePagination();
  }

  private initializerDataSource(): void {
    this.documentTypeDataSource = new DocumentTypeDataSource(
      this._documentTypeService,
      this._toastr,
      this.destroyRef
    );

    this.documentTypeDataSource.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => (this.loading = loading));
  }

  private loadInitialData(): void {
    this.documentTypeDataSource.loadPaginatedDocumentTypes();
  }

  private configurePagination(): void {
    this.documentTypeDataSource.counter$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((total) => (this.paginator.length = total));

    this.paginator.page
      .pipe(
        tap(() => this.loadDocumentTypes()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  loadDocumentTypes(): void {
    this.documentTypeDataSource.loadPaginatedDocumentTypes(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  onClickEditDocumentTypeByIdDocumentType(idDocumentType: number): void {
    this.openModalDocumentType(idDocumentType, 'Editar Tipo Documento');
  }

  onClickDeleteDocumentTypeByIdDocumentType(idDocumentType: number): void {
    this._documentTypeService
    .deleteDocumentType(idDocumentType)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this._toastr.success('Tipo Documento removido com sucesso');
        this.adjustPaginationAfterDeletingDocumentType();
      },
      error: () => this._toastr.error('Erro ao remover tipo documento'),
    });
  }

  private adjustPaginationAfterDeletingDocumentType(): void {
    this.documentTypeDataSource.counterTipoDocumentoPage$
      .pipe(take(1))
      .subscribe((total) => {
        if (total - 1 === 0) {
          this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
        }
        this.loadDocumentTypes();
      });
  }

  private openModalDocumentType(id: number, titulo: string): void {
    this._dialog
      .open(ModalFormTipoDocumentoComponent, {
        width: 'auto',
        height: 'auto',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: { tituloModal: titulo, id },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadDocumentTypes());
  }
}
