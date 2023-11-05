const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

/////////
const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../service/common");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");

// exports.createUser = async (req, res) => {
//   try {
//     const salt = crypto.randomBytes(16);
//     crypto.pbkdf2(
//       req.body.password,
//       salt,
//       310000,
//       32,
//       "sha256",
//       async function (err, hashedPassword) {
//         const user = new User({ ...req.body, password: hashedPassword, salt });
//         const doc = await user.save();

//         req.login(sanitizeUser(doc), (err) => {
//           // this also calls serializer and adds to session
//           if (err) {
//             res.status(400).json(err);
//           } else {
//             const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
//             res
//               .cookie("jwt", token, {
//                 expires: new Date(Date.now() + 3600000),
//                 httpOnly: true,
//               })
//               .status(201)
//               .json({ id: doc.id, role: doc.role });
//           }
//         });
//       }
//     );
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha512",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) => {
          // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);

            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

exports.checkAuth = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
