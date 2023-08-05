import axios from "axios";
import { toDataURL, toFile } from "qrcode";
import { createSignature } from "./createSignature";

export async function sendMessage(contacts, message) {
  const date = Date.now().toString();
  const serviceId = process.env.NCP_SMS_SERVICE_ID;
  const accessKey = process.env.NCP_ACCESS_KEY;
  const apiUrl = `/sms/v2/services/${serviceId}/messages`;
  const signedKey = createSignature(apiUrl, date);

  await axios.post(
    `https://sens.apigw.ntruss.com${apiUrl}`,
    {
      type: "SMS",
      countryCode: "82",
      from: process.env.NCP_SENDER_NUMBER,
      content: message,
      messages: contacts.map((el) => ({
        to: el,
        content: message,
      })),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signedKey,
      },
    }
  );
}
