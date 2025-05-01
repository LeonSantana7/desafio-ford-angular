import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Veiculo } from '../../models/veiculo.model';
import { VehicleData } from '../../models/vehicleData.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  selectCarForm = new FormGroup({
    carSelect: new FormControl<string | number | null>(null)
  });

  searchCarVinForm = new FormGroup({
    vinInput: new FormControl('')
  });

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((res) => {
      this.vehicles = res.vehicles;
      this.selectedVehicle = this.vehicles[0];
      this.selectCarForm.controls.carSelect.setValue(this.selectedVehicle.id);

    });

    this.selectCarForm.controls.carSelect.valueChanges.subscribe(id => {
      const found = this.vehicles.find(v => v.id == id);
      if (found) this.selectedVehicle = found;
    });

    this.searchCarVinForm.controls.vinInput.valueChanges.subscribe(vin => {
      if (vin && vin.length > 5) {
        this.vehicleService.getVehicleData(vin).subscribe({
          next: data => this.vehicleData = data,
          error: () => alert('Código VIN não encontrado!')
        });
      }
    });
  }
}
