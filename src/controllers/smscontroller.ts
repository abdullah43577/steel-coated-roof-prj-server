import { Request, Response } from "express";
import { handleErrors } from "../helper/handleErrors";
import twilio from "twilio";
import { contactFormSchema } from "../schema/schema";
import SMSModel from "../models/SMSModel";
import { generateEmailTemplate } from "../emails/emailTemplate";
import { transportMail } from "../emails/resendConfig";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER as string;
const client = twilio(accountSid, authToken);

const sendVerificationCode = async function (req: Request, res: Response) {
  try {
    const { phone_no } = req.body;

    if (!phone_no) return res.status(400).json({ message: "Phone number is required" });

    // Generate a random 6-digit code (optional)
    const code = Math.floor(100000 + Math.random() * 900000);

    // Send SMS via Twilio
    await client.messages.create({
      body: `Your verification code is: ${code}`,
      from: twilioPhone,
      to: phone_no,
    });

    await SMSModel.create({
      code: code.toString(),
      phone_no,
      expiry: new Date(Date.now() + 10 * 60 * 1000), // Code valid for 10 minutes
    });

    res.status(200).json({ message: "✅ Verification code sent successfully!" });
  } catch (error) {
    handleErrors({ res, error });
  }
};

const validateVerificationCode = async function (req: Request, res: Response) {
  try {
    const { first_name, last_name, phone_no, email, address, city, cur_roof_type, roof_type_wanted, building_type, project_type, project_details, code } = contactFormSchema.parse(req.body);

    // find sms schema to validate code
    const smsRecord = await SMSModel.findOne({ where: { code, phone_no } });

    if (!smsRecord) return res.status(404).json({ message: "❌ Invalid verification code or phone number!" });

    if (smsRecord.expiry < new Date()) {
      return res.status(400).json({ message: "❌ Verification code has expired!" });
    }

    // generate email template
    const emailHtml = generateEmailTemplate({ first_name, last_name, phone_no, email, address, city, cur_roof_type, roof_type_wanted, building_type, project_type, project_details });

    // send email with credentials to Ron
    await transportMail({
      email,
      message: emailHtml,
      subject: "New Roofing Project Contact Form Submission",
    });

    smsRecord.destroy(); // Invalidate the code after successful verification

    res.status(200).json({ message: "Form Submitted Successfully!" });
  } catch (error) {
    handleErrors({ res, error });
  }
};

export { sendVerificationCode, validateVerificationCode };
