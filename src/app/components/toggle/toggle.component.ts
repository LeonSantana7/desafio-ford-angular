import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Input() alternado: boolean = false;
  @Output() alternadoChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    const savedState = localStorage.getItem('modoToggle');
    if (savedState !== null) {
      this.alternado = JSON.parse(savedState);
    }
  }

  onToggleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.alternado = target.checked;
    this.alternadoChange.emit(this.alternado);
    localStorage.setItem('modoToggle', JSON.stringify(this.alternado));
  }
}