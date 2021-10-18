// bot prefix !1
// role-name v1
// role-id 899119339125481472
// server or guild id 897324835200438273
// channel-id 899110391643250728

// Importing prefix and token from config.json
const { prefix, token } = require("./config.json");
// Adding channel ID of innerve botathon verification channel
const verificationChannelID = "899110391643250728";
//Adding discord.js file
const Discord = require("discord.js");
// Create an instance of a Discord client
const client = new Discord.Client({
  presence: {
    status: "online",
    activity: {
      name: `${prefix} help for command list`,
    },
  },
});

// Checking if the bot is connected
client.on("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for messages
client.on("message", (message) => {
  //Doing away with the problem of the bot reading its own messages
  if (message.author.bot) return;
  console.log(message.content);

  const userId = message.author.id;

  if (message.content === `${prefix} help`) {
    message.channel.send(`

    Hello <@${userId}>! These are the commands I can offer you:

**!1 Admission Number** - To get yourself verified and get a role assigned to yourself. Head over to the <#${verificationChannelID}> channel and type in your admission number.
**!1 help** - To get a list of commands.
  
Thank-you Pooja Gera for giving me life. 
    `);
  }

  //Ensuring that anything except help runs in only in the verification channel
  else if (
    message.content.startsWith(`${prefix}`) &&
    message.channel.id === verificationChannelID
  ) {
    // If the message is verified
    const { guild } = message;
    const member = guild.members.cache.get(userId);

    if (alreadyVerified(member, message)) {
      message.channel.send(`You have already been verified <@${userId}>.`);
    }

    if (
      !alreadyVerified(member, message) &&
      verify(message.content.slice(prefix.length))
    ) {
      const { guild } = message;
      const role = guild.roles.cache.find((role) => role.name === "v1");
      const member = guild.members.cache.get(userId);

      if (role) {
        member.roles.add(role);
      }

      // Send congratulations to the same channel
      message.channel.send(
        `Congratulations <@${userId}>! You have been verified.`
      );

      //Reaction to the message
      message.react("✅").then(console.log).catch(console.error);
    } else if (!alreadyVerified(member, message)) {
      message.channel.send("Sorry! You can not been verified.");
      //Reaction to the message
      message.react("❌").then(console.log).catch(console.error);
    }
  } else if (
    message.content.startsWith(`${prefix}`) &&
    !(message.channel.id === verificationChannelID)
  ) {
    message.channel.send(
      `Head over to <#${verificationChannelID}> to get yourself verified. The command will not work here.`
    );
  }
});

client.login(token);

//verification function
function verify(inputStr) {
  if (inputStr.length < 13 || inputStr.length > 16) {
    console.log("Not verified 1");
    return false;
  }

  const checkArray = inputStr.split("-");
  console.log(checkArray);

  //checking the roll number
  var rollNumber = parseInt(checkArray[0]);
  if (rollNumber == 0) {
    console.log("Not verified 2");
    return false;
  }

  //checking course
  var course = checkArray[1];
  var availableCourses = ["UG", "PG", "D"];
  if (!availableCourses.includes(course)) {
    console.log("Not verified 3");
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
    console.log("Not verified 4.1");
    return false;
  } else if (
    course === "PG" &&
    !availableBranchesForPG.includes(currentBranch)
  ) {
    console.log("Not verified 4.2");
    return false;
  } else if (course === "D" && !availableBranchesForD.includes(currentBranch)) {
    console.log("Not verified 4.3");
    return false;
  }

  //checking year
  var year = parseInt(checkArray[3]);
  var currentYear = 2021;

  //range is currentYear + 1 and currentYear + jitna course h

  //UG is a 4 year course
  if (course === "UG") {
    if (year <= currentYear + 4 && year >= currentYear + 1) {
      console.log("Verified");
      return true;
    } else {
      console.log("Not verified 5.1");
      return false;
    }
  }

  //PG is a 2 year course
  else if (course === "PG") {
    if (year <= currentYear + 2 && year >= currentYear + 1) {
      console.log("Verified");
      return true;
    } else {
      console.log("Not verified 5.1");
      return false;
    }
  }

  //D is a 2 year course
  else if (course === "D") {
    if (year <= currentYear + 2 && year >= currentYear + 1) {
      console.log("Verified");
      return true;
    } else {
      console.log("Not verified 5.1");
      return false;
    }
  }
}

const roleId = "899119339125481472";
const roleName = "v1";

//this will basically check if the user already has a role or not, if the user does then they've already been verified
function alreadyVerified(member, message) {
  if (message.member.roles.cache.has(roleId)) {
    return true;
  } else {
    return false;
  }
}
