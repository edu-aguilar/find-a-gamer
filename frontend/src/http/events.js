import { ENDPOINTS, GET, POST } from "./core/api";

export const fetchEventsByGame = gameId => {
  console.log("fetchEventsByGame: ", gameId);
  const endpoint = `${ENDPOINTS.EVENTS}?gameId=${gameId}`;
  return GET(endpoint);
};

export const fetchAvailableGames = () => {
  const endpoint = `${ENDPOINTS.GAMES}`;
  return GET(endpoint);
};

export const createEvent = event => {
  const endpoint = `${ENDPOINTS.EVENTS}`;
  return POST(endpoint, event);
};

export const getEventById = eventId => {
  const endpoint = `${ENDPOINTS.EVENTS}/${eventId}`;
  return GET(endpoint);
}
