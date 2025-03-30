import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arquivo } from '../../../../core/models/Arquivo';
import { DownloadArquivo } from '../../../../shared/class/DownloadArquivo';
import { DocumentoService } from '../../../../shared/services/documento.service';

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
    private _documentoService: DocumentoService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !isNaN(+id)) {
        this.buscarArquivoPorId(+id);
      } else {
        this._toastr.error('ID inválido', 'Erro');
      }
    });
  }

  buscarArquivoPorId(id: number): void {
    if (id) {
      this._documentoService.getArquivoByCode(id)
      .subscribe({
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
    this.downloadArquivo = new DownloadArquivo(this._documentoService, this._toastr);
    this.downloadArquivo.downloadArquivo(arquivoId);
  }
}
