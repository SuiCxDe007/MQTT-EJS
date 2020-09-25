var app = require("express")();
var bodyParser = require("body-parser");

var reload = require('reload')
    //mqtt
var fs = require('fs');
var mqtt = require('mqtt');
var help = null;
//Set view engine to ejs
app.set("view engine", "ejs");

//Tell Express where we keep our index.ejs
app.set("views", __dirname);

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Instead of sending Hello World, we render index.ejs
app.get("/", (req, res) => { res.render("index", { username: help }); });
app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });


var dataconfig = fs.readFileSync('file/cred.json');
myfileobj = JSON.parse(dataconfig);

const client = mqtt.connect("mqtt://" + myfileobj.mqttHost + ":" + myfileobj.port, { username: myfileobj.username, password: myfileobj.mqttPassword });

client.on('connect', () => {

    console.log("Connected Successfully!");
    client.subscribe('kav');



}).on('error', (err) => {
    console.log('Error Occured: ', err.message);
});



client.on('message', (topic, message) => {

    console.log("Message Received :", "Topic:", topic.toString(), "Messege:", message.toString());
    help = message.toString();
    return help;

});