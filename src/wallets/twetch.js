import config from "../config.json";

const Twetch = require("@twetch/sdk");
const clientId = config.ownerInfo.clientIdentifier;

export const TWETCH = new Twetch({ clientIdentifier: clientId });
export const Helpers = TWETCH.Helpers;
export const TwetchLogin = () => {
  const host = window.location.host;
  let redirectUrl = `https://${host}/auth/callback/twetch`;
  let appName = config.appIdentity.title;
  window.location.href = `https://twetch.app/auth/authorize?appName=${appName}&redirectUrl=${redirectUrl}`;
};
