import { apiCall } from "@/modules/api/api";
import { CharacterMapper } from "../mapper/character.mapper";
import { DomainCharacter } from "../model/character.domain";
import { DTOCharacter } from "../model/character.dto";

type Response = {
  count: number;
  results: DTOCharacter[];
};

export const charactersUrl = "people" as const;

export const getCharacters = async (): Promise<Response> => {
  let allResults: RawCharacter[] = [];
  let currentPage = 1;
  let count = 0;

  do {
    const { count: totalCount, results } = await apiCall(
      `${charactersUrl}?page=${currentPage}`
    );
    count = totalCount;
    allResults = [...allResults, ...results];

    currentPage++;
  } while (allResults.length < count);

  const domainCharacters = allResults.map((rawCharacter: RawCharacter) => {
    return CharacterMapper.toDomain(rawCharacter);
  });

  const dtoCharacters = domainCharacters.map(
    (domainCharacter: DomainCharacter) => {
      return CharacterMapper.toDTO(domainCharacter);
    }
  );

  return { count, results: dtoCharacters };
};
