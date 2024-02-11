import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokemonMaster } from './pokemon-models/pokemon-master.model';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from './utils.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RawPokemon } from './pokemon-models/raw-pokemon.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
  ],
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
  private pokemons: Array<RawPokemon> = [];

  /**
   * Liste des Pokémon
   */
  public pokemonDataSource: MatTableDataSource<PokemonMaster>;

  /**
   * Colonnes à afficher
   */
  public columns = [
    'pokedexId',
    'generation',
    'name',
    'preEvolutions',
    'image',
    'evolutions',
    'types',
    'md_victoryPoints',
    'md_dmg',
    'md_primaryType',
    'md_attackName',
    'md_couleurContour',
    'md_starter',
  ];

  /**
   * Constructeur
   * @param pokemonService
   */
  constructor(
    private pokemonService: PokemonService,
    private utilsService: UtilsService
  ) {
    this.pokemonDataSource = new MatTableDataSource();
  }

  /**
   * Implémentation de AfterViewInit
   */
  ngAfterViewInit() {
    this.pokemonDataSource.paginator = this.paginator;

    this.pokemonService.getAllPokemon().subscribe({
      next: pokemons =>
        (this.pokemonDataSource.data = pokemons.map(p => ({
          ...p,
          vi: 0,
          md_primaryType: p.apiTypes[0],
          md_starter: false,
        }))),
    });
  }

  /**
   * Exporte tous les pokemons en CSV
   */
  exportToCsv() {
    let content =
      'name;generation;pokedexId;md_victoryPoints;md_dmg;md_primaryType;md_attackName;md_couleurContour;md_starter\n';

    for (const pokemon of this.pokemonDataSource.data) {
      content += `${pokemon.name};${pokemon.apiGeneration};${pokemon.pokedexId};${pokemon.md_victoryPoints ?? ''};${pokemon.md_dmg ?? ''};${pokemon.md_primaryType.name ?? ''};${pokemon.md_attackName ?? ''};${pokemon.md_couleurContour ?? ''};${pokemon.md_starter}\n`;
    }

    this.utilsService.saveToFile(content, 'md_pokemon.csv');
  }

  /**
   * Exporte en JSON les données récupérées de l'API
   */
  exportBaseJson() {
    this.utilsService.saveToFile(
      JSON.stringify(this.pokemons),
      'pokemon_base.json'
    );
  }

  /**
   * Exporte en JSON la totalité des données, y compris celles exprès pour le jeu Pokémon Maître Dresseur
   */
  exportFullJson() {
    this.utilsService.saveToFile(
      JSON.stringify(this.pokemonDataSource.data),
      'pokemon_full.json'
    );
  }

  /**
   * Trouver les détails d'un pokemon en fonction de son ID
   * @param pokedexId
   * @returns
   */
  getPokemonByPokedexId(pokedexId: number) {
    return this.pokemonDataSource.data.find(p => p.pokedexId === pokedexId);
  }
}
