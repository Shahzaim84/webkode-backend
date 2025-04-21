import axios from "axios"
import generateOTP from './generateOTP.js';

// Function to Send OTP to the user
const sendOTP = async (email) => {
    try {
        // Generate OTP
        const otpcode = generateOTP();
        // HTML Code for OTP Code
        const htmlContent = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification Email</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: 'Inter', sans-serif;
                            background-color: #F5F5F5;
                        }
                        .wrapper {
                            max-width: 600px;
                            margin: 0 auto;
                        }
                        .container {
                            padding: 30px 25px;
                            background-color: #FFFFFF;
                            border-radius: 8px;
                            margin: 20px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        .header {
                            background-color: #DC2626;
                            padding: 20px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .logo {
                            color: #FFFFFF;
                            font-weight: 600;
                            font-size: 24px;
                        }
                        .content {
                            padding: 25px 15px;
                            color: #444444;
                            line-height: 1.6;
                        }
                        .otp-code {
                            font-size: 32px;
                            font-weight: 700;
                            color: #DC2626;
                            letter-spacing: 3px;
                            margin: 25px 0;
                            text-align: center;
                            padding: 15px;
                            background-color: #F8F8F8;
                            border-radius: 6px;
                        }
                        .warning {
                            background-color: #FEE2E2;
                            padding: 15px;
                            border-radius: 6px;
                            margin: 20px 0;
                            color: #B91C1C;
                        }
                        .footer {
                            text-align: center;
                            color: #666666;
                            font-size: 12px;
                            padding: 20px;
                        }
                        @media screen and (max-width: 480px) {
                            .container {
                                margin: 10px;
                                padding: 20px 15px;
                            }
                            .otp-code {
                                font-size: 28px;
                                padding: 12px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <div class="header">
                            <div class="logo">Travel Ease</div>
                        </div>
                        <div class="container">
                            <div class="content">
                                <h2 style="color: #DC2626; text-align: center;">Verify Your Identity</h2>
                                <p>Your One-Time Password (OTP) for verification is:</p>
                                
                                <p class="otp-code">${otpcode[0]} ${otpcode[1]} ${otpcode[2]} ${otpcode[3]} ${otpcode[4]} ${otpcode[5]}</p>
                                
                                <div class="warning">
                                    <strong>⚠️ Important:</strong>
                                    <ul>
                                        <li>This OTP is valid for only 5 minutes</li>
                                        <li>Do not share this code with anyone</li>
                                    </ul>
                                </div>

                                <p>If you didn't request this code, please ignore this email or contact our support team immediately.</p>
                            </div>
                        </div>
                        <div class="footer">
                            <p>© 2023 TravelEase. All rights reserved.<br>
                            This is an automated message - please do not reply directly</p>
                        </div>
                    </div>
                </body>
                </html>
        `;

        // API call with HTML in the body
        await axios.post(process.env.OTP_API, {
        recipient: email,
        subject: "OTP Code",
        body: htmlContent
        },{
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(response => {
        console.log('Email sent successfully:', response.data);
        })
        .catch(error => {
        console.log('Error sending email:', error.message);
        });
        
        // Set OTP details and expiration time (2 minutes from now)
        const otpCode = otpcode.join(""); // Convert array to a string if needed
        const otpExpirationTime = Date.now() + 5 * 60 * 1000;

        let otpdetails = {otpCode, otpExpirationTime};
        
        return otpdetails;

    } catch (error) {
        // Log full error details for debugging
        console.error("Error details:", error);
        throw new Error("Failed to send OTP. Please try again.");
    }
};

export default sendOTP;