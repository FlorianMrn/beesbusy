import { XStack } from "tamagui";
import { CharacterCard } from "../character/CharacterCard";
import { DTOCharacter } from "@/modules/character/core/model/character.dto";
import { useState } from "react";
import { CharacterDialog } from "../character/CharacterDialog";

type Props = {
  allCharacters: DTOCharacter[];
  charactersDisplayed: DTOCharacter[];
};

export function Characters({ allCharacters, charactersDisplayed }: Props) {
  const [open, setOpen] = useState(false);
  const [characterId, setCharacterId] = useState<DTOCharacter["id"] | null>(
    null
  );

  const onCharacterClick = (characterId: DTOCharacter["id"]) => {
    setCharacterId(characterId);
    setOpen(true);
  };

  const handleClickPrevious = () => {
    const currentCharacterIndex = allCharacters.findIndex(
      (character) => character.id === characterId
    );
    const previousCharacterId = allCharacters?.[currentCharacterIndex - 1]?.id;
    setCharacterId(previousCharacterId);
  };

  const handleClickNext = () => {
    const currentCharacterIndex = allCharacters.findIndex(
      (character) => character.id === characterId
    );
    const nextCharacterId = allCharacters?.[currentCharacterIndex + 1]?.id;
    setCharacterId(nextCharacterId);
  };

  return (
    <>
      <CharacterDialog
        characterId={characterId}
        count={allCharacters.length}
        open={open}
        handleClickPrevious={handleClickPrevious}
        handleClickNext={handleClickNext}
        onOpen={setOpen}
      />
      <XStack
        maxWidth={300}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap="$2"
      >
        {charactersDisplayed.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            setOpen={() => onCharacterClick(character["id"])}
          />
        ))}
      </XStack>
    </>
  );
}
