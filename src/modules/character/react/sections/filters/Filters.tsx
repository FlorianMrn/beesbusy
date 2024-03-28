import React from "react";
import { Accordion, Paragraph, Square, XStack, YStack } from "tamagui";
import { InputItem } from "./items/Input";
import { SelectItem } from "./items/Select";
import {
  InitialStateType,
  actionTypes,
} from "../../pages/characters/CharactersPage";
import { ChevronDown } from "@tamagui/lucide-icons";

type Props = {
  state: InitialStateType;
  onChangeValue: (field: keyof typeof actionTypes) => (value: string) => void;
};

export function CharactersFilters({ state, onChangeValue }: Props) {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="filters">
        <Accordion.Header>
          <Accordion.Trigger>
            {({ open }: { open: boolean }) => (
              <XStack>
                <Paragraph>Filtres</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </XStack>
            )}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <YStack ai="center" gap="$2" padding="$3">
            <InputItem
              name="nom"
              onChange={(v: string) => onChangeValue("SET_NAME_TERM")(v)}
              value={state.searchTermName}
            />
            <InputItem
              name="taille"
              onChange={(v: string) => onChangeValue("SET_HEIGHT_TERM")(v)}
              value={state.searchTermHeight}
            />
            <InputItem
              name="poids"
              onChange={(v: string) => onChangeValue("SET_MASS_TERM")(v)}
              value={state.searchTermMass}
            />
            <SelectItem
              size="$2"
              name="films"
              onSelect={(v: string) => onChangeValue("SET_FILM_TERM")(v)}
              value={state.searchTermFilm}
            />
          </YStack>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
