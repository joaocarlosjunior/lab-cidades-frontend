import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-arquivo',
  templateUrl: './card-arquivo.component.html',
  styleUrl: './card-arquivo.component.scss'
})
export class CardArquivoComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) autor!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) yearPublication!: string;
  @Input({required: true}) urlArchive!: string;
  @Input({required: true}) index!: number;

}
