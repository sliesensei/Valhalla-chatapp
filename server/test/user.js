import schemaUsers from '../src/models/modelUsers';

const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

const Users = mongoose.model('Users', schemaUsers);

chai.use(chaiHttp);

describe('Users', () => {
    it('it should GET all the Users', (done) => {
      chai.request(server)
        .get('/users/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('it should UPDATE a user by the given id', (done) => {
      const users = new Users();
      users.firstName = 'Pat';
      users.lastName = 'Lalouche';
      users.email = 'lol@lol.com';
      users.password = 'oui';
      users.save((err, data) => {
        chai.request(server)
          .put(`/users/${data.id}`)
          .send({
            firstName: 'Dave',
            email: 'oui@oui.com'
          })
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName').eql('Dave');
            res.body.should.have.property('email').eql('oui@oui.com');
            done();
          });
      });
    });
  
    it('it should GET a user by the given id', (done) => {
      const users = new Users();
      users.firstName = 'Pat';
      users.lastName = 'Lalouche';
      users.email = 'lol@lol.com';
      users.password = 'oui';
      users.save((err, data) => {
        chai.request(server)
          .get(`/users/${data.id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('email');
            res.body.should.have.property('_id').eql(users.id);
            done();
          });
      });
    });
  
    it('it should DELETE a user by the given id', (done) => {
      const users = new Users();
      users.firstName = 'Pat';
      users.lastName = 'Lalouche';
      users.email = 'lol@lol.com';
      users.password = 'oui';
      users.save((err, data) => {
        chai.request(server)
          .delete(`/users/${data.id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok').eql(1);
            res.body.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });