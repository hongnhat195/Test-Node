const check_rules_jion = (req, res, next) => {
  const { ID, password, Email, Phone } = req.body;
  console.log(req.body);
  const patternID = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$"
  );
  const patternPassword = new RegExp(
    "^(?=.*[!@#$%^&*()/^+=?.,;=])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()/^+=?.,;=]{8,}$"
  );
  const mailformat = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const phoneformat = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
  var isValid =
    patternID.test(ID) &&
    mailformat.test(Email) &&
    phoneformat.test(Phone) &&
    patternPassword.test(password);
  console.log(isValid);
  if (isValid) {
    next();
  } else res.status(400).send({ message: "Lỗi định dạng" });
};
const check_rules_update = (req, res, next) => {
  const { ID, Email, Phone } = req.body;
  console.log(req.body);
  const patternID = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$"
  );
  const mailformat = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const phoneformat = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
  var isValid =
    patternID.test(ID) && mailformat.test(Email) && phoneformat.test(Phone);
  console.log(isValid);
  if (isValid) {
    next();
  } else res.status(400).send({ message: "Lỗi định dạng" });
};
export { check_rules_jion, check_rules_update };
