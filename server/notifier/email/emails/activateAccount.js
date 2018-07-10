const sender = process.env.ADMIN_EMAIL;
const titleGen = body => `Torrent.Report > ${body}`;
const bodyHTML = body =>
  `<h1>Torrent.Report</h1><br />
  <p>
  Your token is <b>${body}</b>
  </p>
  <p>
  <a href="https://torrent.report/activate/${body}">
  click here
  </a>
  to activate using your account.
  </p>
  <hr />
  <p>
  ❤️
  https://torrent.report
  🌏
  </p>`;
const bodyTEXT = body =>
  `Torrent.Report\nYour token is: ${body}.\n Or activate your account by navigating to https://torrent.report/activate/${body}`;

const activateMessage = (token, receiver) => ({
  from: sender,
  to: receiver,
  subject: titleGen('Activate Your Account'),
  text: bodyTEXT(token),
  html: bodyHTML(token),
});

module.exports = activateMessage;
