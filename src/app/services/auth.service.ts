import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/login';

  constructor(private http: HttpClient) { }

  login(nome: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, { nome, senha });
  }

}
