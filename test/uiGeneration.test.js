const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path according to your project structure
const expect = chai.expect;

chai.use(chaiHttp);

describe('UI Generation API', () => {
  it('should generate UI code from a command', (done) => {
    chai.request(app)
      .post('/api/ui-generation/generate-ui')
      .send({ command: 'Create a complex user form' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('uiComponentCode');
        expect(res.body.uiComponentCode).to.contain('<form'); // Assuming the UI code includes form elements
        done();
      });
  });

  it('should handle failures from OpenAI API', (done) => {
    // This test might need a mock or stub if you are integrating with external services.
    // The below test assumes that the failure is simulated by the API or mocked via a tool like Sinon or nock.
    chai.request(app)
      .post('/api/ui-generation/generate-ui')
      .send({ command: 'Create a complex user form' })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message', 'Failed to generate UI component');
        done();
      });
  });
});
