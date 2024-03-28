import { Input, XStack } from "tamagui";

type ItemProps = {
  name: string;
  value: string;
  onChange?: (v: string) => void;
};

export function InputItem({ name, value, onChange }: ItemProps) {
  return (
    <XStack alignItems="center" space="$2" gap="$1">
      <Input
        flex={1}
        value={value}
        size="$2"
        placeholder={name.toUpperCase()}
        padding="$2"
        onChangeText={onChange}
      />
    </XStack>
  );
}
