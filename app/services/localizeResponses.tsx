const messagesMap = new Map<string, string>([
  [
    "Email verified successfully.",
    "emailVerificationPage.responses.success.successfulVerification",
  ],
  ["Invalid URL provided.", "emailVerificationPage.responses.error.invalidUrl"],
  ["User is not found.", "emailVerificationPage.responses.error.userNotFound"],
  [
    "Failed to verify email. Please try later.",
    "emailVerificationPage.responses.error.internalServerError",
  ],
]);

export const localizeResponses = (message: string): string => {
  return messagesMap.get(message) || "";
};
