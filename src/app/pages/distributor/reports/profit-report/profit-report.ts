import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profit-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 1em; height: 1em; display: inline-block; vertical-align: middle; margin-right: 8px;" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v10h10"></path></svg> Profit Report</h1>
      </div>
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; display: block; margin: 0 auto 16px; color: #cbd5e1;" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <h3>Under Construction</h3>
        <p>Profit reporting will be available in the next release.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 24px; }
    .page-title { font-size: 22px; font-weight: 700; color: rgb(10, 10, 10); margin-bottom: 24px; }
    .page-title i { color: rgb(11, 74, 111); margin-right: 8px; }
    .empty-state { text-align: center; padding: 64px 24px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; }
    .empty-state i { font-size: 48px; color: #cbd5e1; margin-bottom: 16px; }
    .empty-state h3 { font-size: 18px; font-weight: 700; color: rgb(10, 10, 10); margin: 0 0 8px; }
    .empty-state p { color: #64748b; margin: 0; }
  `]
})
export class ProfitReport implements OnInit {
  ngOnInit() {}
}
