export const digestMessage = async (message) => {
  const msgUint8 = new TextEncoder().encode(message);
  let decoded = new TextDecoder().decode(msgUint8);
  let value = decoded.replaceAll(",", "");
  const msgToHash = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgToHash);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const arrToScript = (arr) => {
  let script = "0 OP_RETURN";
  for (let i = 0; i < arr.length; i++) {
    script += " " + ascii_to_hexa(arr[i]);
  }
  return script;
};

const ascii_to_hexa = (str) => {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
};
