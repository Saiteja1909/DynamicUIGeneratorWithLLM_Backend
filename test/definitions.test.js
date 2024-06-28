const app = require('../server'); // Import your express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const UIDefinition = require('../models/UIDefinition'); // Assuming UIDefinition is your model

chai.use(chaiHttp);

// Setup to use a test database or in-memory database
before(async () => {
  // Connect to a test database
  const dbUri = 'your-test-db-uri';
  await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clean up the database after each test
afterEach(async () => {
  await UIDefinition.deleteMany({});
});

describe('Definitions API', () => {
  describe('POST /api/definitions', () => {
    it('should create a new UI definition', (done) => {
      chai.request(app)
        .post('/api/definitions')
        .send({
          userId: 'sampleUserId', // Make sure this is appropriately set up for the test
          name: 'Test UI',
          command: 'Create a form',
          code: '<form></form>'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('name', 'Test UI');
          done();
        });
    });
  });

  describe('GET /api/definitions', () => {
    it('should fetch all definitions for a user', (done) => {
      chai.request(app)
        .get('/api/definitions')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('PUT /api/definitions/:id', () => {
    it('should update an existing UI definition', (done) => {
      // First create a definition to update
      const definition = new UIDefinition({
        userId: 'sampleUserId',
        name: 'Old UI',
        command: 'Create a form',
        code: '<form></form>'
      });
      definition.save().then(savedDefinition => {
        chai.request(app)
          .put(`/api/definitions/${savedDefinition._id}`)
          .send({
            name: 'Updated UI',
            command: 'Update a form',
            code: '<form id="updated"></form>'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Updated UI');
            done();
          });
      });
    });
  });

  describe('DELETE /api/definitions/:id', () => {
    it('should delete a UI definition', (done) => {
      // First create a definition to delete
      const definition = new UIDefinition({
        userId: 'sampleUserId',
        name: 'Delete UI',
        command: 'Create a form',
        code: '<form></form>'
      });
      definition.save().then(savedDefinition => {
        chai.request(app)
          .delete(`/api/definitions/${savedDefinition._id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Definition deleted successfully');
            done();
          });
      });
    });
  });
});

// Add more tests for error cases and boundary conditions
