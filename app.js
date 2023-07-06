
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/signup.html");
    console.log("Website loaded succesfully.");
});

app.post("/", function(req, res) {
    var firstName = req.body.first_name;
    var secondName = req.body.second_name;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : secondName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/c2675a77d0";
    var options = {
        method: "POST",
        auth: "saran0025:2d119737ea36c68da2941cf87301a5ef-us9"
    }
    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    console.log("try again executed successfully.");
    res.redirect("/");
});

app.listen(process.env.PORT || 3003, function() {
    console.log("Server has been successfully deployed in localhost port 3003");
});


// API KEY
// 2d119737ea36c68da2941cf87301a5ef-us9

// 
// c2675a77d0