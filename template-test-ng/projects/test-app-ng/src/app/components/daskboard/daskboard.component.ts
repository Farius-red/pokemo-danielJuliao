import { Component } from '@angular/core';
import {TemplateTestNgComponent,CoreModule} from 'template-test-ng';

@Component({
  selector: 'app-daskboard',
  standalone: true,
  imports: [TemplateTestNgComponent,CoreModule],
  templateUrl: './daskboard.component.html',
  styleUrl: './daskboard.component.scss'
})
export class DaskboardComponent {

 appName: string = "Pokemon Daniel juliao";
 logoSrc:string = "../../../assets/img/nofound.png"
 email = 'daniel.juliao.tecni@gmail.com';

 

}
