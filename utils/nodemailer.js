import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const emailsender = (email, otpcode)=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.USER_PASS,
        },
    });

    const mailoption = {
    from: {
        name: "FinConnect - WebKode25",
        address: process.env.USER,
    }, // sender address
    to: [email],
    subject: "OTP Code",
    html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification Email</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: 'Inter', sans-serif;
                            background-color: #f9fafb;
                        }
                        .wrapper {
                            max-width: 640px;
                            margin: 0 auto;
                        }
                        .container {
                            padding: 40px 30px;
                            background: white;
                            border-radius: 16px;
                            margin: 20px;
                            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                            border: 1px solid #eee;
                        }
                        .header {
                            background: linear-gradient(135deg, #fe121a, #ff4047);
                            padding: 40px 20px;
                            text-align: center;
                            border-radius: 16px 16px 0 0;
                        }
                        .logo {
                            color: white;
                            font-weight: 700;
                            font-size: 28px;
                            letter-spacing: -0.5px;
                        }
                        .content {
                            padding: 30px 20px;
                            color: #4a5568;
                            line-height: 1.6;
                        }
                        h2 {
                            color: #1a202c;
                            text-align: center;
                            margin: 0 0 30px 0;
                            font-size: 26px;
                            font-weight: 700;
                        }
                        .otp-container {
                            background: #f8fafc;
                            border-radius: 12px;
                            padding: 24px;
                            margin: 32px 0;
                            text-align: center;
                            border: 1px solid #f0f4f8;
                        }
                        .otp-code {
                            font-size: 40px;
                            font-weight: 800;
                            color: #1a202c;
                            letter-spacing: 8px;
                            margin: 15px 0;
                            font-family: 'Courier New', Courier, monospace;
                        }
                        .otp-code span {
                            display: inline-block;
                            width: 48px;
                            margin: 0 4px;
                            padding: 12px 0;
                            background: white;
                            border-radius: 8px;
                            box-shadow: 0 2px 8px rgba(254,18,26,0.1);
                            border: 1px solid #fee2e2;
                        }
                        .warning {
                            background: #fff5f5;
                            padding: 20px;
                            border-radius: 8px;
                            margin: 32px 0;
                            color: #9b2c2c;
                            border-left: 4px solid #fe121a;
                        }
                        .warning strong {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-size: 16px;
                            margin-bottom: 12px;
                        }
                        ul {
                            margin: 12px 0 0 20px;
                            padding: 0;
                        }
                        li {
                            margin-bottom: 8px;
                        }
                        .footer {
                            background: linear-gradient(135deg, #1a202c, #2d3748);
                            color: white;
                            padding: 32px 20px;
                            text-align: center;
                            border-radius: 0 0 16px 16px;
                            font-size: 14px;
                        }
                        .support-note {
                            color: #718096;
                            margin-top: 32px;
                            font-size: 14px;
                            text-align: center;
                        }
                        .highlight {
                            color: #fe121a;
                            font-weight: 600;
                        }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <div class="header">
                            <div class="logo">FinConnect</div>
                        </div>
                        <div class="container">
                            <div class="content">
                                <h2>Verify Your Email Address</h2>
                                <p>Hello there! Please use the following verification code to complete your email verification:</p>
                                
                                <div class="otp-container">
                                    <div class="otp-code">
                                    ${otpcode[0]} ${otpcode[1]} ${otpcode[2]} ${otpcode[3]} ${otpcode[4]} ${otpcode[5]}
                                    </div>
                                    <p style="color: #718096; margin: 0;">(This code expires in 5 minutes)</p>
                                </div>

                                <div class="warning">
                                    <strong>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        Security Notice
                                    </strong>
                                    <ul>
                                        <li>Never share this code with anyone</li>
                                        <li>This code will expire automatically</li>
                                        <li>If not requested, just ignore</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <footer class="footer">
                            <div>
                                © 2025 FinConnect. All rights reserved.<br>
                               Developed and owned by <span class="highlight">MetaStackers team</span>
                            </div>
                        </footer>
                    </div>
                </body>
                </html>
        `
    };

    const sendmail = async (transporter, mailoption) => {
    try {
        await transporter.sendMail(mailoption);
    } catch (error) {
        console.log(error);
    }
    };


    sendmail(transporter, mailoption);

} 

export default emailsender;
