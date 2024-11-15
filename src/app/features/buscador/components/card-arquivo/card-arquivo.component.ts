import { Component, Input } from '@angular/core';
import { Autor } from '../../../../core/models/Autor';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';

@Component({
  selector: 'app-card-arquivo',
  templateUrl: './card-arquivo.component.html',
  styleUrl: './card-arquivo.component.scss'
})
export class CardArquivoComponent {
  @Input({ required:true }) arquivosList: Arquivo[] = [];

  constructor(private _arquivoService: ArquivoService){}

  downloadArquivo(arquivoId: number){
    if (arquivoId !== null) {
      this._arquivoService.downloadArquivo(arquivoId).subscribe({
        next: (response: any) => {
          const mimeType = response.body?.type || 'application/octet-stream';
          const file = new Blob([response.body!], {
            type: mimeType
          });

          const contentDisposition = response.headers.get('Content-Disposition');
          let fileName = 'downloaded-file';
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?/);
            if (match) {
              fileName = match[1];
            }
          }
          

          const blob = window.URL.createObjectURL(file);

          const link = document.createElement('a');
          link.href = blob;
          link.download = fileName;

          link.click();

          window.URL.revokeObjectURL(blob);
          link.remove();
        },
        error: () => alert('Erro ao baixar o documento')
      });
    } else {
      alert('Insira um ID válido!');
    }
  }
}
