import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
//Verifica se a arquivo ou url preenchido no form de cadastro de arquivo
export function arquivoValido(controlName1: string, controlName2: string): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const control1 = control.get(controlName1);
    const control2 = control.get(controlName2);

    if (!control1 || !control2) {
      return null;
    }

    const hasFile = control1.value instanceof File || control1.value;
    const hasUrl = control2.value && control2.value.trim() !== '';

    if (!hasFile && !hasUrl) {
      return { validator: true };
    }

    return null;
  };
}
