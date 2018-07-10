const passwordCheck = (password) => {
  if (password.length < 3) return false;
  // const r = new RegExp(//g);
  // if (!r.exec(email)) return false;
  return true;
};

const emailCheck = (email) => {
  const r = new RegExp(/^[a-z0-9](.?[a-z0-9_-]){0,}@[a-z0-9-]+.([a-z]{1,6}.)?[a-z]{2,6}$/g);
  if (!r.exec(email)) return false;
  return true;
};

const enableSubmit = (email, password) => {
  const passwordResult = passwordCheck(password);
  const emailResult = emailCheck(email);
  return passwordResult && emailResult;
};

module.exports = { enableSubmit, emailCheck, passwordCheck };
