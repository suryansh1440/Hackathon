import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.RESEND_API){
    console.log("RESEND_API is not set");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({sendTo, subject, html}) => {
    try {
        // console.log(sendTo);
        const {data,error} = await resend.emails.send({
            from: 'Kid Touter <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        if(error){
            return console.log({error});
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;