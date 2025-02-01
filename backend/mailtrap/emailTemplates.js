const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(90deg, #4CAF50, #45a049);
      padding: 20px;
      text-align: center;
      color: white;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333;
      line-height: 1.8;
    }
    .verification-code {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #4CAF50;
      margin: 30px 0;
      letter-spacing: 3px;
    }
    .email-footer {
      background-color: #f9f9f9;
      padding: 15px;
      text-align: center;
      color: #888;
      font-size: 12px;
      border-top: 1px solid #e0e0e0;
    }
    .cta {
      display: inline-block;
      background: #4CAF50;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      margin-top: 10px;
    }
    .cta:hover {
      background: #45a049;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1>Verify Your Email</h1>
    </div>
    <!-- Body -->
    <div class="email-body">
      <p>Hello,</p>
      <p>Thank you for signing up! Your verification code is:</p>
      <div class="verification-code">{verificationCode}</div>
      <p>Enter this code on the verification page to complete your registration.</p>
      <p>This code will expire in <strong>15 minutes</strong> for security reasons.</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
      <a href="http://localhost:5173/verify-email" class="cta" style="color: white;">Verify Now</a>
      <p style="margin-top: 20px;">Best regards,<br>Your App Team</p>
    </div>
    <!-- Footer -->
    <div class="email-footer">
      <p>This is an automated message. Please do not reply to this email.</p>
      <p>© 2025 Your App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;


const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

module.exports= {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE};