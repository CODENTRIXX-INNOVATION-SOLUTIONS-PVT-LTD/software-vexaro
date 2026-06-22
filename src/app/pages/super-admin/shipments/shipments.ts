import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css',
})
export class Shipments {

  shipments = [
    {
      awb: 'AWB987654321',
      merchant: 'Electro World',
      distributor: 'SpeedX Logistics',
      carrier: 'Delhivery',
      weight: '1.2 kg',
      status: 'In Transit',
      date: '19 Jun 2026'
    },
    {
      awb: 'AWB987654322',
      merchant: 'Fashion Hub',
      distributor: 'Rapid Delivery Services',
      carrier: 'XpressBees',
      weight: '0.5 kg',
      status: 'Delivered',
      date: '18 Jun 2026'
    },
    {
      awb: 'AWB987654323',
      merchant: 'Book Store',
      distributor: 'Logistics Pro Solutions',
      carrier: 'Ecom Express',
      weight: '2.1 kg',
      status: 'Pending',
      date: '19 Jun 2026'
    },
    {
      awb: 'AWB987654324',
      merchant: 'Tech Gadgets',
      distributor: 'SpeedX Logistics',
      carrier: 'Delhivery',
      weight: '0.8 kg',
      status: 'Failed',
      date: '17 Jun 2026'
    },
    {
      awb: 'AWB987654325',
      merchant: 'Home Essentials',
      distributor: 'Safe Ship Carriers',
      carrier: 'Smartr Logistics',
      weight: '5.0 kg',
      status: 'In Transit',
      date: '19 Jun 2026'
    }
  ];

  searchTerm: string = '';
  filterStatus: string = 'All';

  get filteredShipments() {
    return this.shipments.filter(s => {
      const matchesSearch = s.awb.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            s.merchant.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'All' || s.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  cancelShipment(shipment: any) {
    if (confirm(`Are you sure you want to intervene and cancel shipment ${shipment.awb}? This will trigger automated wholesale margin reversals back to the Distributor.`)) {
      shipment.status = 'Cancelled';
      alert(`Shipment ${shipment.awb} cancelled successfully. Reversal initiated.`);
    }
  }

}
