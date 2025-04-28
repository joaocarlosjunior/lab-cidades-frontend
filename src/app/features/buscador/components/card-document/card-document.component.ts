import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../../../../core/models/Document';
import { DownloadFile } from '../../../../shared/class/DownloadFile';
import { DocumentService } from '../../../../shared/services/document.service';

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrl: './card-document.component.scss',
})
export class CardDocumentComponent {
  @Input({ required: true }) documentList: Document[] = [];
  @Input({required: true}) pageIndex!: number;
  @Input({required: true}) pageSize!: number;
  downloadFile!:DownloadFile;

  constructor(
    private _documentService: DocumentService,
    private _toastr: ToastrService
  ) {}

  onClickDownloadFile(documentId: number){
    this.downloadFile = new DownloadFile(this._documentService, this._toastr);
    this.downloadFile.downloadFile(documentId);
  }

}
