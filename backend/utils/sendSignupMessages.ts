import { sendSMS, sendWhatsApp } from "../services/msg91.service.js";

export const sendSignupMessages = async (user) => {
  const sms = `Hey ${user.name}! Thanks for signing up for Shreyas Academy. Your profile has been created successfully. Our mentors will help you take the next step in your NEET journey.`;

  const whatsapp = `Hey ${user.name} 👋
Welcome to Shreyas Academy!
Your account has been created successfully.
You can now explore our mentorship program and connect with our mentors to get started with your NEET preparation.
So what's waiting you from studying from India's top Rank holders? Enroll now!!`;

  await sendSMS(user.phone, sms);
  await sendWhatsApp(user.phone, whatsapp);
};