import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../../../../core/models/Document';
import { DownloadFile } from '../../../../shared/class/DownloadFile';
import { DocumentService } from '../../../../shared/services/document.service';

@Component({
  selector: 'app-detalhes-documento',
  templateUrl: './detalhes-documento.component.html',
  styleUrl: './detalhes-documento.component.scss'
})
export class DetalhesDocumentoComponent implements OnInit{
  document: Document = {} as Document;
  downloadFile!: DownloadFile;
  private destroyRef = inject(DestroyRef)

  constructor(
    private _route: ActivatedRoute,
    private _documentService: DocumentService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !isNaN(+id)) {
        this.searchDocumentById(+id);
      } else {
        this._toastr.error('ID inválido', 'Erro');
      }
    });
  }

  private searchDocumentById(id: number): void {
    if (id) {
      this._documentService.getDocumentById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (document) => {
          this.document = document;
        },
        error: (err) => {
          this._toastr.error('','Erro ao retornar documento')
        }
      })
    }
  }

  onClickDownloadFile(idDocument: number){
    this.downloadFile = new DownloadFile(this._documentService, this._toastr);
    this.downloadFile.downloadFile(idDocument);
  }

}
