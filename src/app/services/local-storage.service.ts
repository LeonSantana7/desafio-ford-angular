import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  set<T>(chave: string, valor: T): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  get<T>(chave: string): T | null {
    const item = localStorage.getItem(chave);
    return item ? JSON.parse(item) : null;
  }

  remove(chave: string): void {
    localStorage.removeItem(chave);
  }

  clear(): void {
    localStorage.clear();
  }
}
