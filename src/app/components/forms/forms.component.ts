import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {

  forms = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });


  salvar() {
    this.forms.markAllAsTouched();

    if (this.forms.valid) {
      console.log("Valores digitados", this.forms.value);
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.forms.get(nomeCampo);
    return campo?.invalid && campo?.touched && (campo?.errors?.['required'] || campo?.errors?.['email']) || false;
  }
}
