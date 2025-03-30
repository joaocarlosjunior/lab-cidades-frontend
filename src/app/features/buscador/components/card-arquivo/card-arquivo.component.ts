import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Arquivo } from '../../../../core/models/Arquivo';
import { DownloadArquivo } from '../../../../shared/class/DownloadArquivo';
import { DocumentoService } from '../../../../shared/services/documento.service';

@Component({
  selector: 'app-card-arquivo',
  templateUrl: './card-arquivo.component.html',
  styleUrl: './card-arquivo.component.scss',
})
export class CardArquivoComponent {
  @Input({ required: true }) arquivosList: Arquivo[] = [];
  @Input({required: true}) pageIndex!: number;
  @Input({required: true}) pageSize!: number;
  downloadArquivo!:DownloadArquivo;

  constructor(
    private _documentoService: DocumentoService,
    private _toastr: ToastrService
  ) {}

  onDownloadArquivo(arquivoId: number){
    this.downloadArquivo = new DownloadArquivo(this._documentoService, this._toastr);
    this.downloadArquivo.downloadArquivo(arquivoId);
  }

}
