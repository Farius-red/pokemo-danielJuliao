import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridTile } from '@angular/material/grid-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CoreModule} from 'template-test-ng';
import{PlantillaResponse} from 'juliaositembackenexpress/src/utils/PlantillaResponse';
import{CreditoResponse} from '../../models/creditoResponse';
import{CreditoService} from '../../servicios/credito.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from "../card/card.component";
import { PokemonService } from '../../servicios/pokemon.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CoreModule, LayoutModule, CardComponent],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit, AfterViewInit {
  
  pokemons: any[] = [];
  nextUrl: string = '';
  prevUrl: string = '';
  message: string = '';

  size = 0;
  rowSpam =4;
  usersResponse: PlantillaResponse<CreditoResponse> = {
    dataList: [],
  };


  displayedColumns: string[] = ['id',"aprobado"];
  dataSource = new MatTableDataSource<CreditoResponse>(this.usersResponse.dataList); 

 dataSize :number =0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatGridTile) gridTile!: MatGridTile; 

   usersSubscription: Subscription | undefined;

  constructor(private creditoSvc: CreditoService,
    private dialog: MatDialog,private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private pokemonService: PokemonService
  ) {}



  ngOnInit(): void {
    // this.getAllUsers();
    // this.dataSource.paginator = this.paginator;
    // if(this.dataSize > 3 ){
    //     let size = this.dataSize - this.rowSpam
    //     this.rowSpam= this.rowSpam + size 
    // } 

    this.loadPokemon();
  }


  loadPokemon(url: string = ''): void {
    if (!url) {
    
      url = 'https://pokeapi.co/api/v2/pokemon/';
    }

    this.pokemonService.getPokemonDetails(url).subscribe(data => {
      this.nextUrl = data.next;
      this.prevUrl = data.previous;
     
      if (this.nextUrl === 'https://pokeapi.co/api/v2/pokemon?offset=960&limit=4') {
        this.message = "Opss... No hay más pokemones por el momento";
        alert(this.message);
      }

      this.pokemons = []; // Reiniciar la lista antes de agregar los nuevos
      data.results.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.url).subscribe(pokemonDetail => {
          this.pokemons.push(pokemonDetail);
        });
      });
    });
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

  ngAfterViewInit(): void {
    
  }

  getAllUsers(id?: string | null, idBussines?: number | null): void {
    this.usersSubscription = this.creditoSvc.all(id, idBussines).subscribe({
      next: (response) => {
        this.usersResponse = response;
        console.log(this.usersResponse)
        this.dataSource.data = response?.dataList ?? [];
       this.dataSize = this.dataSource.data.length;
       this.scremDataTable()
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  nextPage(): void {
    if (this.nextUrl) {
      console.log("nex", this.nextUrl)
      this.loadPokemon(this.nextUrl);
    }
  }

  prevPage(): void {
    debugger;

    if (this.prevUrl) {

console.log("previos" ,this.prevUrl)
      this.loadPokemon(this.prevUrl);
    }
  }

}
