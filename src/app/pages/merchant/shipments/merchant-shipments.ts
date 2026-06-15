import { Component } from '@angular/core';
import { StatsCards } from '../../../components/stats-cards/stats-cards';

@Component({
  selector: 'app-shipments',
  imports: [StatsCards],
  templateUrl: './merchant-shipments.html',
  styleUrl: './merchant-shipments.css',
})
export class MerchantShipments {
  shipmentCards = [
    {
      title: 'Total Shipments',
      value: '12,450',
      icon: 'fas fa-boxes',
      bgColor: '#dbeafe',
      iconColor: '#2563eb',
      percentage: 12,
      symbol: '+',
      compairTo: 'vs last month'
    },
    {
      title: 'In Transit',
      value: '2,185',
      icon: 'fas fa-truck-moving',
      bgColor: '#fef3c7',
      iconColor: '#d97706',
      percentage: 5,
      symbol: '+',
      compairTo: 'currently moving'
    },
    {
      title: 'Delivered',
      value: '9,620',
      icon: 'fas fa-check-circle',
      bgColor: '#dcfce7',
      iconColor: '#16a34a',
      percentage: 18,
      symbol: '+',
      compairTo: 'successful deliveries'
    },
    {
      title: 'Pending Pickup',
      value: '325',
      icon: 'fas fa-store',
      bgColor: '#ede9fe',
      iconColor: '#7c3aed',
      percentage: 3,
      symbol: '-',
      compairTo: 'awaiting pickup'
    },
    {
      title: 'RTO',
      value: '145',
      icon: 'fas fa-undo-alt',
      bgColor: '#fee2e2',
      iconColor: '#dc2626',
      percentage: 2,
      symbol: '-',
      compairTo: 'returned orders'
    },
    {
      title: 'Delivered Today',
      value: '486',
      icon: 'fas fa-calendar-check',
      bgColor: '#cffafe',
      iconColor: '#0891b2',
      percentage: 9,
      symbol: '+',
      compairTo: 'today'
    },
    {
      title: 'Total Shipping Cost',
      value: '₹4.8L',
      icon: 'fas fa-money-bill-wave',
      bgColor: '#fef9c3',
      iconColor: '#ca8a04',
      percentage: 7,
      symbol: '+',
      compairTo: 'this month'
    },
    {
      title: 'Average Delivery Time',
      value: '3.2 Days',
      icon: 'fas fa-clock',
      bgColor: '#e0f2fe',
      iconColor: '#0284c7',
      percentage: 6,
      symbol: '-',
      compairTo: 'faster than last month'
    }
  ];
}
