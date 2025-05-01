import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  toggleSidebar = false;
  showProfileMenu = false;
  theme: 'dark' | 'light' = 'dark';

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const saved = this.localStorageService.get<'dark' | 'light'>('theme');
    if (saved) this.theme = saved;
  }

  onButtonClick(): void {
    this.toggleSidebar = !this.toggleSidebar;
    this.sidebarToggle.emit(this.toggleSidebar);
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.localStorageService.set('theme', this.theme);
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
}
