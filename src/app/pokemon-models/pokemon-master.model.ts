import { RawPokemon } from './raw-pokemon.model';
import { Type } from './type.model';

export interface PokemonMaster extends RawPokemon {
  /**
   * Points de victoire dans le jeu Pokémon Maître Dresseur
   */
  md_victoryPoints?: number;

  /**
   * Dégats d'attaque dans le jeu Pokémon Maître Dresseur
   */
  md_dmg?: number;

  /**
   * Attack name dans le jeu Pokémon Maître Dresseur
   */
  md_attackName?: string;

  /**
   * Couleur du contour dans le jeu Pokémon Maître Dresseur
   */
  md_couleurContour?: string;

  /**
   * Est-ce un starter dans le jeu Pokémon Maître Dresseur
   */
  md_starter: boolean;

  /**
   * Type principal du Pokémon
   */
  md_primaryType: Type;
}
