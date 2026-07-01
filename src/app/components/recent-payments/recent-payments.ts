import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-recent-payments',
  standalone: true,
  templateUrl: './recent-payments.html',
  styleUrl: '../../common-css/super-admin-dashboard-page-bottom-table.css'
})
export class RecentPayments implements OnInit {
  private dashboardService = inject(DashboardService);

  payments: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.dashboardService.getRecentPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recent payments:', error);
        this.isLoading = false;
        // Fallback to empty array on error
        this.payments = [];
      }
    });
  }

}