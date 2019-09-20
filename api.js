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

app.listen(3000, () => {
  console.debug(`Server running 3000`);
});
export default app;
