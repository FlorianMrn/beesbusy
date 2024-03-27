import { registerRootComponent } from "expo";
import RootLayout from "./_layout";
import { Paragraph, Text } from "tamagui";

export default function App() {
  return (
    <RootLayout>
      <Paragraph color="$red10">Paragraph</Paragraph>
    </RootLayout>
  );
}

registerRootComponent(App);
