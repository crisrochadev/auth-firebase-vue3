

import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { checkoobCode, applyoobCode, sendPasswordResetEmail } from "firebase/auth";

async function handleResetPassword(auth, oobCode, continueUrl, lang, data) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.

  // Verify the password reset code is valid.
  console.log(data)
  return await verifyPasswordResetCode(auth, oobCode).then(async (email) => {
    const accountEmail = email;

    // TODO: Show the reset screen with the user's email and ask the user for
    // the new password.
    console.log(data)
    const newPassword = data.password;

    // Save the new password.
    return await confirmPasswordReset(auth, oobCode, newPassword).then((resp) => {
      return {
        success:true,
        message:"Senha alterada com sucesso!"
      }
    }).catch((error) => {
      return {
        success:false,
        error,
        errorType:'confirmPasswordReset'
      }
    });
  }).catch((error) => {
    return {
      success:false,
      error,
      errorType:'verifyPasswordResetCode'
    }
  });
}


function handleRecoverEmail(auth, oobCode, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  let restoredEmail = null;
  // Confirm the action code is valid.
  checkoobCode(auth, oobCode).then((info) => {
    // Get the restored email address.
    restoredEmail = info['data']['email'];

    // Revert to the old email.
    return applyoobCode(auth, oobCode);
  }).then(() => {
    // Account email reverted to restoredEmail

    // TODO: Display a confirmation message to the user.

    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    sendPasswordResetEmail(auth, restoredEmail).then(() => {
      // Password reset confirmation sent. Ask user to check their email.
    }).catch((error) => {
      // Error encountered while sending password reset code.
    });
  }).catch((error) => {
    // Invalid code.
  });
}
function handleVerifyEmail(auth, oobCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  applyoobCode(auth, oobCode).then((resp) => {
    // Email address has been verified.

    // TODO: Display a confirmation message to the user.
    // You could also provide the user with a link back to the app.

    // TODO: If a continue URL is available, display a button which on
    // click redirects the user back to the app via continueUrl with
    // additional state determined from that URL's parameters.
  }).catch((error) => {
    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });
}


export default async function viewConfirmation(auth, query, data) {
  // TODO: Implement getParameterByName()

  console.log(query)

  const { mode, oobCode, continueUrl, lang } = query;
  



  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      return await handleResetPassword(auth, oobCode, continueUrl, lang, data);
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      handleRecoverEmail(auth, oobCode, lang);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      handleVerifyEmail(auth, oobCode, continueUrl, lang);
      break;
    default:
    // Error: invalid mode.
  }
}