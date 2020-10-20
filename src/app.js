const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//should be able to list all repositories
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

//should be able to create a new repository
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    url,
    likes: 0,
    title,
    techs,
  }
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

//should delete the repository with the requested id
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepoIndex = repositories.findIndex(repository => 
    repository.id === id
  );
  if(findRepoIndex >= 0){
    repositories.splice(findRepoIndex, 1); 
  } else {
    return response.status(400).json({ error: "Could not find the requested id"})
  }

  return response.status(204).send([])
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
