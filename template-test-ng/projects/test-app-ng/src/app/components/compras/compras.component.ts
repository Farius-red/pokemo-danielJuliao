import { AuthService } from './../../servicios/auth.service';
import { ProductosService } from './../../servicios/productos.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlantillaResponse } from 'juliaositembackenexpress/src/utils/PlantillaResponse';
import { VentasDTO } from '../../models/ventasDTO';
import { MatPaginator } from '@angular/material/paginator';
import { CoreModule } from 'template-test-ng';
import { CompraDTO } from '../../models/compraDTO';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent {

  size = 0;
  rowSpam =4;
  comprasResponse: PlantillaResponse<CompraDTO> = {
    dataList: [],
  };


  displayedColumns: string[] = ['id',"idProducto","idUsuario"];
  dataSource = new MatTableDataSource<CompraDTO>(this.comprasResponse.dataList); 

  dataSize :number =0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
     private breakpointObserver: BreakpointObserver,
     private ProductosScv: ProductosService,
    ){

  }

  ngOnInit(): void {

    this.getAllCompras();
    this.dataSource.paginator = this.paginator;
    if(this.dataSize > 3 ){
        let size = this.dataSize - this.rowSpam
        this.rowSpam= this.rowSpam + size 
    } 
  }

  getAllCompras(){
 this.ProductosScv.allProduct().subscribe(res=>{
  if(res.rta){
    this.comprasResponse = res
    this.dataSource.data = res?.dataList ?? [];
    this.dataSize = this.dataSource.data.length;
  }else{
    alert(res.message);
   }
 },
error =>{
 alert(error)
}
)
  }

  

  scremDataTable(){
    

    if(this.dataSize > 3 ){
    this.size  = this.dataSize - this.rowSpam
      this.rowSpam= this.rowSpam + this.size 
     } 

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.XLarge
      
    ]).subscribe((state: BreakpointState) => {
     
      if (state.breakpoints[Breakpoints.Small]) {
        this.rowSpam= this.rowSpam  +  this.dataSize;
      }
      if (state.breakpoints[Breakpoints.XSmall]) {
        this.rowSpam = this.rowSpam  +  this.dataSize;
      }
   
    });
  }
}
