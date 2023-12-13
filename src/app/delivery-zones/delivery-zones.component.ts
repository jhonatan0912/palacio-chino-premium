import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery-zones',
  standalone: true,
  imports: [],
  templateUrl: './delivery-zones.component.html',
  styleUrl: './delivery-zones.component.scss'
})
export class DeliveryZonesComponent {

  deliveryZones = [
    { district: 'TAMBO', schedule: '4:00 pm - 11:00 pm' },
    { district: 'HUANCAYO', schedule: '4:00 pm - 11:00 pm' },
    { district: 'CHILCA', schedule: '4:00 pm - 11:00 pm' },
  ];


}
