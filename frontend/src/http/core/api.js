import axios from "axios";
import { getInstance } from "@/auth/index";

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

const POST = async (endpoint, body) => {
  const authService = getInstance();
  const jwt = await authService.getJwt();
  return axios({
    method: "post",
    url: `${baseURL}${endpoint}`,
    data: body,
    headers: { Authorization: `Bearer ${jwt}` }
  });
};

export { ENDPOINTS, GET, POST };
