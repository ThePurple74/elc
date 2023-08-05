import { createHmac } from "crypto";

export function createSignature(url, date) {
  const accessKey = process.env.NCP_ACCESS_KEY;
  const secretKey = process.env.NCP_SECRET_KEY;

  if (!accessKey || !secretKey)
    throw new Error("Cannot find access key or secret key.");

  const message = ["POST", " ", url, "\n", date, "\n", accessKey];
  const hmac = createHmac("SHA256", secretKey);
  const signature = hmac.update(message.join("")).digest("base64");

  return signature;
}
