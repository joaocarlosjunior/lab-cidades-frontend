import { Component, Input, OnInit } from '@angular/core';
import { ArquivoService } from '../../shared/services/arquivo.service';
import { Arquivo } from '../../shared/model/Arquivo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent implements OnInit{
  arquivos!: Observable<Arquivo[]>;
  searchTriggered = false;
  arquivosEncontrados = false;
  contentHeight = '400px';
  textoDigitado!: string;

  constructor(private arquivoService: ArquivoService){ }

  ngOnInit(): void { }

  setAssunto(assunto: string) {
    this.searchTriggered = true; // A pesquisa foi disparada
    this.textoDigitado = assunto;
    this.arquivos = this.arquivoService.buscarAssunto(assunto);

    this.arquivos.subscribe({
      next: (data) => {
        this.arquivosEncontrados = data.length > 0; // Verifica se há arquivos
        this.contentHeight = this.arquivosEncontrados ? 'auto' : '400px';
      },
      error: (err) => {
        this.arquivosEncontrados = false; // Reseta o estado de arquivos encontrados
      },
    });
  }
}
