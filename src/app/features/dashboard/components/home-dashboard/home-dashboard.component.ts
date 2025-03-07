import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit{
  quantidadeArquivo!: number | string;
  quantidadeTipoArquivo!: number | string;

  constructor(
    private _dashboardService: DashboardService
  ){}

  ngOnInit(): void {
    this.quantidadeArquivoCadastrado();
    this.quantidadeTipoArquivoCadastrado();
  }

  quantidadeArquivoCadastrado(){
    this._dashboardService
    .getQuantidadeArquivoCadastrado()
    .subscribe({
      next: (qtdArquivo) => {
        this.quantidadeArquivo = qtdArquivo;
      },
      error: (err) => {
        this.quantidadeArquivo = 'Erro';
      }
    })
  }

  quantidadeTipoArquivoCadastrado(){
    this._dashboardService
    .getQuantidadeTipoArquivoCadastrado()
    .subscribe({
      next: (qtdTipoArquivo) => {
        this.quantidadeTipoArquivo = qtdTipoArquivo;
      },
      error: (err) => {
        this.quantidadeTipoArquivo = 'Erro';
      }
    })
  }

}
