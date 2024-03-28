import { useState } from "react";
import { Adapt, Button, Popover, PopoverProps, YStack } from "tamagui";

type Props = PopoverProps & {
  pages: number[];
  currentPage: number;
  onChange: (page: number) => void;
};

export function PopoverButtonListPages({
  pages,
  onChange,
  currentPage,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  function handlePress(page: number) {
    onChange(page);
    setOpen(false);
  }

  return (
    <Popover size="$5" allowFlip placement="top" open={open} {...props}>
      <Popover.Trigger asChild>
        <Button onPress={() => setOpen(!open)} size={"$2"}>
          ...
        </Button>
      </Popover.Trigger>
      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <YStack gap="$2" padding="$2">
          {pages.map((page) => (
            <Button key={page} size={"$3"} onPress={() => handlePress(page)}>
              {page.toString()}
            </Button>
          ))}
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
