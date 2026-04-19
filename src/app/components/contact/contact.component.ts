import {
  ChangeDetectionStrategy, Component, inject, signal
} from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators, AbstractControl
} from '@angular/forms';
import { fadeInUp } from '../../animations/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  // inject() ao invés de constructor(private fb: FormBuilder)
  private fb = inject(FormBuilder);

  // Signals para estado da UI — sem BehaviorSubject
  submitted  = signal(false);
  loading    = signal(false);
  success    = signal(false);

  // Reactive Forms com validadores declarativos
  form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  // Helpers para template
  field(name: string): AbstractControl {
    return this.form.get(name)!;
  }

  isInvalid(name: string): boolean {
    const f = this.field(name);
    return f.invalid && (f.dirty || f.touched || this.submitted());
  }

  errorFor(name: string): string {
    const errors = this.field(name).errors;
    if (!errors) return '';
    if (errors['required'])   return 'Campo obrigatório.';
    if (errors['email'])      return 'E-mail inválido.';
    if (errors['minlength']) {
      const { requiredLength } = errors['minlength'];
      return `Mínimo de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.';
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.loading.set(true);

    // Simula chamada HTTP — substitua por HttpClient real
    await new Promise(r => setTimeout(r, 1500));

    this.loading.set(false);
    this.success.set(true);
    this.form.reset();
    this.submitted.set(false);
  }
}
