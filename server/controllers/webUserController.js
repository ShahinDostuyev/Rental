const { WebUser } = require("../models/WebUser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");
const moment = require("moment");

let privateKey = "rental";

const webUserController = {
  register: (req, res) => {
    let email = req.body?.email.toLowerCase();
    WebUser.findOne({ email: email })
      .then((data) => {
        if (data) {
          res.status(500).json({ msg: "User already exists" });
        } else {
          let confirmCode = Math.floor(Math.random() * 10000);

          let codeExpire = moment().add("59", "s");
          const webUser = new WebUser({
            email: email,
            username: req.body.username,
            password: req.body.password,
            code: confirmCode,
            codeExpire: codeExpire,
          });

          webUser.save();

          sendConfirmEMail(email, confirmCode);

          res.json({ email });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  confirm: (req, res) => {
    let code = req.body.code;
    let email = req.body.email;

    WebUser.findOne({ email: email }).then((user) => {
      if (user.codeCounter == 0) {
        res.status(500).json({ message: "BLOCK!!" });
      } else {
        if (user.code == code) {
          if (user.codeExpire > moment()) {
            let token = jwt.sign(email, privateKey);
            user.isActive = true;
            user.codeCounter = 3;
            user.save();
            res.json({ token });
          } else {
            res.status(500).json({ message: "Expire Date Error!" });
          }
        } else {
          user.codeCounter = user.codeCounter - 1;
          user.save();
          res.status(404).json({
            "Confirm code error:!": "Tries left " + user.codeCounter,
          });
        }
      }
    });
  },
  login: (req, res) => {
    console.log(req.body);

    WebUser.findOne({ email: req.body.email, password: req.body.password })
      .then((user) => {
        if (user) {
          console.log(user);
          if (!user.isActive) {
            console.log(user.isActive);
            let confirmCode = Math.floor(Math.random() * 10000);
            let codeExpire = moment().add("30", "s");
            user.code = confirmCode;
            user.codeExpire = codeExpire;
            user.save();
            sendConfirmEMail(req.body.email, confirmCode);
            res.status(203).json({ email: req.body.email });
          } else {
            let token = jwt.sign(req.body.email, privateKey);
            res.status(200).json({ token });
          }
        } else {
          res.status(404).json({ message: "email or password wrong!" });
        }
      })
      .catch((err) => {
        res.status(500).json(err, "server error");
      });
  },
  token: (req, res) => {
    let token = req.body.token;

    try {
      const email = jwt.verify(token, privateKey);
      WebUser.findOne({ email: email }).then(function (user) {
        res.status(200).json({ user: user });
      });
    } catch (error) {
      res.status(500).json({ message: "Token error!" });
    }
  },
  forgetpassword: async (req, res) => {
    const email = req.body.email;
    try {
      const findUser = await WebUser.findOne({ email });
      if (!findUser) {
        return res.status(404).json("Email not found");
      }
      const token = crypto.randomBytes(30).toString("hex");
      findUser.forgetToken = token;
      await findUser.save();
      sendChangePasswordEMail(email, token, findUser);
      return res.status(200).json("OK");
    } catch (error) {
      console.log(error);
    }
  },
  changepassword: async (req, res) => {
    const userId = req.body.userId;
    const token = req.body.token;
    const password = req.body.password;
    try {
      const user = await WebUser.findById(userId);
      if (!user) {
        res.status(404).json("User not found");
      }
      if (user.forgetToken !== token) {
        res.status(401).json("Token incorrect");
      }
      user.password = password;
      user.forgetToken = null;
      await user.save();
      res.status(200).json("zor");
    } catch (error) {
      console.log(error);
    }
  },
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: "c8657545@gmail.com",
    pass: "bcozssymjajpqicg",
  },
});

function sendConfirmEMail(to, code) {
  transporter.sendMail({
    from: "c8657545@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Confirm Code: ", // Subject line
    text: "Your confirm code: " + code, // plain text body
  });
}

function sendChangePasswordEMail(to, token, findUser) {
  transporter.sendMail({
    from: "c8657545@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Change password: ", // Subject line
    html: `
                    <p> sifrenizi deyismek isteyirsinizse buraya click edin</p>
                    <p> 
                    <a href="http://localhost:3000/changepassword?token=${token}&userId=${findUser._id}">
                    Update password
                    </a>
                    </p>
                `,
  });
}

module.exports = {
  webUserController,
};
