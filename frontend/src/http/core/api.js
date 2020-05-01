import axios from "axios";
import { getInstance } from "@/auth/index";

const appID = "j7eaoztky4"; // TODO: move this to env file
const baseURL = `https://${appID}.execute-api.us-east-1.amazonaws.com/dev/`; // TODO: move this to env file
const ENDPOINTS = {
  EVENTS: "events",
  GAMES: "games",
  USERS: "users"
};

const getCommonHeaders = () => ({
  "Content-Type": "application/json; charset=utf-8"
});

const getPrivateHeaders = async () => {
  const authService = getInstance();
  const jwt = await authService.getJwt();
  return {
    Authorization: `Bearer ${jwt}`
  };
};

const getHeaders = async isPrivate => {
  let headers = getCommonHeaders();
  if (isPrivate) {
    const privateHeaders = await getPrivateHeaders();
    headers = { ...headers, ...privateHeaders };
  }
  return headers;
};

const GET = async (endpoint, isPrivate = false) => {
  const headers = await getHeaders(isPrivate);
  return axios({
    method: "get",
    url: `${baseURL}${endpoint}`,
    headers
  });
};

const POST = async (endpoint, body, isPrivate = true) => {
  const headers = await getHeaders(isPrivate);
  return axios({
    method: "post",
    url: `${baseURL}${endpoint}`,
    data: body,
    headers
  });
};

const PATCH = async (endpoint, body, isPrivate = true) => {
  const headers = await getHeaders(isPrivate);
  return axios({
    method: "patch",
    url: `${baseURL}${endpoint}`,
    data: body,
    headers
  });
};

const DELETE = async (endpoint, isPrivate = true) => {
  const headers = await getHeaders(isPrivate);
  return axios({
    method: "delete",
    url: `${baseURL}${endpoint}`,
    headers
  });
};

export { ENDPOINTS, GET, POST, PATCH, DELETE };
