// dependencies
const fs = require("fs");
const inquirer = require('inquirer');
const axios = require('axios').default;
const generateHTML = require('./generateHTML');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile); // gives format to return promise
const pdf = require('html-pdf');


//prompt user for username and favorite color
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
    }
])
.then(function(res) {
    const userName = res.username;
    const userColor = res.color;

    const queryURL = `https://api.github.com/users/${userName}`;
    const starredURL = `https://api.github.com/users/${userName}/starred`;


    //calling a function
gitHubRequest(queryURL).then(function(userData){
    githubStars(starredURL)
    .then(function(starResponse) {
        const options = { format: 'Letter' };
        pdf.create(generateHTML(res, starResponse, userData), options).toFile(`./${userName.username}.pdf`, function (err, result) {
            if (err) return console.log(err);
            console.log(result);
        })
    })
})
});



//API CALL
function gitHubRequest(queryURL) {
    return axios.get(queryURL)
    .then(function(gitResponse){

        let userData = {
        //avitar URL
        fullName : (gitResponse.data.name),
        proPic : (gitResponse.data.avatar_url + ".png"),
        gitUsername : (gitResponse.data.login),
        location : (gitResponse.data.location),
        profileURL : (gitResponse.data.html_url),
        blog : (gitResponse.data.blog),
        userBio : (gitResponse.data.bio),
        publicRepos : (gitResponse.data.public_repos),
        followers : (gitResponse.data.followers),
        following : (gitResponse.data.following)
        };

        return userData;
        
    }).catch(function(error){
        console.log(error);
    });
};

//api call for number of stars
function githubStars(starredURL){
    return axios.get(starredURL)
    .then(function (starResponse) {
        return starResponse.data.length;
    });
}