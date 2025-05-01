import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToggleComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  forms = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    remember: new FormControl(false)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.verificarLoginSalvo();
  }

  salvar() {
    this.forms.markAllAsTouched();

    if (this.forms.valid) {
      const nome = this.forms.value.user!;
      const senha = this.forms.value.password!;
      const lembrar = this.forms.value.remember;

      this.authService.login(nome, senha).subscribe({
        next: (usuario) => {
          if (lembrar) {
            this.localStorageService.set('loginSalvo', { nome, senha });
            console.log('Login salvo no localStorage!');
          } else {
            this.localStorageService.remove('loginSalvo');
            console.log('Login não será salvo');
          }

          this.router.navigate(['/home']);
        },
        error: (erro) => {
          console.error('Erro ao fazer login', erro);
          alert('E-mail ou senha inválidos');
        }
      });
    }
  }

  verificarLoginSalvo() {
    const loginSalvo = this.localStorageService.get<{ nome: string, senha: string }>('loginSalvo');
    if (loginSalvo) {
      this.forms.patchValue({
        user: loginSalvo.nome,
        password: loginSalvo.senha,
        remember: true
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.forms.get(nomeCampo);
    return campo?.invalid && campo?.touched || false;
  }
  onToggleChange(estado: boolean): void {
    this.forms.get('remember')?.setValue(estado);
  }
}
