const Account = require("./AccountSchema");
const { generateToken, decode } = require("./jwt");
const { transporter } = require("./mailSender");
const bcrypt = require("bcrypt");

let registerFunction = function(request, response, next) {
  try {
    let hash = bcrypt.hashSync(request.body.password, 10);
    request.body.password = hash;
    let account = new Account(request.body);

    let saved = account.save((err, acc) => {
      if (err) {
        console.log("Error happened " + err);
        next(err);
      } else {
        const token1 = generateToken({
          username: request.body.username,
          email: request.body.email,
          role: request.body.userType
        });
        response.json({ complete: true, token: token1 });
        // console.log("User has been saved successfully" + admin);
      }
    });
  } catch (error) {
    console.log("Error :: " + error);
    next(error);
  }
};

let login = function(request, response, next) {
  try {
    Account.findOne({ username: request.body.username }, (err, data) => {
      try {
        if (err) {
          response.status(500).json({ status: 500, message: "Error " + err });
        } else if (!data) {
          response
            .status(500)
            .json({ status: 400, message: "Sorry, User Not Found" });
        } else {
          if (bcrypt.compareSync(request.body.password, data.password)) {
            const token1 = generateToken({
              username: request.body.username,
              email: request.body.email,
              role: data.userType
            });
            response.json({
              complete: true,
              token: token1,
              username: data.username,
              name: data.firstName + " " + data.lastName,
              email: data.email,
              userType: data.userType,
              id : data._id
            });
          } else {
            response
              .status(400)
              .json({ status: 400, message: "Incorrect username or password" });
          }
        }
      } catch (error) {
        response
          .status(400)
          .json({ status: 400, message: "unable to login, " + error });
      }
    });
  } catch (error) {
    response
      .status(400)
      .json({ status: 400, message: "Error occured, " + error });
  }
};

let subscribe = function(request, response, next) {

  console.log("subscribtion :: "+ request.body.broadcasterId);
  const broadcasterId = request.body.broadcasterId;
  delete request.body.broadcasterId;
  // const userId = request.body.userId;
  // const userEmail = request.body.userEmail;
  // const info = { userId: userId, email: userEmail }
  try {
let exist = checkSubscribeExist(broadcasterId,request.body.userId);
if(!exist){
  Account.findOneAndUpdate(
    { _id: broadcasterId },
    { $push: { subscribers: request.body } },
    function(err, update) {
      if (err) next(err);
      else response.json({ "data": "subscribed sucessfully" });
    }
  );
}else{
  response.json({ "data": "you are already a subscriber" });
}
 
   

   
  } catch (err) {
    console.log("Error happened :: " + error);
    next(error);
  }
};

let checkSubscribeRest = function(request, response, next) {
  Account.findOne(
    {
      $and: [
        {
          _id: request.body.broadcasterId,
          "subscribers.userId": request.body.userId
        }
      ]
    },
    (err, obj) => {
      if (err) next(err);
      else if (obj) response.json({ exist: true });
      else response.json({ exist: false });
    }
  );
};

let checkSubscribeExist = function(broadcasterId, userId) {
  Account.findOne(
    { $and: [{ _id: broadcasterId, "subscribers.userId": userId }] },
    (err, obj) => {
      if (err) next(err);
      else if (obj) return true;
      else return false;
    }
  );
};

let findOneAccount = function(broadcasterId) {
  Account.findOne({ _id: broadcasterId }, (err, obj) => {
    if (err) next(err);
    else if (obj) console.log("this is the object from find one ::-->" + obj);
    else return console.log("could not be found from find one");
  });
};

let notifySubscriber = function(messageObject) {
  try {
    let broadcaster;
    let email = "remymailsender@gmail.com";
    let title = messageObject.title;
    let message = "";
    // let broadcasterObject = [];
    let emailList;
    console.log(
      "this is the subscriber ID :: -->" + messageObject.broadcasterId
    );
    Account.findOne({ _id: messageObject.broadcasterId }, function(err, obj) {
      if (err) throw err;
      else if (obj) {
        console.log("this is the object :: -->" + obj.firstName);
        broadcaster = obj;
        obj.subscribers.forEach(sub => {
          emailList += sub.userEmail + ",";
        });
        console.log("after email loop");

        console.log("after find one method");
        var mail = {
          from: email,
          to: emailList, //Change to email address that you want to receive messages on
          subject: "Upcoming live Stream",
          text:
            "Hello, " +
            broadcaster.firstName +
            " " +
            broadcaster.lastName +
            " is broadcasting at " +
           new Date(messageObject.time).toString()
        };

        transporter.sendMail(mail, (err, data) => {
          if (err) {
            console.log("could not send email :: " + err);
          } else {
            console.log("email sent sucessfully");
          }
        });
        console.log("this email sent sucessfully");
      }
    });
  } catch (error) {
    console.log("Exception happened :: " + error);
  }
};

module.exports = {
  registerFunction,
  login,
  subscribe,
  checkSubscribeRest,
  notifySubscriber
};
