import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VeiculosAPI, Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.baseUrl}/vehicles`);
  }


  getVehicleData(vin: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicleData`, { vin });
  }
}
