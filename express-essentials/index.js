import express from "express";

const app = express();

const PORT = 3000;

// make sure the app is listening on the specified port
// liten() takes in two parameters: PORT No and a function
app.listen(PORT, () => {
  console.log(
    `✨ Listening on port: ${PORT} ✨ \n#MbithiRocks because YOU ROCK!`
  );
});
