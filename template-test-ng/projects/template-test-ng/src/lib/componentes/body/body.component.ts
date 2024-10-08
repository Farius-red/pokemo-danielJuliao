import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-body',
  standalone: true,
  imports: [CoreModule,RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {


}
