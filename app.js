const express = require("express");

const dal = require ("./DAL").DAL;

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use(express.static('public'));

app.get("/", (req, res) => {
    res.json({Message: "Welcome to RESTful API!"})
});

app.get("/idea", async (req, res) => {
    let idea = await dal.getIdea();
    res.json(idea);
});

app.get("/idea/:id", async (req, res) => {
    let id = req.params.id;
    let idea = await dal.getIdeaById(id);
    res.json(idea);
});

app.put('/idea/update/:id', async (req, res) => {
  const idea = req.body;
  const id = req.params.id;

  try {
    const updated = await dal.update(id, idea);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating idea' });
  }
});

app.get("/idea/delete/:id", async (req, res) => {
    const id = req.params.id;
  try {
    await dal.delete(id);
    res.json({Message: "Idea was deleted"});
  } catch (err) {
    res.json({Message: "Didn't delete"});
  }
});

app.post("/idea/create", async (req, res) => {
  const idea = req.body;  
  try {
    const createdPost = await dal.create(idea.ideaBody);
    return res.json({ message: "Post created successfully", idea: createdPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });