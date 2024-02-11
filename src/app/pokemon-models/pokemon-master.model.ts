import { RawPokemon } from './raw-pokemon.model';

export interface PokemonMaster extends RawPokemon {
  /**
   * Points de victoire dans le jeu Pokémon Maître Dresseur
   */
  victoryPoints?: number;

  /**
   * Dégats d'attaque dans le jeu Pokémon Maître Dresseur
   */
  dmg?: number;

  /**
   * Attack name dans le jeu Pokémon Maître Dresseur
   */
  attackName?: string;

  /**
   * Couleur du contour dans le jeu Pokémon Maître Dresseur
   */
  couleurContour?: string;

  /**
   * Est-ce un starter dans le jeu Pokémon Maître Dresseur
   */
  starter?: boolean;
}
