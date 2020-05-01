export const getUserIdFromJWT = t => {
  let token = {};
  token.raw = t;
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token.payload.sub;
};
