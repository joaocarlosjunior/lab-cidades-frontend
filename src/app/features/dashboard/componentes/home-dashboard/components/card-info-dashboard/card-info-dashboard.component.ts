import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-info-dashboard',
  templateUrl: './card-info-dashboard.component.html',
  styleUrl: './card-info-dashboard.component.scss'
})
export class CardInfoDashboardComponent {
  @Input({required: true}) tituloCard: string = '';
  @Input({required: true}) infoCard: number | string = '';

}
