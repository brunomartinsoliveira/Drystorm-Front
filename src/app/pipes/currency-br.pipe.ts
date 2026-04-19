import { Pipe, PipeTransform } from '@angular/core';

// ✅ Pipe customizado para formato de moeda BR — reutilizável e otimizado
@Pipe({
  name: 'currencyBr',
  standalone: true,
  pure: true   // ← pure: true = só roda quando o valor muda (default, mas explícito)
})
export class CurrencyBrPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
