const sender = process.env.ADMIN_EMAIL;
const titleGen = body => `TorrentReport > Error > ${body}`;
const bodyHTML = body => `<h1>Error happened again..</h1><br /><p>${body}</p>`;
const bodyTEXT = body => `Error happened again...     \n  ${body} `;

const errorMessage = ({ message, title, receiver }) => ({
  from: sender,
  to: receiver,
  subject: titleGen(title),
  text: bodyTEXT(message),
  html: bodyHTML(message),
});

module.exports = { errorMessage };
