import { ToastrService } from "ngx-toastr";
import { ArquivoService } from "../services/arquivo.service";

export class DownloadArquivo{
    constructor(
        private _arquivoService: ArquivoService,
        private _toastr: ToastrService
    ){}

    downloadArquivo(arquivoId: number) {
        if (arquivoId !== null) {
          this._arquivoService.downloadArquivo(arquivoId).subscribe({
            next: (response: any) => {
              const mimeType = response.body?.type || 'application/octet-stream';
              const file = new Blob([response.body!], {
                type: mimeType,
              });
    
              const contentDisposition = response.headers.get(
                'Content-Disposition'
              );
    
              const fileName =
                this.getFilenameFromContentDisposition(contentDisposition);
    
              const blob = window.URL.createObjectURL(file);
    
              const link = document.createElement('a');
              link.href = blob;
              link.download = fileName || 'arquivo';
    
              link.click();
    
              window.URL.revokeObjectURL(blob);
              link.remove();
            },
            error: () =>{
              this._toastr.error('','Erro ao baixar arquivo');
            }           
          });
        }
      }
    
      private getFilenameFromContentDisposition(
        contentDisposition: string | null
      ): string | null {
        if (!contentDisposition) return null;
    
        const filenameUtf8Match = /filename\*\s*=\s*UTF-8''(.+)/i.exec(
          contentDisposition
        );
        if (filenameUtf8Match && filenameUtf8Match[1]) {
          return decodeURIComponent(filenameUtf8Match[1].trim());
        }
    
        return null;
      }
}
