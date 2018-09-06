const buildConfirmationLink = (token) => {
  return `${process.env.DATA_FLOW_URL}/auth/confirm/${token}`;
};

const buildMail = (name, token) => {
  const confirmationLink = buildConfirmationLink(token);

  return '<h1>Hello ' + name + '!</h1>' +
    '<h3>To confirm your <span>Time organizer</span> account ' +
    'click the link below:</h3>' +
    '<a href="' + confirmationLink + '">' + confirmationLink + '</a>';
};

const buildResentMail = (token) => {
  const confirmationLink = buildConfirmationLink(token);

  return '<h1>Hello again!</h1>' +
    '<h3>To confirm your <span>Time organizer</span> account ' +
    'click the link below:</h3>' +
    '<a href="' + confirmationLink + '">' + confirmationLink + '</a>';
};

module.exports = {
  buildMail,
  buildResentMail,
};
