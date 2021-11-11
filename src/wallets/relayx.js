const RelayXLogin = async () => {
  let token = await window.relayone.authBeta({ withGrant: true }),
    res;
  localStorage.setItem("token", token);
  let [payload, signature] = token.split(".");
  //console.log(signature);
  const data = JSON.parse(atob(payload));

  fetch("https://auth.twetch.app/api/v1/challenge", { method: "get" })
    .then((res) => {
      return res.json();
    })
    .then(async (resp) => {
      try {
        res = await window.relayone.sign(resp.message);
        const publicKey = window.bsv.PublicKey.fromHex(data.pubkey);
        const signAddr = window.bsv.Address.fromPublicKey(publicKey).toString();
        if (res) {
          saveWallet(data.paymail, "relayx");
          if (localStorage.getItem("paymail")) {
            twLogin(signAddr, resp.message, res.value, () => {
              history.push("/");
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
};
