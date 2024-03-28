import { registerRootComponent } from "expo";
import RootLayout from "./_layout";
import { CharactersPage } from "@/modules/character/react/pages/characters/CharactersPage";

export default function App() {
  return (
    <RootLayout>
      <CharactersPage />
    </RootLayout>
  );
}

registerRootComponent(App);
