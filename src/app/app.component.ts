import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokemonMaster } from './pokemon-models/pokemon-master.model';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from './utils.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  /**
   * Paginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Liste des Pokémon
   */
  public pokemons: MatTableDataSource<PokemonMaster>;

  /**
   * Colonnes à afficher
   */
  public columns = ['image', 'name', 'generation', 'pokedexId'];

  /**
   * Constructeur
   * @param pokemonService
   */
  constructor(
    private pokemonService: PokemonService,
    private utilsService: UtilsService
  ) {
    this.pokemons = new MatTableDataSource();
  }

  /**
   * Implémentation de AfterViewInit
   */
  ngAfterViewInit() {
    this.pokemons.paginator = this.paginator;

    this.pokemonService.getAllPokemon().subscribe({
      next: pokemons =>
        (this.pokemons.data = pokemons.map(p => ({ ...p, vi: 0 }))),
    });
  }

  /**
   * Exporte tous les pokemons en CSV
   */
  exportToCsv() {
    let content = 'nom_francais;generation;id_national;\n';

    for (const pokemon of this.pokemons.data) {
      content += `${pokemon.apiGeneration};${pokemon.id};${pokemon.name}\n`;
    }

    this.utilsService.saveToFile(content, 'pokemons.csv');
  }
}
