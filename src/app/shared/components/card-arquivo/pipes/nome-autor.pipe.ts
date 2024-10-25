import { Pipe, PipeTransform } from '@angular/core';
import { Autor } from '../../../../core/models/Autor';

@Pipe({
  name: 'nomeAutor'
})
export class NomeAutorPipe implements PipeTransform {

  transform(autores: Autor[]): string {
    if (!autores || autores.length === 0) {
      return '';
    }
    if (autores.length === 1) {
      return autores[0].nomeAutor;
    }
    
    return autores.map(autor => autor.nomeAutor).join(', ');
  }

}
