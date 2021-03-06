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

//should be able to update a repository
app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepoToUpdate = repositories.findIndex( repository =>
    repository.id === id
  );

  if(findRepoToUpdate === -1){
    return response.status(400).json({error: "This repository does not exist"})
  }
  
  const repository = { 
    id,
    title,
    url,
    techs,
    likes: repositories[findRepoToUpdate].likes,
  };
  
  repositories[findRepoToUpdate] = repository;
  return response.status(200).json(repository);
  
});

//should delete the repository with the requested id
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepoIndex = repositories.findIndex(repository => 
    repository.id === id
  );
  if(findRepoIndex >= 0){
    repositories.splice(findRepoIndex, 1); 
    return response.status(204).send([])
  } else {
    return response.status(400).json({ error: "Could not find the requested id"})
  }

});

//should be able to like a repository
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const findRepoToLike = repositories.findIndex( repository =>
    repository.id === id
  );
  if(findRepoToLike === -1){
    return response.status(400).json({ error: "This repository does not exist"});
  }
  
  repositories[findRepoToLike].likes+=1;
  return response.json(repositories[findRepoToLike]);

});

module.exports = app;
