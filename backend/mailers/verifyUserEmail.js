const nodemailer = require("../config/nodemailer");
const ejs = require("ejs");
const path = require("path");
module.exports.verifyUserEmail = async (user,otp) => {
    try{
        let emailHtml = await ejs.renderFile(
            path.join(__dirname,"../views/verifyUserEmail.ejs"),      
            { otp }
        );
        const options = {
            from: process.env.Email,
            to: user.email,
            subject: `Verify ${user.name}`,
            html: emailHtml,
        };
        await nodemailer.transporter.sendMail(options);
    }catch(error){
        console.log("Error in sending mail",error);
    }
}