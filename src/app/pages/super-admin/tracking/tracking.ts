import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

export interface ShipmentSummary {
  awb: string;
  status: string;
  customerName: string;
  pincode: string;
  paymentType: string;
  amount: number;
  merchantName: string;
  distributorName: string;
  warehouseName: string;
  carrier: string;
}

export interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracking.html',
  styleUrl: './tracking.css'
})
export class Tracking {
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  searchQuery: string = '';
  hasSearched: boolean = false;
  isLoading: boolean = false;
  
  // Filters
  distributorFilter: string = 'All Distributors';
  dateFilter: string = 'Any Date';
  statusFilter: string = 'All Statuses';
  carrierFilter: string = 'All Carriers';

  shipment: ShipmentSummary | null = null;
  timeline: TrackingEvent[] = [];

  search() {
    if (!this.searchQuery.trim()) return;
    this.hasSearched = true;
    this.isLoading = true;

    this.dashboardService.trackByAWB(this.searchQuery.trim()).subscribe({
      next: (shipmentData) => {
        this.shipment = shipmentData;
        this.isLoading = false;

        // Build timeline from shipment status history if available
        if (shipmentData && shipmentData.statusHistory) {
          this.timeline = shipmentData.statusHistory.map((event: any, index: number) => ({
            date: event.timestamp ? new Date(event.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
            time: event.timestamp ? new Date(event.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
            status: event.status || 'Unknown',
            location: 'N/A',
            description: event.note || 'Status updated',
            isCurrent: index === 0
          })).reverse();
        } else {
          this.timeline = [];
        }
      },
      error: (error) => {
        console.error('Error tracking shipment:', error);
        this.shipment = null;
        this.timeline = [];
        this.isLoading = false;
      }
    });
  }

  intervene() {
    alert(`Escalation ticket created for AWB ${this.shipment?.awb}. Operations team notified.`);
  }

  viewLive() {
    alert('Global Live Tracking View (Mock)');
  }

  viewHistory() {
    alert('Global Full Event Log View (Mock)');
  }
}
