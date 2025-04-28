import {
  Component,
  DestroyRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DocumentTypeService } from '../../../../../../shared/services/document-type.service';
import { TabelaTipoDocumentoComponent } from '../tabela-tipo-documento/tabela-tipo-documento.component';

@Component({
  selector: 'app-modal-form-tipo-documento',
  templateUrl: './modal-form-tipo-documento.component.html',
  styleUrl: './modal-form-tipo-documento.component.scss',
})
export class ModalFormTipoDocumentoComponent implements OnInit {
  documentTypeForm = new FormControl('', Validators.required);
  private destroyRef = inject(DestroyRef);

  @ViewChild(TabelaTipoDocumentoComponent)
  tipoArquivoTableComponent!: TabelaTipoDocumentoComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalFormTipoDocumentoComponent>,
    private _documentTypeService: DocumentTypeService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data.id !== 0) {
      this.setModalData(this.data.id);
    }
  }

  private setModalData(id: number) {
    this._documentTypeService
      .searchDocumentTypeById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (documentType) => {
          this.documentTypeForm.setValue(documentType.nome_tipo_documento);
        },
        error: () => {
          this._toastr.error('', 'Erro ao buscar Tipo Arquivo');
          this.closeModal();
        },
      });
  }

  closeModal() {
    this._ref.close();
  }

  onSubmit() {
    let nameDocumentType = this.documentTypeForm.value as string;

    if (this.data.id === 0) {
      this._documentTypeService
        .registerDocumentType(nameDocumentType)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this._toastr.success('', 'Tipo Documento salvo com sucesso');
            this.documentTypeForm.reset();
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao salvar o tipo documento'
                );
                break;
              default:
                this._toastr.error('', 'Erro ao salvar tipo documento');
            }
          },
        });
    } else {
      this._documentTypeService
        .editDocumentType(this.data.id, nameDocumentType)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this._toastr.success('', 'Tipo Documento editado com sucesso');
            this.closeModal();
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao salvar o tipo documento'
                );
                break;
              default:
                this._toastr.error('', 'Erro ao editar tipo documento');
            }
          },
        });
    }
  }
}
