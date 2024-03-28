import { DomainCharacter } from "../model/character.domain";
import { DTOCharacter } from "../model/character.dto";

export class CharacterMapper {
  public static toDTO(domainCharacter: DomainCharacter): DTOCharacter {
    return {
      id: domainCharacter.id,
      name: domainCharacter.name,
      height: domainCharacter.height,
      mass: domainCharacter.mass,
      eye_color: domainCharacter.eye_color,
      hair_color: domainCharacter.hair_color,
      films: domainCharacter.films,
      created: domainCharacter.created,
      edited: domainCharacter.edited,
    };
  }

  public static toDomain(rawCharacter: RawCharacter): DomainCharacter {
    return {
      id: rawCharacter.url,
      name: rawCharacter.name,
      height: rawCharacter.height,
      mass: rawCharacter.mass,
      eye_color: rawCharacter.eye_color,
      hair_color: rawCharacter.hair_color,
      films: rawCharacter.films,
      created: rawCharacter.created,
      edited: rawCharacter.edited,
    };
  }
}
