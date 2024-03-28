import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
  SelectProps,
  XStack,
  Select,
  YStack,
  Text,
  Adapt,
  Sheet,
} from "tamagui";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { getFilms } from "@/modules/film/core/query/getFilms.query";
import { DTOFilm } from "@/modules/film/core/model/film.dto";

type ItemProps = {
  name: string;
  value: string;
  onSelect: (val: string) => void;
};

export function SelectItem(props: SelectProps & ItemProps) {
  const { name, onSelect, value, ...otherProps } = props;

  const { isPending, data, error } = useQuery({
    queryKey: ["films"],
    queryFn: getFilms,
  });

  function handleChange(newValue: string | "all") {
    onSelect(newValue === "all" ? "" : newValue);
  }

  if (isPending) return null;

  if (error) return <Text>An error has occurred</Text>;

  return (
    <XStack alignItems="center" space="$2" gap="$1">
      <SelectDemoItem
        id="select-demo-1"
        onSelect={handleChange}
        currentValue={value}
        films={data.results}
      />
    </XStack>
  );
}

export function SelectDemoItem({
  onSelect,
  currentValue,
  films,
  ...props
}: {
  onSelect: (val: string) => void;
  currentValue: string;
  films: DTOFilm[];
} & SelectProps) {
  return (
    <Select
      value={currentValue}
      onValueChange={onSelect}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Films" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={["$background", "transparent"]}
          />
        </Select.ScrollUpButton>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Films</Select.Label>
            <Select.Item index={0} value={""}>
              <Select.ItemText>Aucun</Select.ItemText>
              <Select.ItemIndicator marginLeft="auto">
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>
            {useMemo(
              () =>
                films.map((item, i) => {
                  return (
                    <Select.Item index={i + 1} key={item.id} value={item.id}>
                      <Select.ItemText>{item.title}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [films]
            )}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={["transparent", "$background"]}
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
