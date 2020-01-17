// dependencies
const fs = require("fs");
const inquirer = require('inquirer');
const axios = require('axios');
const generateHTML = require('./generateHTML');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile); // gives format to return promise



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
    const starredURL = `https://api.github.com/users/${userName}/starred{/owner}{/repo}`;


    //calling a function
gitHubRequest(queryURL).then(function(){})
});

function gitHubRequest(queryURL) {
    return axios.get(queryURL)
    .then(function(gitResponse){
        //avitar URL
        const proPic = gitResponse.data.avatar_url + ".png";

        //github Username
        const gitUsername = gitResponse.data.login;
        console.log(gitUsername);

        //user location
        const location = gitResponse.data.location;
        console.log(location);

        //profile
        const profileURL = gitResponse.data.html_url;
        console.log(profileURL);

        //blog
        const blog = gitResponse.data.blog;
        console.log(blog);

        //bio
        const userBio = gitResponse.data.bio;
        console.log(userBio);

        //public repositories
        const publicRepos = gitResponse.data.public_repos;
        console.log(publicRepos);

        //numberOfFollowers
        const followers = gitResponse.data.followers;
        console.log(followers);

        //numberOfFollowing
        const following = gitResponse.data.following;
        console.log(following)
        
    }).catch(function(error){
        console.log(error);
    });
};