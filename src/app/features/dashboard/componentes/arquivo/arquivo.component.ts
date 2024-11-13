import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { ModalArquivoFormComponent } from './components/modal-arquivo-form/modal-arquivo-form.component';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrl: './arquivo.component.scss',
})
export class ArquivoComponent implements OnInit, OnDestroy, AfterViewInit{
  arquivoList: Arquivo[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  isViewChecked = false;

  constructor(
    private _arquivoService: ArquivoService,
    private router: Router,
    private dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

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
