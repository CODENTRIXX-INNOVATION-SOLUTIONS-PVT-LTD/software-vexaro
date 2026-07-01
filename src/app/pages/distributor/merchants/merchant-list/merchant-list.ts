import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

export interface DistributorMerchant {
  id: string;
  merchantCode: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  warehouseId: string;
  walletBalance: number;
  totalShipments: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  createdAt: string;
}

@Component({
  selector: 'app-distributor-merchant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merchant-list.html',
  styleUrl: './merchant-list.css'
})
export class DistributorMerchantList implements OnInit {
  merchants: DistributorMerchant[] = [];
  filteredMerchants: DistributorMerchant[] = [];
  searchTerm: string = '';
  statusFilter: string = 'All';
  isLoading: boolean = false;
  viewMode: 'table' | 'grid' = 'grid';

  private userService = inject(UserService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadMerchants();
  }

  loadMerchants() {
    this.isLoading = true;
    this.userService.listUsers({ role: 'MERCHANT' }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.data && res.data.users) {
          this.merchants = res.data.users.map((m: any) => ({
            id: m._id,
            merchantCode: m.email || '—',
            businessName: m.companyName || '—',
            contactPerson: `${m.firstName || ''} ${m.lastName || ''}`.trim(),
            phone: m.phone || '—',
            email: m.email || '—',
            city: m.address || '—',
            warehouseId: 'WH-' + m._id.substring(m._id.length - 4),
            walletBalance: 0, // Wallet balance loaded on finance page
            totalShipments: 0,
            status: m.isActive ? 'Active' : 'Inactive',
            createdAt: new Date(m.createdAt).toLocaleDateString('en-IN')
          }));
          this.applyFilters();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load merchants:', err);
      }
    });
  }

  applyFilters() {
    this.filteredMerchants = this.merchants.filter(m => {
      const matchesSearch =
        m.businessName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        m.merchantCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        m.contactPerson.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        m.phone.includes(this.searchTerm);
      const matchesStatus = this.statusFilter === 'All' || m.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  viewMerchant(id: string) {
    this.router.navigate(['/distributor/merchants', id]);
  }

  createMerchant() {
    this.router.navigate(['/distributor/merchants/create']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Inactive': return 'status-inactive';
      case 'Suspended': return 'status-suspended';
      default: return '';
    }
  }

  setViewMode(mode: 'table' | 'grid') {
    this.viewMode = mode;
  }
}
