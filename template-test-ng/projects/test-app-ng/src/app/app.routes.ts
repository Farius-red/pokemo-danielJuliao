import { Routes } from '@angular/router';
import{TablaComponent} from './components/tabla/tabla.component';
import { DaskboardComponent } from './components/daskboard/daskboard.component';
import { ComprasComponent } from './components/compras/compras.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home', component: TablaComponent},
    { 
        path: 'admin', 
        component: DaskboardComponent,
        children: [
          { path: 'listaCompras', component: ComprasComponent }
        ]
      },
   // { path: '**', redirectTo: '/home' },
];
