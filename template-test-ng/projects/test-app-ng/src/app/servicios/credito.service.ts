import { PlantillaResponse } from 'juliaositembackenexpress/src/utils/PlantillaResponse';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JuliaoSystemCrudHttpService } from './juliaoSystemCrudHttpService';
import { CreditoResponse } from '../models/creditoResponse';
import { environment } from '../../environments/environment';



  @Injectable({
    providedIn: 'root'
  })
  export class CreditoService extends JuliaoSystemCrudHttpService<PlantillaResponse<CreditoResponse>> {
    


    constructor(
      protected override http: HttpClient,
    ) {
      super(http);
      this.basePathUrl = environment.baseUrls+"/creditos/";
    }

  }
