import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit{
  quantidadeDocumento!: number | string;
  quantidadeTipoDocumento!: number | string;

  constructor(
    private _dashboardService: DashboardService
  ){}

  ngOnInit(): void {
    this.quantidadeDocumentoCadastrado();
    this.quantidadeTipoDocumentoCadastrado();
  }

  quantidadeDocumentoCadastrado(){
    this._dashboardService
    .getQuantidadeDocumentoCadastrado()
    .subscribe({
      next: (qtdDocumento) => {
        this.quantidadeDocumento = qtdDocumento;
      },
      error: (err) => {
        this.quantidadeDocumento = 'Erro';
      }
    })
  }

  quantidadeTipoDocumentoCadastrado(){
    this._dashboardService
    .getQuantidadeTipoDocumentoCadastrado()
    .subscribe({
      next: (qtdTipoDocumento) => {
        this.quantidadeTipoDocumento = qtdTipoDocumento;
      },
      error: (err) => {
        this.quantidadeTipoDocumento = 'Erro';
      }
    })
  }

}
