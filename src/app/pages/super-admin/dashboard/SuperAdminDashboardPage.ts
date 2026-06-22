import { Component } from '@angular/core';
import { DashboardHeader } from '../../../components/dashboard-header/dashboard-header';
import { StatsCards } from '../../../components/stats-cards/stats-cards';
import { RecentShipments } from '../../../components/recent-shipments/recent-shipments';
import { ChartSection } from '../../../charts/chart-section/chart-section';
import { RevenueChart } from '../../../charts/revenue-chart/revenue-chart';
import { RecentPayments } from '../../../components/recent-payments/recent-payments';
import { RecentRegistrations } from '../../../components/recent-registrations/recent-registrations';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeader, StatsCards, RecentShipments, RecentPayments, RecentRegistrations, ChartSection, RevenueChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class SuperAdminDashboardPage {

  cards = [
    {
      title: 'Total Shipments Managed',
      value: '1,425,678',
      symbol: '+',
      percentage: '12.5',
      compairTo: 'vs last month',
      icon: 'fas fa-box',
      iconColor: 'rgb(11, 74, 111)',
      bgColor: '#dbeafe'
    },
    {
      title: 'Active Platform Distributors',
      value: '84',
      symbol: '+',
      percentage: '5.6',
      compairTo: 'vs last month',
      icon: 'fas fa-users',
      iconColor: '#14b8a6',
      bgColor: '#ccfbf1'
    },
    {
      title: 'Vexaro Core Cash Pool',
      value: '₹4,56,78,900',
      symbol: '+',
      percentage: '15.6',
      compairTo: 'vs last month',
      icon: 'fas fa-indian-rupee-sign',
      iconColor: '#7c3aed',
      bgColor: '#ede9fe'
    },
    {
      title: 'System Weight Disputes Pending',
      value: '12',
      symbol: '-',
      percentage: '4.5',
      compairTo: 'vs last month',
      icon: 'fas fa-scale-unbalanced',
      iconColor: '#dc2626',
      bgColor: '#fee2e2'
    }
  ];

}
