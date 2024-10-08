import { Injectable } from '@angular/core';
import { VentasDTO } from '../models/ventasDTO';
import { PlantillaResponse } from 'juliaositembackenexpress/src/utils/PlantillaResponse';
import { JuliaoSystemCrudHttpService } from './juliaoSystemCrudHttpService';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { CompraDTO } from '../models/compraDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends JuliaoSystemCrudHttpService<PlantillaResponse<VentasDTO>> {

  constructor(  protected override http: HttpClient,) {
    super(http);
    this.basePathUrl = environment.baseUrls+"/productos";

  }

  allProduct(): Observable<PlantillaResponse<CompraDTO>>{
    return this.http.get<PlantillaResponse<CompraDTO>>(this.basePathUrl + "/all");
  }
}
