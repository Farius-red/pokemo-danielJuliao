import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../servicios/pokemon.service';
declare var CanvasJS: any;


@Component({
  selector: 'app-modal-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-pokemon.component.html',
  styleUrl: './modal-pokemon.component.scss'
})
export class ModalPokemonComponent implements OnInit, AfterViewInit {

  @Input() pokemonId!: number;
  namePokemon!: string;
  tall!: number;
  weight!: number;
  descriptionPokemon!: string;
  typeBack!: string;
  typeIcons: string[] = [];
  stats: any[] = [];
  urlImgPokemonFull: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonInfo(this.pokemonId).subscribe(data => {
      console.log("desde modal",data)
      this.namePokemon = data.name;
      this.tall = data.height / 10;
      this.weight = data.weight / 10;
      this.stats = data.stats;
      this.typeIcons = data.types.map((type: any) => type.type.name);
      this.typeBack = this.typeIcons[0];
      this.descriptionPokemon = data.flavor_text_entries[26].flavor_text;

      this.renderChart(); 
    });
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }


  renderChart(): void {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light1", // Cambia el tema según lo necesites
      backgroundColor: "transparent",
      title: { // Añade el título aquí
        text: "Estadísticas del Pokémon"
      },
      axisY: {
        title: "Valor"
      },
      data: [{
        type: "column",
        showInLegend: false,
        dataPoints: [
          { y: this.stats[0]?.base_stat, label: "Velocidad" },
          { y: this.stats[3]?.base_stat, label: "Defensa" },
          { y: this.stats[4]?.base_stat, label: "Ataque" },
          { y: this.stats[5]?.base_stat, label: "Puntos de vida" }
        ]
      }]
    });
    chart.render();
  }
  

}
