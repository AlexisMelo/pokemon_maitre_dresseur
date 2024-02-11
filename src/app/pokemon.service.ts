import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawPokemon } from './pokemon-models/raw-pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  public getAllPokemon() {
    return this.httpClient.get<Array<RawPokemon>>(
      'https://pokebuildapi.fr/api/v1/pokemon'
    );
  }
}
