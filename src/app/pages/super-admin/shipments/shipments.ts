import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css',
})
export class Shipments implements OnInit {
  private dashboardService = inject(DashboardService);

  shipments: any[] = [];
  isLoading = true;
  searchTerm: string = '';
  filterStatus: string = 'All';

  ngOnInit(): void {
    this.dashboardService.getShipments().subscribe({
      next: (shipments: any[]) => {
        this.shipments = shipments;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching shipments:', error);
        this.isLoading = false;
        // Fallback to empty array on error
        this.shipments = [];
      }
    });
  }

  get filteredShipments() {
    return this.shipments.filter(s => {
      const matchesSearch = s.awb.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            s.merchant.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'All' || s.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

}
