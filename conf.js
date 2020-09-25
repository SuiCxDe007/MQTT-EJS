//NOT NEEDED FOR EJS 

var fs = require('fs');
var mqtt = require('mqtt');
const express = require('express');


const app = express();

var dataconfig = fs.readFileSync('file/cred.json');
myfileobj = JSON.parse(dataconfig);

//connect to MQTT

const client = mqtt.connect("mqtt://" + myfileobj.mqttHost + ":" + myfileobj.port, { username: myfileobj.username, password: myfileobj.mqttPassword });

client.on('connect', () => {

    console.log("Connected Successfully!");
    client.subscribe('kav');



}).on('error', (err) => {
    console.log('Error Occured: ', err.message);
});



client.on('message', (topic, message) => {

    console.log("Message Received :", "Topic:", topic.toString(), "Messege:", message.toString());
    hh.innerText += topic.toString();

});
