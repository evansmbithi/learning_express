import express from "express";
import data from "./data/mock.json" assert { type: "json" }
// needs an import assertion of type "json"

const app = express();

const PORT = 3000;

// use public folder at / root of project
app.use(express.static("public"))

// serve the images folder at route /images
app.use('/images', express.static('images'))

app.get('/', (request, response) => {
  // response.send('This is a GET request at /')
  response.json(data)
})

app.post('/create', (request, response) => {
  response.send('This is a POST request at /create')
})

app.put('/edit', (request, response) => {
  response.send('This is a PUT request at /edit')
})

app.delete('/delete', (request, response) => {
  response.send('This is a DELETE request at /delete')
})

// make sure the app is listening on the specified port
// liten() takes in two parameters: PORT No and a function
app.listen(PORT, () => {
  console.log(
    `✨ Listening on port: ${PORT} ✨ \n#MbithiRocks because YOU ROCK!`
  );
  // console.log(data);
});

