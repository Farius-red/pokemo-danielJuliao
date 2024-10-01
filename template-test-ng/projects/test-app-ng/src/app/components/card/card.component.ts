import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalPokemonComponent } from '../modal-pokemon/modal-pokemon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,ModalPokemonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  getImageUrl(id: string): string {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
  }

  @Input() cardPokemon: any;
  idPokemon: string = '';
  tall: number = 0;
  weight: number = 0;
  namePokemon: string = '';
  stats: any = [];
  typeBack: string = '';
  typeIcon: string = '';

  selectedPokemonId!: string;
  
  ngOnInit(): void {
    this.initializeCard();
  }

  initializeCard() {
    if (this.cardPokemon) {
      // Obtén los valores necesarios del objeto cardPokemon
      this.idPokemon = this.formatId(this.cardPokemon.id);
      this.namePokemon = this.cardPokemon.name;
      this.tall = this.cardPokemon.height / 10;
      this.weight = this.cardPokemon.weight / 10;
      this.stats = this.cardPokemon.stats;
      this.setTypes();
    }
  }

  // Formatea el ID para mostrarlo con ceros
  formatId(id: number): string {
    return id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
  }

  // Define los tipos y los íconos del Pokémon
  setTypes() {
    const colorType = this.cardPokemon.types;

    if (colorType.length === 1) {
      this.typeBack = colorType[0].type.name;
      this.typeIcon = `<div class="type__pokemon"><img class="${colorType[0].type.name}" src="../../../assets/img/icon/${colorType[0].type.name}.svg" alt=""></div>`;
    } else {
      this.typeBack = colorType[1].type.name;
      this.typeIcon = `
        <div class="type__pokemon"><img class="${colorType[1].type.name}" src="assets/img/icon/${colorType[1].type.name}.svg" alt=""></div>
        <div class="type__pokemon"><img class="${colorType[0].type.name}" src="assets/img/icon/${colorType[0].type.name}.svg" alt=""></div>
      `;
    }
  }

  // Manejador de error en imagen
  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/nofound.png';
  }

  

  openModal(id: string) {
    this.selectedPokemonId = id;
  }
}
