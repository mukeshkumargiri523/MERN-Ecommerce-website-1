const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //todo: this is temporary token for testing
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDVlZDhiOWQxZmU2OWQyOWY0MDAzOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk5MDgxOTIwfQ.dxEgsbo-1HIhmpUOnrmY1f87fLTI-jwaFnropIvXoUw";
  // token =
  //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDQ3M2Q0MTc5OTk1MDI4NmEyY2ZmZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk5MDI0MDc0fQ.5d_bvTnx23I5Onmb6-ztGuwa1b_pa7eJywkCj_ryXe4";
  return token;
};
