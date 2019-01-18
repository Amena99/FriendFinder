//Dependencies
//========================================
//require express 
var express = require("express");
var path = require("path");

//Set up the Express App
//==========================================
var app = express();
var PORT = process.env.PORT || 3000;

//Set up the Express app to handle the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Available Friends (DATA)
//==========================================
var friendsArray = [
    {
        name: "Pat Smith",
        photo: "",
        scores: [
            "3",
            "2",
            "2",
            "5",
            "3",
            "4",
            "4",
            "4",
            "1",
            "5" 
        ]
    },
    {
        name: "Greg Botlink",
        photo: "",
        scores: [
            "3",
            "5",
            "2",
            "1",
            "3",
            "5",
            "4",
            "2",
            "3",
            "5" 
        ]
    },
    {
        name: "Gina Hernandez",
        photo: "",
        scores: [
            "3",
            "1",
            "2",
            "3",
            "3",
            "2",
            "1",
            "4",
            "1",
            "1" 
        ]
    },
    {
        name: "Salman Patel",
        photo: "",
        scores: [
            "3",
            "5",
            "5",
            "5",
            "3",
            "4",
            "5",
            "5",
            "1",
            "5" 
        ]
    },
];

//Routes
//==========================================

//HTML Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});


//API Routes
app.get("/api/friends", function(req, res){
    return res.json(friendsArray);
});

//Add friend
app.post("/api/friends", function(req, res){
    var newFriend = req.body;
    newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();
    friendsArray.push(newFriend);
    console.log(newFriend);

    res.json(newFriend);
    
    //Find the difference between the scores of new friend just entered and 
    //the scores of all previous friends already in the API.
    function findDifference(compareFriend) {
        let differenceArray = [];
        for(let i=0; i<newFriend.scores.length; i++){
        let difference = Math.abs(newFriend.scores[i] - compareFriend.scores[i]);
        differenceArray.push(difference);  
        }
        let totalDifference = 0;
        for(let k=0; k<differenceArray.length; k++){
            totalDifference = totalDifference + differenceArray[k];
        }    
        return totalDifference;
    };

    //Run the findDifference function inside a for loop that goes through whole
    //array of friends and saves the difference for each friend in an array
    //called scoresArray.
    let scoresArray = [];
    function runfindDifference(){
       
            for(let j=0; j<(friendsArray.length-1); j++){
                scoresArray.push(findDifference(friendsArray[j])); 
            };

    }
    runfindDifference() 

    //Function to find the difference number that is the least in scoresArray
    function findWinningScore(){
        let smallestscore = scoresArray[0];
        for (let l = 0; l<=scoresArray.length; l++){
            if(smallestscore>scoresArray[l]){
            smallestscore = scoresArray[l];
            }
        }
        return smallestscore;
    };

    //Function to find the friend who matches with the least difference number
    //(returns the friend object of friendsArray that matches)
    function displayWinner(){
        let winningscore = findWinningScore();
        let difference2 = 0;
        for(let m=0; m<(friendsArray.length-1); m++){
            difference2 = findDifference(friendsArray[m]); 
            if(difference2===winningscore){
                return  friendsArray[m]
            }
        }
    };
    console.log(displayWinner());
});

//Start server to begin listening
//==========================================
app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
})