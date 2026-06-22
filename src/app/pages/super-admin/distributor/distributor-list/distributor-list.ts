import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddDistributorModal } from '../../../../models/add-distributor-modal/add-distributor-modal';
import { DistributorCreatedSuccess } from '../../../../models/distributor-created-success/distributor-created-success';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialStore } from '../../../../shared/financial-store';
@Component({
  selector: 'app-distributor-list',
  imports: [RouterLink, AddDistributorModal, DistributorCreatedSuccess, CommonModule, FormsModule],
  templateUrl: './distributor-list.html',
  styleUrl: './distributor-list.css'
})
export class DistributorList {


  constructor(private router: Router) { }
  showModal = false;
  showAddModal = false;
  showSuccessModal = false;

  // Ledger Modal State
  showLedgerModal = false;
  selectedDistributor: any = null;
  ledgerAmount: number | null = null;
  ledgerRef: string = '';
  ledgerTransactionType: 'ADD' | 'DEDUCT' = 'ADD';

  activeMenu: number | null = null;

  toggleMenu(id: number) {
    this.activeMenu = this.activeMenu === id ? null : id;
  }

  openSuccessModal() {
    this.showSuccessModal = true;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onDistributorSaved() {
    this.showAddModal = false;
    this.showSuccessModal = true;
  }

  openLedgerModal(dist: any) {
    this.selectedDistributor = dist;
    this.showLedgerModal = true;
    this.activeMenu = null;
  }

  closeLedgerModal() {
    this.showLedgerModal = false;
    this.selectedDistributor = null;
    this.ledgerAmount = null;
    this.ledgerRef = '';
    this.ledgerTransactionType = 'ADD';
  }

  commitLedgerTransaction() {
    if (!this.ledgerAmount || this.ledgerAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!this.ledgerRef.trim()) {
      alert('Please enter a reference number.');
      return;
    }

    if (this.ledgerTransactionType === 'ADD') {
      this.selectedDistributor.ledger += this.ledgerAmount;
    } else {
      if (this.selectedDistributor.ledger < this.ledgerAmount) {
         alert('Insufficient balance to deduct!');
         return;
      }
      this.selectedDistributor.ledger -= this.ledgerAmount;
    }

    alert(`Ledger successfully updated. New Balance: ₹${this.selectedDistributor.ledger}`);
    this.closeLedgerModal();
  }

  get totalDistributors() {
    return this.allDistributors.length;
  }

  get activeDistributors() {
    return this.allDistributors.filter(
      d => d.status === 'Active'
    ).length;
  }

  get inactiveDistributors() {
    return this.allDistributors.filter(
      d => d.status === 'Inactive'
    ).length;
  }

  distributors = [
    {
      id: 1,
      name: 'SpeedX Logistics',
      region: 'North Zone',
      margin: '+12%',
      ledger: 450000,
      status: 'Active'
    },
    {
      id: 2,
      name: 'FastWay Distributors',
      region: 'West Zone',
      margin: '+10%',
      ledger: 120000,
      status: 'Active'
    },
    {
      id: 3,
      name: 'QuickMove Logistics',
      region: 'South Zone',
      margin: '+15%',
      ledger: 0,
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'Swift Distributors',
      region: 'East Zone',
      margin: '+10%',
      ledger: 250000,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Global Reach Dist.',
      region: 'Central Zone',
      margin: '+8%',
      ledger: 75000,
      status: 'Active'
    }
  ];

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  viewDistributor(id: number): void {
    this.router.navigate(['/super-admin/distributors/profile', id]);
  }

  get allDistributors() {
    const mappedRequests = FinancialStore.onboardingRequests.map((req, index) => ({
      id: 10 + index,
      name: req.distributorName,
      region: req.region,
      margin: '+10%',
      ledger: 0,
      status: req.status
    }));
    return [...this.distributors, ...mappedRequests];
  }

  approveDistributor(name: string) {
    const req = FinancialStore.onboardingRequests.find(r => r.distributorName === name);
    if (req) {
      req.status = 'Active';
      alert(`Distributor account for "${name}" approved successfully!`);
    }
  }
}