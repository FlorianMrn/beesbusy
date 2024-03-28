import { DomainFilm } from "../model/film.domain";
import { DTOFilm } from "../model/film.dto";

export class FilmMapper {
  public static toDTO(domainFilm: DomainFilm): DTOFilm {
    return {
      id: domainFilm.id,
      title: domainFilm.title,
    };
  }

  public static toDomain(rawFilm: RawFilm): DomainFilm {
    return {
      id: rawFilm.url,
      title: rawFilm.title,
    };
  }
}
