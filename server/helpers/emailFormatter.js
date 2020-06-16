// format email by converting to lowercase, and removing periods in email handle
const emailFormatter = (userEmail) => {
  if (userEmail === undefined) return 'error: email received is undefined';

  // Parse email to remove '.' and make it case insensitive
  try {
    const emailParts = userEmail.toLowerCase().split('@');
    const emailName = emailParts[0].replace(/\.+/g, '');
    emailParts[0] = emailName;
    const formattedEmail = emailParts.join('@');

    return formattedEmail;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

module.exports = emailFormatter;
