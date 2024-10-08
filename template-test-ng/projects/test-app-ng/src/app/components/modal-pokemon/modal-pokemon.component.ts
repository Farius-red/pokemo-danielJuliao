import { ProductosService } from './../../servicios/productos.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Inject, input, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../servicios/pokemon.service';
import { CardComponent } from '../card/card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraDTO } from '../../models/compraDTO';
import {MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';



@Component({
  selector: 'app-modal-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-pokemon.component.html',
  styleUrl: './modal-pokemon.component.scss'
})
export class ModalPokemonComponent implements OnInit, AfterViewInit {


  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;
//       ]
//     }]
//   });
//   chart.render();
// }
onClose() {
throw new Error('Method not implemented.');
}

  @Input() pokemonId!: number;
  namePokemon!: string;
  tall!: number;
  weight!: number;
  descriptionPokemon!: string;
  typeBack!: string;
  typeIcons: string[] = [];
  stats: any[] = [];
  urlImgPokemonFull: any;
  precio2:number = 0;
  cantidad:number = 0;

  constructor(private pokemonService: PokemonService ,
     private produSvc: ProductosService,
    public dialogRef: MatDialogRef<CardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
   this.loadData()
    this.pokemonService.getPokemonInfo(this.pokemonId).subscribe(data => {
      console.log("desde modal",data)
      this.namePokemon = data.name;
      this.tall = data.height / 10;
      this.weight = data.weight / 10;
      this.stats = data.stats;
      this.typeIcons = data.types.map((type: any) => type.type.name);

    });
  }

  ngAfterViewInit(): void {
  
  }


  // renderChart(): void {
  //   const chart = new CanvasJS.Chart("chartContainer", {
  //     animationEnabled: true,
  //     theme: "light1", // Cambia el tema según lo necesites
  //     backgroundColor: "transparent",
  //     title: { // Añade el título aquí
  //       text: "Estadísticas del Pokémon"
  //     },
  //     axisY: {
  //       title: "Valor"
  //     },
  //     data: [{
  //       type: "column",
  //       showInLegend: false,
  //       dataPoints: [
  //         { y: this.stats[0]?.base_stat, label: "Velocidad" },
  //         { y: this.stats[3]?.base_stat, label: "Defensa" },
  //         { y: this.stats[4]?.base_stat, label: "Ataque" },
  //         { y: this.stats[5]?.base_stat, label: "Puntos de vida" }
  //       ]
  //     }]
  //   });
  //   chart.render();
  
  
  // }

  loadData(){
    this.pokemonId = this.data.id
    this.precio2 = this.data.precio2
    this.urlImgPokemonFull = this.data.urlImg
    
  }
  
  comprar(){
   let  compra: CompraDTO ={
     idUsuario: '12313123',
     idProducto: this.pokemonId.toString(),
     cantidad: this.cantidad
   }
    this.produSvc.add(compra).subscribe(res=>{
      if(res.rta) {
        this.cantidad = 0;
      this.openSnackBar((res.message)?res.message:"");
      }

    });

  }

  addProduct(){
    this.cantidad +=  1
  }


  openSnackBar(mensaje: string) {
    const config: MatSnackBarConfig = {
      duration: this.durationInSeconds * 3000,
      data: { menssaje: mensaje }, // Aquí se pasa el mensaje
    };
  
    this._snackBar.openFromComponent(MenssajeComponent, config);
  }
}


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
    <span class="example-pizza-party">
    {{data.menssaje}}
    </span>
  `,
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
  standalone: true,
})
export class MenssajeComponent  {
 constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any){}

  


}