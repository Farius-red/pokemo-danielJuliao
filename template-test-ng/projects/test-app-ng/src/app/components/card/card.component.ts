import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalPokemonComponent } from '../modal-pokemon/modal-pokemon.component';
import * as $ from 'jquery';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,ModalPokemonComponent,MatDialogModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
 

  getImageUrl(id: string): string {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
  }


  @ViewChild('pokemonModal') modalElement!: ElementRef;
  @Input() cardPokemon: any;
  idPokemon: string = '';
  tall: number = 0;
  weight: number = 0;
  namePokemon: string = '';
  stats: any = [];
  typeBack: string = '';
  typeIcon: string = '';
  idImagenPokemon: string ='';

  selectedPokemonId!: string;

  constructor(private dialog: MatDialog){}
  
  ngOnInit(): void {
    this.initializeCard();
  }

  initializeCard() {
    if (this.cardPokemon) {
      // Obtén los valores necesarios del objeto cardPokemon
      this.idPokemon = this.cardPokemon.id;
      this.idImagenPokemon = this.formatId(this.cardPokemon.id)
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

  

  openModal(id: string, name: string, urlImg: string, precio:number) {
    let precio2:number  =Number(id) +precio
    const dialogRef = this.dialog.open(ModalPokemonComponent, {
      width: '400px',height:'50%',
      data: {
        id,
        name,
        urlImg,
        precio2
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
    });
  }

  
  closeModal() {
    const modalElement = document.getElementById('pokemonModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
    }
  }
  
}
