import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Cidade } from '../../core/models/Cidade';

// Validador personalizado para verificar se o valor de cidade é uma instância válida de Cidade
export function cidadeValida(cidadeOptions: Cidade[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cidadeSelecionada = control.value;
    
    const cidadeValida = cidadeOptions.some(
      (cidade) => cidade.id === cidadeSelecionada?.id
    );

    return cidadeValida ? null : { cidadeInvalida: true };
  };
}