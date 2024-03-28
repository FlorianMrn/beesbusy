import { DTOCharacter } from "@/modules/character/core/model/character.dto";
import { CardProps, H4, H5, YStack } from "tamagui";
import { Button, Card, Paragraph, XStack } from "tamagui";

type Props = {
  character?: DTOCharacter;
  setOpen: (open: boolean) => void;
};

export function CharacterCard(props: CardProps & Props) {
  const { character, setOpen } = props;

  return (
    <>
      <Card
        elevate
        width={140}
        minHeight={220}
        size="$1"
        bordered
        padded
        {...props}
        onPress={() => setOpen(true)}
      >
        <Card.Header padded>
          <H5 height={"$6"}>{character?.name}</H5>
          <YStack padding="$3" space="$3">
            <Paragraph theme="alt1">Taille : {character?.height} cm</Paragraph>
            <Paragraph theme="alt1">Poids : {character?.mass} kg</Paragraph>
          </YStack>
        </Card.Header>
        <Card.Footer justifyContent="center">
          <XStack justifyContent="center">
            <Button
              borderRadius="$0"
              padding="$1"
              width={"100%"}
              onPress={() => setOpen(true)}
            >
              Détails
            </Button>
          </XStack>
        </Card.Footer>
      </Card>
    </>
  );
}
