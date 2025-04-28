import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../../core/models/Author';

@Pipe({
  name: 'autores'
})
export class AutoresPipe implements PipeTransform {

  transform(authors: Author[]): string {
    if (!authors || authors.length === 0) {
      return '';
    }
    if (authors.length === 1) {
      return authors[0].nome_autor;
    }

    return authors.map(autor => autor.nome_autor).join(', ');
  }

}
