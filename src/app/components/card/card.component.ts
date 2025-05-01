import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  nomeUsuario: string = '';

  @Output() fechar = new EventEmitter<void>();

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    console.log('Dados do localStorage:', this.localStorageService.get('loginSalvo'));
    const loginSalvo = this.localStorageService.get<{ nome: string }>('loginSalvo');
    this.nomeUsuario = loginSalvo?.nome || 'Usuário';
    console.log('Nome usuário:', this.nomeUsuario);
  }

  fecharCard(): void {
    console.log('Fechar card clicado');
    this.fechar.emit();
  }
}
