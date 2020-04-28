import { ENDPOINTS, GET } from "./core/api";

export const fetchEventsByGame = gameId => {
  console.log("fetchEventsByGame: ", gameId);
  const endpoint = `${ENDPOINTS.EVENTS}?gameId=${gameId}`;
  return GET(endpoint);
};
