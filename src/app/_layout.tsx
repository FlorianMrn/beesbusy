import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme, YStack } from "tamagui";
import { useFonts } from "expo-font";
import config from "../../tamagui.config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <YStack
            f={1}
            jc="center"
            ai="center"
            backgroundColor={"$backgroundSoft"}
          >
            {children}
            <StatusBar style="auto" />
          </YStack>
        </Theme>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
