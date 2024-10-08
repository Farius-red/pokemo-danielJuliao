import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

import { Router, RouterOutlet, Event } from '@angular/router';
import {CoreModule} from 'template-test-ng';
import { TablaComponent } from "./components/tabla/tabla.component";
import { ComprasComponent } from './components/compras/compras.component';
import { DaskboardComponent } from './components/daskboard/daskboard.component';
import { TemplateTestNgComponent } from "../../../template-test-ng/src/lib/template-test-ng.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, TablaComponent, DaskboardComponent, TemplateTestNgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  appName = 'prueba daniel juliao';
  logoSrc = '../assets/img/favicon.png';
  email = 'daniel.juliao.tecni@gmail.com';
  isAdmin = false;

  constructor(private route: Router
  ) { }

  ngOnInit(): void {
    // Aquí puedes acceder a la información de la ruta
    const path = this.route.url;

    console.log("path", path)
    if (path && path != '' && path != 'home') {
      
      this.isAdmin = true;
    
    }if(path == "home"){
      this.isAdmin = false
    }
   
  }



}
 
  

