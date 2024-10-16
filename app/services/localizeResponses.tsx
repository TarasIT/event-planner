const messagesMap = new Map<string, string>([
  [
    "Registration successful. Please check your email to verify your account.",
    "signupPage.responses.success.signupSuccessful",
  ],
  [
    "Failed to signup. Please try later.",
    "signupPage.responses.error.signupFailed",
  ],
  [
    "The email has already been taken.",
    "signupPage.responses.error.emailTaken",
  ],
  ["The name field is required.", "signupPage.responses.error.nameRequired"],

  ["User not found.", "common.responses.error.userNotFound"],
  ["The email field is required.", "common.responses.error.emailRequired"],
  [
    "The password field is required.",
    "common.responses.error.passwordRequired",
  ],
  ["Event not found.", "common.responses.error.eventNotFound"],
  ["No events found.", "common.responses.error.noEvents"],

  [
    "Failed to check is email verified.",
    "loginPage.responses.error.checkEmailVerificationFailed",
  ],
  ["Email is not verified.", "loginPage.responses.error.notVerifiedEmail"],
  [
    "Email or password does not match the record.",
    "loginPage.responses.error.recordMismatch",
  ],
  [
    "Failed to resend verification email. Please try later.",
    "loginPage.responses.error.failedResendVerificationLink",
  ],
  [
    "Failed to login. Please try later.",
    "loginPage.responses.error.loginFailed",
  ],
  [
    "Verification link resent! Check your email.",
    "loginPage.responses.success.verificationLinkResent",
  ],

  [
    "Email verified successfully.",
    "emailVerificationPage.responses.success.successfulVerification",
  ],
  ["Invalid URL provided.", "emailVerificationPage.responses.error.invalidUrl"],
  [
    "Failed to verify email. Please try later.",
    "emailVerificationPage.responses.error.verificationFailed",
  ],

  ["Logged out successfully.", "logOutPage.responses.success.successfulLogout"],
  [
    "Failed to logout. Please try later.",
    "logOutPage.responses.error.failedLogout",
  ],

  [
    "Failed to get user. Please try later.",
    "profilePage.responses.error.failedGettingUser",
  ],
  [
    "Your profile deleted successfully.",
    "profilePage.responses.success.deletionSuccessful",
  ],
  [
    "Failed to delete profile. Please try later.",
    "profilePage.responses.error.failedProfileDeletion",
  ],
  [
    "Password changed successfully.",
    "profilePage.responses.success.successfulPasswordChanging",
  ],
  [
    "Current password is incorrect.",
    "profilePage.responses.error.incorrectCurrentPassword",
  ],
  [
    "Failed to change password. Please try later.",
    "profilePage.responses.error.failedPasswordChanging",
  ],
  [
    "All events deleted successfully.",
    "profilePage.responses.success.successfulEventsDeletion",
  ],
  [
    "Failed to delete all events. Please, try later.",
    "profilePage.responses.error.failedEventsDeletion",
  ],

  [
    "Failed to reset password. Please try later.",
    "resetPasswordPage.responses.error.failedPasswordReset",
  ],
  [
    "Failed to send reset link. Please try later.",
    "resetPasswordPage.responses.error.failedSendResetLink",
  ],

  [
    "Failed to create an event. Please, try later.",
    "createEventPage.responses.error.createEventFailed",
  ],

  [
    "Failed to update an event. Please, try later.",
    "editEventPage.responses.error.updateEventFailed",
  ],

  [
    "Event deleted successfully.",
    "eventDetailsPage.responses.success.successfulDeletion",
  ],
  [
    "Failed to delete an event. Please, try later.",
    "eventDetailsPage.responses.error.deleteEventFailed",
  ],
  [
    "Failed to retrieve an event. Please, try later.",
    "eventDetailsPage.responses.error.getEventFailed",
  ],

  [
    "Failed to get events. Please, try later.",
    "homePage.responses.error.getEventsFailed",
  ],
]);

export const localizeResponses = (message: string): string => {
  return messagesMap.get(message) || message;
};
