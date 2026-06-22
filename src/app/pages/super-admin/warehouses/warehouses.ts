import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouses.html',
  styleUrl: './warehouses.css',
})
export class Warehouses {
  searchQuery: string = '';
  statusFilter: string = 'All';

  warehouses = [
    {
      id: 'WH-1001',
      label: 'Main Fulfillment Center',
      tenant: 'Electro World',
      distributor: 'SpeedX Logistics',
      address: 'Plot 45, Industrial Area, Phase 1, New Delhi',
      status: 'Active'
    },
    {
      id: 'WH-1002',
      label: 'South Branch',
      tenant: 'Fashion Hub',
      distributor: 'Rapid Delivery Services',
      address: '12th Cross, Koramangala, Bangalore',
      status: 'Active'
    },
    {
      id: 'WH-1003',
      label: 'Old Godown',
      tenant: 'Book Store',
      distributor: 'Logistics Pro Solutions',
      address: 'Near Railway Station, Old Delhi',
      status: 'Inactive'
    },
    {
      id: 'WH-1004',
      label: 'Tech Hub Warehouse',
      tenant: 'Tech Gadgets',
      distributor: 'SpeedX Logistics',
      address: 'Sector 62, Noida, UP',
      status: 'Active'
    }
  ];

  get filteredWarehouses() {
    return this.warehouses.filter(w => {
      const query = this.searchQuery.toLowerCase();
      const matchesSearch = w.label.toLowerCase().includes(query) || 
                            w.tenant.toLowerCase().includes(query) || 
                            w.distributor.toLowerCase().includes(query);
      const matchesStatus = this.statusFilter === 'All' || w.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
}
