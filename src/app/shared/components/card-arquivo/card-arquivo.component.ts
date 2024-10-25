import { Component, Input } from '@angular/core';
import { Autor } from '../../../core/models/Autor';

@Component({
  selector: 'app-card-arquivo',
  templateUrl: './card-arquivo.component.html',
  styleUrl: './card-arquivo.component.scss'
})
export class CardArquivoComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) autores!: Autor[];
  @Input({required: true}) description!: string;
  @Input({required: true}) yearPublication!: number;
  @Input({required: true}) urlArchive!: string;
  @Input({required: true}) index!: number;

}
