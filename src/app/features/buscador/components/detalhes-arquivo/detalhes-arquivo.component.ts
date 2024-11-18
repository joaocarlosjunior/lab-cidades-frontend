import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { ToastrService } from 'ngx-toastr';
import { DownloadArquivo } from '../../../../shared/Class/DownloadArquivo';

@Component({
  selector: 'app-detalhes-arquivo',
  templateUrl: './detalhes-arquivo.component.html',
  styleUrl: './detalhes-arquivo.component.scss'
})
export class DetalhesArquivoComponent {
  arquivo: Arquivo = {} as Arquivo;
  downloadArquivo!: DownloadArquivo;

  constructor(
    private _route: ActivatedRoute,
    private _arquivoService: ArquivoService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.buscarArquivoPorId(+id);
      }
    });
  }

  buscarArquivoPorId(id: number): void {
    if (id) {
      this._arquivoService.getArquivoByCode(id).subscribe({
        next: (arquivo) => {
          this.arquivo = arquivo;
        },
        error: (err) => {
          this._toastr.error('','Erro ao retornar arquivo')
        }
      })
    }
  }

  onDownloadArquivo(arquivoId: number){
    this.downloadArquivo = new DownloadArquivo(this._arquivoService, this._toastr);
    this.downloadArquivo.downloadArquivo(arquivoId);
  }
}
