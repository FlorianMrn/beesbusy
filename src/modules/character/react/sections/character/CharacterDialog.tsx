import { DTOCharacter } from "@/modules/character/core/model/character.dto";
import {
  Button,
  ListItem,
  Paragraph,
  Sheet,
  Spinner,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "@/modules/character/core/query/getCharacter.query";
import { extractIds } from "@/modules/api/utils/extractIds";
import { formatDate } from "@/modules/api/utils/formatDate";

type Props = {
  characterId: DTOCharacter["id"] | null;
  count: number;
  open: boolean;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  onOpen: (open: boolean) => void;
};
export const CharacterDialog = ({
  characterId,
  open,
  count,
  handleClickNext,
  handleClickPrevious,
  onOpen,
}: Props) => {
  const {
    isPending,
    data: character,
    error,
  } = useQuery({
    queryKey: ["characters", characterId],
    queryFn: () => getCharacter(characterId),
  });

  const currentId = characterId && extractIds([characterId])[0];

  if (error) return <Text>An error has occurred</Text>;

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      snapPoints={[85, 50, 25]}
      dismissOnSnapToBottom
      position={0}
      zIndex={100_000}
      onOpenChange={() => onOpen(!open)}
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame
        padding="$12"
        justifyContent="center"
        alignItems="center"
        gap="$4"
      >
        {isPending && <Spinner size="large" />}
        {!isPending && (
          <>
            <YStack padding="$3" space="$3">
              <Paragraph theme="alt1">Nom : {character?.name}</Paragraph>
              <Paragraph theme="alt1">
                Taille : {character?.height} cm
              </Paragraph>
              <Paragraph theme="alt1">Poids : {character?.mass} kg</Paragraph>
              <Paragraph theme="alt1">
                Couleur des cheveux : {character?.hair_color}
              </Paragraph>
              <Paragraph theme="alt1">
                Couleur des yeux : {character?.eye_color}
              </Paragraph>
              <XStack>
                <Paragraph theme="alt1">Films :</Paragraph>
                <YGroup alignSelf="auto" width={200} size="$4">
                  {character?.films?.map((film) => (
                    <YGroup.Item key={film}>
                      <ListItem>{film}</ListItem>
                    </YGroup.Item>
                  ))}
                </YGroup>
              </XStack>
              <Paragraph theme="alt1">
                Date de création : {formatDate(character?.created)}
              </Paragraph>
              <Paragraph theme="alt1">
                Date de modification : {formatDate(character?.edited)}
              </Paragraph>
            </YStack>
            <XStack justifyContent="space-between" width={"100%"}>
              <Button
                size="$6"
                circular
                icon={ChevronLeft}
                onPress={handleClickPrevious}
                disabled={Number(currentId) === 1}
                opacity={Number(currentId) > 1 ? 1 : 0.5}
              />
              <Button
                size="$6"
                circular
                icon={ChevronRight}
                onPress={handleClickNext}
                disabled={Number(currentId) === count}
                opacity={Number(currentId) === count ? 0.5 : 1}
              />
            </XStack>
          </>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};
