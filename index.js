//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var UserAuth = false;

app.use(bodyParser.urlencoded({extended:true}));

function authorisation(req,res,next) {
    const pw = req.body["password"];
    if(pw === "CodingIsFun"){
        UserAuth = true;
    }
    else{
        UserAuth = false;
    }
    next();
}

app.use(authorisation)

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/check", (req,res)=>{
    if(UserAuth){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})