import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { ModalArquivoFormComponent } from './components/modal-arquivo-form/modal-arquivo-form.component';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrl: './arquivo.component.scss',
})
export class ArquivoComponent implements OnInit{
  arquivoList: Arquivo[] = [];

  constructor(
    private _arquivoService: ArquivoService,
    private router: Router,
    private dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.carregarArquivos();
  }

  onClickEditarArquivo() {
    this.abrirArquivoModal(0, 'Editar Arquivo', ModalArquivoFormComponent);
  }

  onClickAdicionarArquivo() {
    this.abrirArquivoModal(0, 'Adicionar Arquivo', ModalArquivoFormComponent);
  }

  abrirArquivoModal(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '70%',
      height: '80vh',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      //this.carregarArquivos();
    });
  }

  deletarArquivo() {
    throw new Error('Method not implemented.');
  }

  editarArquivo() {
    throw new Error('Method not implemented.');
  }
}
