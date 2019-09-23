const express = require('express'); 


const server = express();

const projects = []; 
let requisitions = 0;

server.use(express.json());

server.use ((req, res, next) => {
  requisitions++; 
  console.log(`Total of requests are:  ${requisitions}`);

  return next();

});

function CheckIfProjectExist(req, res , next) {
  const {id} = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({ error: 'Project do not exist'});
  }
  return next();
}


server.get('/projects',  (req,res) => {
  
  return res.json(projects);

})

server.get('/projects/:id', (req,res) => {
  const {id} = req.params;

  return res.json(projects[id]);
});


server.post('/projects', (req,res) => {
  const {id,title} = req.body ;

  const project = {
    id,
    title,
    tasks:[]
  };

  projects.push(project);

  return res.json(project);

});

server.put('/projects/:id', CheckIfProjectExist, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title ; 


  return res.json(project);


});

server.delete('/projects/:id',(req,res) => {
  const {id} = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1); 

  return res.json({message: `Removed id: ${id}`})

});


server.post('projects/:id/tasks', CheckIfProjectExist, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p=> p.id == id);

  project.tasks.push(title);

  

  return res.json(project);


});

server.listen(3000);
