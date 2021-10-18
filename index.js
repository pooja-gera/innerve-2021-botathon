const { prefix, token } = require("./config.json");

const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for messages
client.on("message", (message) => {
  console.log(message.content);

  //Doing away with the problem of the bot reading its own messages
  if (message.author.bot) return;

  // If the message is verified
  if (verify(message.content)) {
    // Send "pong" to the same channel
    message.channel.send("Congratulations! You have been verified.");

    //Reaction to the message
    message.react("✅").then(console.log).catch(console.error);
  } else {
    message.channel.send("Sorry! You have not been verified.");

    //Reaction to the message
    message.react("❌").then(console.log).catch(console.error);
  }
});

client.login(token);

//verification function
function verify(inputStr) {
  if (inputStr.length < 13 || inputStr.length > 16) {
    // console.log("Not verified 1");
    return false;
  }

  const checkArray = inputStr.split("-");
  console.log(checkArray);

  //checking the roll number
  var rollNumber = parseInt(checkArray[0]);
  if (rollNumber == 0) {
    //console.log("Not verified 2");
    return false;
  }

  //checking course
  var course = checkArray[1];
  var availableCourses = ["UG", "PG", "D"];
  if (!availableCourses.includes(course)) {
    //console.log("Not verified 3");
    return false;
  }

  //checking branch
  var availableBranchesForUG = [
    "CSAI",
    "CSE",
    "ECAI",
    "ECE",
    "IT",
    "MAE",
    "EEE",
    "CE",
  ];
  var availableBranchesForPG = [
    "PD",
    "AE",
    "CH",
    "CE",
    "EE",
    "ME",
    "ED",
    "MV",
    "ER",
    "QT",
    "RAS",
    "AI",
    "CS",
    "CP",
  ];
  var availableBranchesForD = [
    "BE",
    "CHE",
    "CHEM",
    "CE",
    "AI",
    "RAS",
    "CS",
    "CP",
    "CG",
    "CC",
    "VLSI",
    "EV",
    "DES",
  ];
  var currentBranch = checkArray[2];

  if (course === "UG" && !availableBranchesForUG.includes(currentBranch)) {
    //console.log("Not verified 4.1");
    return false;
  } else if (
    course === "PG" &&
    !availableBranchesForPG.includes(currentBranch)
  ) {
    //console.log("Not verified 4.2");
    return false;
  } else if (course === "D" && !availableBranchesForD.includes(currentBranch)) {
    //console.log("Not verified 4.3");
    return false;
  }

  //checking year
  var year = parseInt(checkArray[3]);
  if (year > 2023 || year < 2021) {
    //console.log("Not verified 5");
    return false;
  }

  //console.log("verified!");
  return true;
}
