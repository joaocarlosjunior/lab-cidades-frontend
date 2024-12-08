import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { DownloadArquivo } from '../../../../shared/class/DownloadArquivo';

@Component({
  selector: 'app-card-arquivo',
  templateUrl: './card-arquivo.component.html',
  styleUrl: './card-arquivo.component.scss',
})
export class CardArquivoComponent {
  @Input({ required: true }) arquivosList: Arquivo[] = [];
  downloadArquivo!:DownloadArquivo;

  constructor(
    private _arquivoService: ArquivoService,
    private _toastr: ToastrService
  ) {}

  onDownloadArquivo(arquivoId: number){
    this.downloadArquivo = new DownloadArquivo(this._arquivoService, this._toastr);
    this.downloadArquivo.downloadArquivo(arquivoId);
  }

}
