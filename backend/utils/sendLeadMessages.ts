import { sendSMS, sendWhatsApp } from "../services/msg91.service.js";

const SHREYAS = "917411060709";
const SRUJAN = "919113520745";

export const sendLeadMessages = async (user) => {
  const studentMsg = `Thanks for your interest in Shreyas Academy!
Contact our mentors:
Shreyas - 7411060709
Srujan - 9113520745
Our mentors will also reach out to you shortly.`;

  const mentorMsg = `New Student Lead
Name: ${user.name}
Phone: ${user.phone}
Email: ${user.email}
The student clicked Get Started and is interested in joining Shreyas Academy.`;

  await sendSMS(user.phone, "Our mentors will contact you shortly to help you get started with Shreyas Academy.");

  await sendWhatsApp(user.phone, studentMsg);
  await sendWhatsApp(SHREYAS, mentorMsg);
  await sendWhatsApp(SRUJAN, mentorMsg);
};