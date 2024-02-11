import { SimplePokemon } from './simple-pokemon.model';
import { Stats } from './stats.model';
import { Type } from './type.model';

export interface RawPokemon extends SimplePokemon {
  /**
   * Identifiant dans la liste reçue
   */
  id: number;

  /**
   * Image en HD
   */
  image: string;

  /**
   * Image pixelisée
   */
  sprite: string;

  /**
   * Nom ??
   */
  slug: string;

  /**
   * Statistiques
   */
  stats: Stats;

  /**
   * Types
   */
  apiTypes: Array<Type>;

  /**
   * Génération
   */
  apiGeneration: number;

  /**
   * Balec
   */
  //apiResistances: Array<Resistance>;
  //resistanceModifyingAbilitiesForApi
  //apiResistancesWithAbilities

  /**
   * Evolutions
   */
  apiEvolutions: Array<SimplePokemon>;

  /**
   * Pré-evolutions
   */
  apiPreEvolution: Array<SimplePokemon>;

  /**
   * Types
   */
  types: Array<string>;
}
