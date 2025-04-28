import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardService } from '../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss',
})
export class HomeDashboardComponent implements OnInit {
  quantityRegisteredDocument!: number | string;
  quantityRegisteredDocumentType!: number | string;
  private destroyRef = inject(DestroyRef);

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.searchQuantityDocumentRegistered();
    this.searchQuantityDocumentTypeRegistered();
  }

  private searchQuantityDocumentRegistered() {
    this._dashboardService
    .getNumberRegisteredDocuments()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (quantityDocumentRegistred) => {
        this.quantityRegisteredDocument = quantityDocumentRegistred;
      },
      error: () => {
        this.quantityRegisteredDocument = 'Erro';
      },
    });
  }

  private searchQuantityDocumentTypeRegistered() {
    this._dashboardService
    .getNumberDocumentTypesRegistered()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (quantityRegisteredDocumentType) => {
        this.quantityRegisteredDocumentType = quantityRegisteredDocumentType;
      },
      error: (err) => {
        this.quantityRegisteredDocumentType = 'Erro';
      },
    });
  }
}
