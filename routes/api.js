// api.js
const express = require('express');
const router = express.Router();

const verifyToken = process.env.FB_VERIFY_TOKEN;
const accessToken = process.env.FB_ACCESS_TOKEN;

router.get('/', (req, res) => {
  var challenge = req.query['hub.challenge'];
  var token = req.query['hub.verify_token']
  if (token === verifyToken){
    console.log(`mi token es ${token}`);
    res.send(challenge);
  }
  console.log(req.body);
  res.send("holas X");
  
});

router.post('/', (req, res) => {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page'){

    //iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry){
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      //Iterate over each messaging event
      entry.messaging.forEach(function(event){
        if (event.message){
          receivedMessage(event);
        }
        else {
          console.log("webhook received unknown event:",event);
        }
      });
    });

    //Assume all went well
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

function receivedMessage(event){
  console.log("Message Data:", event.message);
}
module.exports = router;