// api.js
const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '517416',
    key: 'b5de27e934d03fd0f0a8',
    secret: 'ec8adfbf587591339607',
    cluster: 'us2',
    encrypted: 'true'
  });
  
let messages = [];

router.get('/', (req, res) => {
  var challenge = req.headers['hub_challenge'];
  var token = req.headers['hub_verify_token'];
  if (token == 'myToken123'){
    console.log(`mi token es ${token}`);
  }
  else {
  res.send('all good2');
  }
});

router.post('/pusher/auth', (req, res) => {
    console.log("estoy x aqui");
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });

module.exports = router;