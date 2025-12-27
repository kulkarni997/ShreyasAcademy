import axios from "axios";

export const sendSMS = async (
  phone: string,
  message: string
): Promise<void> => {
  if (!process.env.MSG91_AUTH_KEY) return;

  try {
    await axios.post(
      "https://control.msg91.com/api/v5/flow/",
      {
        sender: process.env.MSG91_SENDER_ID as string,
        route: "4",
        mobiles: phone,
        message,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("MSG91 SMS failed");
  }
};

export const sendWhatsApp = async (
  phone: string,
  message: string
): Promise<void> => {
  if (!process.env.MSG91_AUTH_KEY) return;

  try {
    await axios.post(
      "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound/",
      {
        integrated_number: process.env.MSG91_WHATSAPP_NUMBER as string,
        content_type: "template",
        payload: {
          messaging_product: "whatsapp",
          to: phone,
          type: "text",
          text: {
            body: message,
          },
        },
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("MSG91 WhatsApp failed");
  }
};
