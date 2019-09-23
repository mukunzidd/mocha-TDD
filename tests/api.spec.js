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
});


describe('Users Modifying', () => {
  it('Delete /users should delete information', done => {
    chai
      .request(app)
      .delete('/users')
      .end((err, res) => {
        expect(res.status).to.equals(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.empty;
     
        done();
      });
  });

  it('UPDATE /users should update information', done => {
    chai
      .request(app)
      .put('/users')
      .end((err, res) => {
        expect(res.status).to.equals(404);
        expect(res.body).to.be.an('object');
        expect(res.body.name).not.to.be.null;
        expect(res.body.role).not.to.be.null;
     
        done();
      });
  });
});
