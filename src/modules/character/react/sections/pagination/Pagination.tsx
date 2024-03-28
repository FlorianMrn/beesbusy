import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import { useMemo } from "react";
import { Button, XStack } from "tamagui";
import { PopoverButtonListPages } from "./PopoverListPages";

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onChange }: Props) {
  const popoverPagesNumbers = useMemo(() => {
    const allPages = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    const otherPages = allPages.filter((page) => page !== currentPage);
    return otherPages;
  }, [currentPage, totalPages]);

  return (
    <XStack
      gap="$2"
      justifyContent="center"
      alignItems="center"
      paddingVertical="$2"
    >
      <Button
        icon={ChevronLeft}
        size="$2"
        width={100}
        disabled={currentPage === 1}
        opacity={currentPage === 1 ? 0.5 : 1}
        justifyContent="center"
        onPress={() => onChange(currentPage - 1)}
      >
        Précédent
      </Button>
      <Button size="$2" themeInverse>
        {currentPage.toString()}
      </Button>
      {totalPages > 1 && (
        <PopoverButtonListPages
          pages={popoverPagesNumbers}
          onChange={onChange}
          currentPage={currentPage}
        />
      )}
      <Button
        width={100}
        justifyContent="center"
        iconAfter={ChevronRight}
        size="$2"
        disabled={currentPage === totalPages}
        opacity={currentPage === totalPages ? 0.5 : 1}
        onPress={() => onChange(currentPage + 1)}
      >
        Suivant
      </Button>
    </XStack>
  );
}
