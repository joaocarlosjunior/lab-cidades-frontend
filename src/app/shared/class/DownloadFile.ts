import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../services/document.service';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class DownloadFile {
  private destroyRef = inject(DestroyRef);

  constructor(
    private _documentService: DocumentService,
    private _toastr: ToastrService
  ) {}

  downloadFile(idFile: number) {
    if (idFile !== null) {
      this._documentService
        .downloadFile(idFile)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            try {
              const mimeType =
                response.body?.type || 'application/octet-stream';

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
            } catch (error) {
              this._toastr.error('', 'Erro ao baixar arquivo');
            }
          },
          error: () => {
            this._toastr.error('', 'Erro ao baixar arquivo');
          },
        });
    }
  }

  private getFilenameFromContentDisposition(
    contentDisposition: string | null
  ): string | null {
    if (!contentDisposition) {
      return null;
    }

    const matches = /filename="([^"]+)"/.exec(contentDisposition);
    return matches && matches[1] ? matches[1] : null;
  }
}
