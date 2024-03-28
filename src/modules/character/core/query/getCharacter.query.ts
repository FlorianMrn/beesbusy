import { apiCall } from "@/modules/api/api";
import { charactersUrl } from "./getCharacters.query";
import { DTOCharacter } from "../model/character.dto";
import { CharacterMapper } from "../mapper/character.mapper";
import { extractIds } from "@/modules/api/utils/extractIds";

export const getCharacter = async (
  id: DTOCharacter["id"] | null
): Promise<DTOCharacter> => {
  if (!id) return {} as DTOCharacter;
  const parsedId = extractIds([id]);
  const response = await apiCall(`${charactersUrl}/${parsedId}`);
  const domainCharacter = CharacterMapper.toDomain(response);
  const DTOCharacter = CharacterMapper.toDTO(domainCharacter);
  return DTOCharacter;
};
