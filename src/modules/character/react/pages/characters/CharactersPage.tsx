import { getCharacters } from "@/modules/character/core/query/getCharacters.query";
import { Characters } from "../../sections/characters/Characters";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Text, YStack } from "tamagui";
import { CharactersFilters } from "../../sections/filters/Filters";
import { useMemo, useReducer } from "react";
import { Pagination } from "../../sections/pagination/Pagination";

const initialState: InitialStateType = {
  searchTermHeight: "",
  searchTermMass: "",
  searchTermName: "",
  searchTermFilm: "",
  currentPage: 1,
};

export function CharactersPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isPending, data, error } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  const handleChange = (field: keyof typeof actionTypes) => (value: string) => {
    dispatch({ type: actionTypes[field], payload: value });
    dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: 1 });
  };

  const onChangePage = (page: number) => {
    dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: page });
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.results.filter((character) => {
      return (
        (!state.searchTermHeight ||
          character.height
            .toLowerCase()
            .includes(state.searchTermHeight.toLowerCase())) &&
        (!state.searchTermMass ||
          character.mass
            .toLowerCase()
            .includes(state.searchTermMass.toLowerCase())) &&
        (!state.searchTermName ||
          character.name
            .toLowerCase()
            .includes(state.searchTermName.toLowerCase())) &&
        (!state.searchTermFilm ||
          character.films
            .join(" ")
            .toLowerCase()
            .includes(state.searchTermFilm.toLowerCase()))
      );
    });
  }, [data, state]);

  const slicedData = useMemo(() => {
    if (!filteredData) return [];

    return filteredData.slice(
      (state.currentPage - 1) * 10,
      state.currentPage * 10
    );
  }, [filteredData, state.currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / 10);
  }, [filteredData]);

  if (isPending) return <Spinner size="large" />;

  if (error) return <Text>An error has occurred</Text>;

  return (
    <YStack gap="$4">
      <CharactersFilters onChangeValue={handleChange} state={state} />
      <Characters
        allCharacters={data.results}
        charactersDisplayed={slicedData}
      />
      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        onChange={onChangePage}
      />
    </YStack>
  );
}

export type InitialStateType = {
  searchTermHeight: string;
  searchTermMass: string;
  searchTermName: string;
  searchTermFilm: string;
  currentPage: number;
};

type ActionType =
  | { type: typeof actionTypes.SET_HEIGHT_TERM; payload: string }
  | { type: typeof actionTypes.SET_MASS_TERM; payload: string }
  | { type: typeof actionTypes.SET_NAME_TERM; payload: string }
  | { type: typeof actionTypes.SET_FILM_TERM; payload: string }
  | { type: typeof actionTypes.SET_CURRENT_PAGE; payload: number };

export const actionTypes = {
  SET_HEIGHT_TERM: "SET_HEIGHT_TERM",
  SET_MASS_TERM: "SET_MASS_TERM",
  SET_NAME_TERM: "SET_NAME_TERM",
  SET_FILM_TERM: "SET_FILM_TERM",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
};

const reducer = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case actionTypes.SET_HEIGHT_TERM:
      return { ...state, searchTermHeight: action.payload as string };
    case actionTypes.SET_MASS_TERM:
      return { ...state, searchTermMass: action.payload as string };
    case actionTypes.SET_NAME_TERM:
      return { ...state, searchTermName: action.payload as string };
    case actionTypes.SET_FILM_TERM:
      return { ...state, searchTermFilm: action.payload as string };
    case actionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload as number };
    default:
      return state;
  }
};
