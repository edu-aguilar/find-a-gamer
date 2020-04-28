import axios from "axios";

const appID = "j7eaoztky4"; // TODO: move this to env file
const baseURL = `https://${appID}.execute-api.us-east-1.amazonaws.com/dev/`; // TODO: move this to env file
const ENDPOINTS = {
  EVENTS: "events",
  GAMES: "games",
  USERS: "users"
};

const GET = endpoint => {
  return axios.get(`${baseURL}${endpoint}`);
};

export { ENDPOINTS, GET };
