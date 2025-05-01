import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, SidebarComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  exibirCard = true;
  isSidebarOpen = false;

  fecharCard(): void {
    this.exibirCard = false;
  }

  mostrarCard(): void {
    this.exibirCard = true;
  }

  onSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
