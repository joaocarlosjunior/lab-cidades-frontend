import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../../../../../../core/models/Document';
import { DownloadFile } from '../../../../../../shared/class/DownloadFile';
import { DocumentService } from '../../../../../../shared/services/document.service';

@Component({
  selector: 'app-modal-detalhar-documento',
  templateUrl: './modal-detalhar-documento.component.html',
  styleUrl: './modal-detalhar-documento.component.scss',
})
export class ModalDetalharDocumentoComponent implements OnInit {
  document!: Document;
  downloadFile!: DownloadFile;
  private destroyRef = inject(DestroyRef);

  loading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalDetalharDocumentoComponent>,
    private _documentService: DocumentService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setModalData(this.data.id);
  }

  private setModalData(idDocument: number) {
    this.loading = true;
    this._documentService
      .getDocumentById(idDocument)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (document: Document) => {
          this.document = document;
        },
        error: () => {
          this._toastr.error('Tente novamente', 'Erro ao buscar documento');
        },
        complete: () => this.loading = false,
      });
  }

  onClickCloseModal() {
    this._ref.close();
  }

  onClickDownloadFile(idDocumento: number) {
    this.downloadFile = new DownloadFile(this._documentService, this._toastr);
    this.downloadFile.downloadFile(idDocumento);
  }
}
