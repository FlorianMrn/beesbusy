import { apiCall } from "@/modules/api/api";
import { DTOFilm } from "../model/film.dto";
import { FilmMapper } from "../mapper/film.mapper";
import { DomainFilm } from "../model/film.domain";

type Response = {
  count: number;
  results: DTOFilm[];
};

export const filmsUrl = "films" as const;

export const getFilms = async (): Promise<Response> => {
  let allResults: RawFilm[] = [];
  let currentPage = 1;
  let count = 0;

  do {
    const { count: totalCount, results } = await apiCall(
      `${filmsUrl}?page=${currentPage}`
    );

    count = totalCount;
    allResults = [...allResults, ...results];

    currentPage++;
  } while (allResults.length < count);

  const domainFilms = allResults.map((rawFilm: RawFilm) => {
    return FilmMapper.toDomain(rawFilm);
  });

  const dtoFilms = domainFilms.map((domainFilm: DomainFilm) => {
    return FilmMapper.toDTO(domainFilm);
  });

  return { count, results: dtoFilms };
};
