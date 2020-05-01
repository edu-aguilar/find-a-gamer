import { ENDPOINTS, GET, POST, PATCH, DELETE } from "./core/api";

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
};

export const addMessageToEvent = (eventId, message) => {
  const body = {
    message
  };
  const endpoint = `${ENDPOINTS.EVENTS}/${eventId}/comments`;
  return POST(endpoint, body);
};

export const updateEvent = (updatedEvent, eventId) => {
  const endpoint = `${ENDPOINTS.EVENTS}/${eventId}`;
  return PATCH(endpoint, updatedEvent);
};

export const deleteEvent = eventId => {
  const endpoint = `${ENDPOINTS.EVENTS}/${eventId}`;
  return DELETE(endpoint);
};

export const getEventsByUser = userId => {
  const endpoint = `${ENDPOINTS.USERS}/${userId}/${ENDPOINTS.EVENTS}`;
  return GET(endpoint);
};
