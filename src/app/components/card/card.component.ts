import { Component, Input } from '@angular/core';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() studentPadre: Student;

  constructor() {}

}
