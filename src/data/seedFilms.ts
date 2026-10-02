import { Film } from "@/types/film";
import catalogFilms from "./films.json";

/**
 * 1,100+ Verified Feature Films from Internet Archive Feature Films Collection
 */
export const SEED_FILMS: Film[] = catalogFilms as unknown as Film[];
