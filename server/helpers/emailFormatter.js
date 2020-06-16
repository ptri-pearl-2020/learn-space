// format email by converting to lowercase, and removing periods in email handle
const emailFormatter = (userEmail) => {
  // Parse email to remove '.' and make it case insensitive
  const emailParts = userEmail.toLowerCase().split('@');
  const emailName = emailParts[0].replace(/\.+/g, '');
  emailParts[0] = emailName;
  const formattedEmail = emailParts.join('@');

  return formattedEmail;
};

module.exports = emailFormatter;
