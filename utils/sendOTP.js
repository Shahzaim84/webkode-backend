import generateOTP from './generateOTP.js';
import emailsender  from "./nodemailer.js";

// Function to Send OTP to the user
const sendOTP = async (email) => {
    try {
        // Generate a new OTP
        const otp = generateOTP();
        
        // Send OTP via email
        await emailsender(email, otp);

        // Set OTP details and expiration time (2 minutes from now)
        const otpCode = otp.join(""); // Convert array to a string if needed
        const otpExpirationTime = Date.now() + 5 * 60 * 1000;

        // Return the otp details
        return {otpCode, otpExpirationTime}
    } catch (error) {
        // Log full error details for debugging
        console.error("Error details:", error);
        throw new Error("Failed to send OTP. Please try again.");
    }
};

export default sendOTP;
