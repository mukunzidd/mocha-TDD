import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api';

chai.use(chaiHTTP);

const newUser = {
  id: 3,
  name: 'Lydia',
  role: 'student',
  admin: true,
};

describe('API server', () => {
  it('checks the status of the api', done => {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        expect(res.status).to.equals(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).not.to.be.empty;
        expect(res.body.message).to.equals('API running');
        done();
      });
  });
});

describe('Users Controller', () => {
  it('GET /users should return all users', done => {
    chai
      .request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.status).to.equals(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).not.to.be.empty;
        expect(res.body.data[0].id).to.equals(1);
        expect(res.body.data[1].name).to.equals('jane');
        expect(res.body.data[1].admin).to.equals(false);
        expect(res.body.data.length).to.equals(2);
        done();
      });
  });
  it('POST /users should create & return an new user', done => {
    chai
      .request(app)
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equals(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equals('user added successfully');
        expect(res.body.data.id).to.equals(3);
        expect(res.body.data.name).to.equals('Lydia');
        expect(res.body.data.role).to.equals('student');
        expect(res.body.data.admin).to.equals(true);
        expect(res.body.data.admin).to.be.a('boolean');
        expect(res.body.status).to.equals(201);
        done();
      });
  });
  it('GET /users should be able to get a specific userById', done => {
    chai
      .request(app)
      .get('/users/1')
      .end((err, res)=> {
        expect(res.status).to.equals(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).equals(200);
        done();

    });
});
it('users should not be able to get a user if provided unexisted id', done => {
  chai
    .request(app)
    .get('/users/7')
    .end((err, res)=> {
      expect(res.status).to.equals(404);
      expect(res.body.status).to.equals(404);
      expect(res.body.message).to.equals('user of that id is not found');
      done();

    })
})
})

