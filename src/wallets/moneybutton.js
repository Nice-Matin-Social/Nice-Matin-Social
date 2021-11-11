import auth from "../utils/auth";
import config from "../config.json";
import { twLogin, saveWallet } from "./index";
export const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : config.ownerInfo.moneybuttonClientId;

export const MBLogin = async (cb) => {
  let getPermissionForCurrentUser = () => {
    return localStorage.token;
  };
  const imb = new window.moneyButton.IMB({
    clientIdentifier: imbCli,
    permission: getPermissionForCurrentUser(),
    onNewPermissionGranted: (token) => localStorage.setItem("token", token)
  });
  fetch("https://auth.twetch.app/api/v1/challenge")
    .then(function (res) {
      return res.json();
    })
    .then(async (resp) => {
      var cryptoOperations = [
        {
          name: "mySignature",
          method: "sign",
          data: resp.message,
          dataEncoding: "utf8",
          key: "identity",
          algorithm: "bitcoin-signed-message"
        },
        { name: "myPublicKey", method: "public-key", key: "identity" },
        { name: "myAddress", method: "address", key: "identity" }
      ];
      imb.swipe({
        cryptoOperations: cryptoOperations,
        onCryptoOperations: async (ops) => {
          saveWallet(ops[1].paymail, "moneybutton");
          if (localStorage.getItem("paymail")) {
            twLogin(ops[2].value, resp.message, ops[0].value, () => {
              auth.login(() => {
                cb();
              });
            });
          }
        }
      });
    });
};
