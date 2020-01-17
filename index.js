// dependencies
const fs = require("fs");
const inquirer = require('inquirer');
const axios = require('axios');
const generateHTML = require('./generateHTML');
const pdf = require('html-pdf');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile); // gives format to return promise
const puppeteer = require('puppeteer');


//prompt questions
inquirer.prompt([
    {
        type: "input",
        message: "What is your github username?",
        name: "username"
    },
    {
        type: "rawlist",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "green",
            "blue",
            "pink",
            "red"
        ]
    },
]).then(async function (data) {
    let html = generateHtml(data);
    return writeFileAsync("index.html", html);
} ).then(function(){
    console.log("Success!")
});

        // let gitHubData = await githubURL(userInput.username)
        // console.log(githubURL);


    // use user input data to use axios to request github stats and save as a variable
    // let gitHubRes = axios request to appropriate url
    // construct new object that contains github response and user input together and then send to generateHTML where you can then dynamically render the information
    // let combinedData = {
        // githubData: gitHubRes,
        // userInputData: data
    // }
    // console.log(generateHTML(combinedData));

// function writeToFile(fileName, data) {
// }
// function init() {
// }