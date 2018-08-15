'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('http://localhost:8080');

describe('API Todos', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  // GET - List all to do items
  it('should return all to do list', function() {
    return chai.request(app)
      .get('/api/todos')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.results).to.be.an('array');
      });
  });

  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/api/todosinvalidpath')
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });

  // POST - Add new to do item
  it('should add new to do item', function() {
    return chai.request(app)
      .post('/api/todos')
      .send({
        text: 'add milk'
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.results).to.be.an('array').that.includes(
          'add milk');
      });
  });
});