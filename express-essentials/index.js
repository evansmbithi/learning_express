import express, { request } from "express";
import data from "./data/mock.json";
// import data from "./data/mock.json" assert { type: "json" };
// needs an import assertion of type "json"

const app = express();

const PORT = 3000;

// use public folder at / (root) of project
app.use(express.static("public"));

// serve the images folder at route /images
app.use("/images", express.static("images"));

// using express.json and express.urlencoded
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json(data);
});

// POST - express.json and express.urlencoded
app.post("/item", (request, response) => {
  console.log(request.body);
  response.send(request.body);
});

// GET - download method
app.get("/download", (request, response) => {
  response.download("images/mountains_2.jpeg");
});

// GET - redirect method
app.get("/redirect", (request, response) => {
  response.redirect("http://mbithi.rocks");
});

//GET with next()
app.get(
  "/next",
  (request, response, next) => {
    console.log("The response will be sent by the next function");
    next();
  },
  (request, response) => {
    response.send("I just set up a route with a second callback");
  }
);

// GET with routing parameters
app.get("/class/:id", (request, response) => {
  // Middleware: Access the routing parameters
  const studentId = Number(request.params.id); //convert to a number
  const student = data.filter((student) => student.id === studentId);

  // Everything above this line is middleware
  response.send(student);
});

app.post("/create", (request, response) => {
  response.send("This is a POST request at /create");
});

app.put("/edit", (request, response) => {
  response.send("This is a PUT request at /edit");
});

app.delete("/delete", (request, response) => {
  response.send("This is a DELETE request at /delete");
});

//Route chaining
app
  .route("/class")
  .get((request, response) => {
    // response.send("Retrieve class info");
    throw new Error(); //Manually throw an error that was not there
  })
  .post((request, response) => {
    response.send("Create class info");
  })
  .put((request, response) => {
    response.send("Update class info");
  });

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something is broken");
});

// make sure the app is listening on the specified port
// listen() takes in two parameters: PORT No and a function
app.listen(PORT, () => {
  console.log(
    `✨ Listening on port: ${PORT} ✨ \n#MbithiRocks because YOU ROCK!`
  );
});
