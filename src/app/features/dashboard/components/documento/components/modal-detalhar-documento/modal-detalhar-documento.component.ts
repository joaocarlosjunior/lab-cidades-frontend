import { Component, Inject, OnInit } from '@angular/core';
import { DownloadArquivo } from '../../../../../../shared/class/DownloadArquivo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentoService } from '../../../../../../shared/services/documento.service';
import { ToastrService } from 'ngx-toastr';
import { Documento } from '../../../../../../core/models/Documento';

@Component({
  selector: 'app-modal-detalhar-documento',
  templateUrl: './modal-detalhar-documento.component.html',
  styleUrl: './modal-detalhar-documento.component.scss',
})
export class ModalDetalharDocumentoComponent implements OnInit{
  documento!: Documento;
  nomeArquivoCadastrado: string = '';
  urlArquivoCadastrado: string = '';

  downloadArquivo!: DownloadArquivo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalDetalharDocumentoComponent>,
    private _documentoService: DocumentoService,
    private _toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.setModalData(this.data.id);
  }

  setModalData(idDocumento: number){
    this._documentoService
    .getDocumentoByCode(idDocumento)
    .subscribe({
      next: (documento: Documento) => {
        this.documento = documento;
      },
      error: (error) => {
        this._toastr.error('Tente novamente', 'Erro ao buscar documento')
      }
    })
  }

  onClickFecharModal(){
    this._ref.close();
  }

  onClickDownloadArquivo(idDocumento: number){
    this.downloadArquivo = new DownloadArquivo(
      this._documentoService,
      this._toastr
    );
    this.downloadArquivo.downloadArquivo(idDocumento);
  }
}
