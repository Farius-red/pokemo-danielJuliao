import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlInfoPokemons = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemonInfo(id: number): Observable<any> {
    return this.http.get(`${this.urlInfoPokemons}${id}`);
  }


  getPokemonList(offset?: number, limit?: number ): Observable<any> {
    return this.http.get(`${this.urlInfoPokemons}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonByIdOrName(idOrName: string): Observable<any> {
    return this.http.get(`${this.urlInfoPokemons}${idOrName.toLowerCase()}`);
  }
}
