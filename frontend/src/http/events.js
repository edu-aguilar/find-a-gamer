import { ENDPOINTS, GET } from "./core/api";

export const fetchEventsByGame = gameId => {
  console.log("fetchEventsByGame: ", gameId);
  const endpoint = `${ENDPOINTS.EVENTS}?gameId=${gameId}`;
  return GET(endpoint);
};

export const fetchAvailableGames = () => {
  const endpoint = `${ENDPOINTS.GAMES}`;
  return GET(endpoint);
};
