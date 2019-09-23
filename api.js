import express from 'express';

const users = [
  {
    id: 1,
    name: 'John',
    role: 'Programmer',
    admin: false,
  },
  {
    id: 2,
    name: 'jane',
    role: 'Programmer',
    admin: false,
  },
];
const app = express();
app.use(express.json());

// Routes
app.get('/status', (req, res) => {
  res.send({ message: 'API running' });
});
app.get('/users', (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: 'API running!!!!!', data: users });
});
app.post('/users', (req, res) => {
  const { id, name, role, admin } = req.body;
  res.status(201).json({
    status: 201,
    message: 'user added successfully',
    data: { id, name, role, admin },
  });
});



// Delete


 const deleteInfo= (req, res) => {
  const id = parseInt(req.params.id, 10);

  users.map((info, index) => {
    if (info.id === id) {
       users.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'Information deleted successfuly'
       });
    }
  });


    return res.status(404).send({
      success: 'false',
      message: 'info not found'
    });

 
};

//Update information

const putInfo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let infoFound;
  let itemIndex;
  users.map((info, index) => {
    if (info.id === id) {
      infoFound = info;
      itemIndex = index;
    }
  });

  if (!infoFound) {
    return res.status(404).send({
      success: 'false',
      message: 'information not found'
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'Name is required',
    });
  } else if (!req.body.role) {
    return res.status(400).send({
      success: 'false',
      message: 'Role is required'
    });
  }

  const updatedInfo = {
    id: infoFound.id,
    name: req.body.name || infoFound.name,
      role: req.body.role || infoFound.role
  };

  users.splice(itemIndex, 1, updatedInfo);
  

  return res.status(400).send({
 success: 'true',
  message: 'Information updated successfully',
    updatedInfo
  });
 };


 





app.listen(3000, () => {
  console.debug(`Server running 3000`);
});
export default app;


