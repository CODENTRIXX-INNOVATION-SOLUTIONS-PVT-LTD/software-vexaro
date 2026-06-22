import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merchant-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {
  dateRange: string = 'This Month';
  statusFilter: string = 'All Statuses';
  carrierFilter: string = 'All Carriers';
  isLoading: boolean = false;

  summary = {
    total: 0,
    delivered: 0,
    failed: 0,
    rto: 0,
    weightDisputes: 0,
    codPerformance: 0,
    walletSpend: 0
  };

  dataList: any[] = [];

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    
    // Mocking an API call
    setTimeout(() => {
      this.summary = {
        total: 1250,
        delivered: 1100,
        failed: 100,
        rto: 50,
        weightDisputes: 25,
        codPerformance: 98.5,
        walletSpend: 15400
      };

      this.dataList = [
        { date: '16 Jun 2026', total: 45, delivered: 40, failed: 3, rto: 2 },
        { date: '15 Jun 2026', total: 60, delivered: 55, failed: 4, rto: 1 },
        { date: '14 Jun 2026', total: 50, delivered: 45, failed: 2, rto: 3 },
        { date: '13 Jun 2026', total: 70, delivered: 65, failed: 5, rto: 0 },
        { date: '12 Jun 2026', total: 40, delivered: 35, failed: 2, rto: 3 }
      ];

      this.isLoading = false;
    }, 600);
  }

  exportCSV() { alert('Downloading CSV...'); }
  exportPDF() { alert('Downloading PDF Report...'); }
}
