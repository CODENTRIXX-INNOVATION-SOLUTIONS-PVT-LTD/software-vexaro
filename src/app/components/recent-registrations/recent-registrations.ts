import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-recent-registrations',
  standalone: true,
  templateUrl: './recent-registrations.html',
  styleUrl: '../../common-css/super-admin-dashboard-page-bottom-table.css'
})
export class RecentRegistrations implements OnInit {
  private dashboardService = inject(DashboardService);

  registrations: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.dashboardService.getRecentRegistrations().subscribe({
      next: (registrations) => {
        this.registrations = registrations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recent registrations:', error);
        this.isLoading = false;
        // Fallback to empty array on error
        this.registrations = [];
      }
    });
  }

}