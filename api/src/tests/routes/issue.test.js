const request = require('supertest');
const app = require('../..');

const { createIssue } = require('../../services/issue.services');
const db = require('../../models');
const Issue = db.issues;

const input = {
  title: 'Test Issue',
  description: 'descriptions',
};

describe('Issue API routes tests:', () => {
  afterAll(async done => {
    await db.sequelize.close();
    done();
  });
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });
  describe('routes:', () => {
    describe('POST /api/issues', () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post('/api/issues')
          .send({
            data: {
              title: 'Test Issue',
              description: 'descriptions',
            },
          });
      });
      it('Should get 201 status', () => {
        expect(res.statusCode).toEqual(201);
      });
      it('Should return new entity data', () => {
        expect(res.body).toHaveProperty('data');
      });
    });
    describe('GET /api/issues', () => {
      let res;
      beforeAll(async () => {
        await createIssue(input);
        await createIssue(input);

        res = await request(app).get('/api/issues');
      });
      it('Should get 200 status', () => {
        expect(res.statusCode).toEqual(200);
      });
      it('Should return array', () => {
        expect(Array.isArray(res.body.data)).toBe(true);
      });
      it('Should return two issues', () => {
        expect(res.body.data.length).toBe(2);
      });
    });
    describe('GET /api/issues/:id', () => {
      let res;
      let issue;
      beforeAll(async () => {
        issue = await createIssue(input);

        res = await request(app).get(`/api/issues/${issue.id}`);
      });
      it('Should get 200 status', () => {
        expect(res.statusCode).toEqual(200);
      });
      it('Should return correct issue', () => {
        expect(res.body.data.id).toBe(issue.id);
      });
    });
    describe('DELETE /api/issues/:id', () => {
      let res;
      let issue;
      beforeAll(async () => {
        issue = await createIssue(input);

        res = await request(app).delete(`/api/issues/${issue.id}`);
      });
      it('Should get 204 status (no response)', () => {
        expect(res.statusCode).toEqual(204);
      });
    });
    describe('PUT /api/issues/:id', () => {
      let res;
      let issue;
      beforeAll(async () => {
        issue = await createIssue(input);

        res = await request(app)
          .put(`/api/issues/${issue.id}`)
          .send({
            data: {
              title: 'Updated Test Issue',
            },
          });
      });
      it('Should get 200 status', () => {
        expect(res.statusCode).toEqual(200);
      });
      it('Should update issue', () => {
        expect(res.body.data.title).toBe('Updated Test Issue');
      });
    });
  });
  describe('validations:', () => {
    describe('POST /api/issues', () => {
      let res;
      it('Should not allow add issue without title', async () => {
        res = await request(app)
          .post('/api/issues')
          .send({
            data: {
              description: 'descriptions',
            },
          });
        expect(res.statusCode).toEqual(400);
      });
      it('Should not allow add issue with state other than [open, pending, closed]', async () => {
        res = await request(app)
          .post('/api/issues')
          .send({
            data: {
              state: 'test',
            },
          });
        expect(res.statusCode).toEqual(400);
      });
    });
    describe('PUT /api/issues/:id', () => {
      let res;
      it('Should allow to change status: open -> pending', async () => {
        let issue = await createIssue(input);
        res = await request(app)
          .put(`/api/issues/${issue.id}`)
          .send({
            data: {
              state: 'pending',
            },
          });
        expect(res.body.data.state).toBe('pending');
      });
      it('Should allow to change status: pending -> closed', async () => {
        let issue = await createIssue({ ...input, state: 'pending' });
        res = await request(app)
          .put(`/api/issues/${issue.id}`)
          .send({
            data: {
              state: 'closed',
            },
          });
        expect(res.body.data.state).toBe('closed');
      });
      it('Should not allow to change issue with status closed', async () => {
        let issue = await createIssue({ ...input, state: 'closed' });
        res = await request(app)
          .put(`/api/issues/${issue.id}`)
          .send({
            data: {
              ttile: 'Updated Title',
            },
          });
        expect(res.statusCode).toBe(400);
      });
      it('Should not allow to change status: pending -> open', async () => {
        let issue = await createIssue({ ...input, state: 'pending' });
        res = await request(app)
          .put(`/api/issues/${issue.id}`)
          .send({
            data: {
              state: 'open',
            },
          });
        expect(res.statusCode).toBe(400);
      });
    });
  });
});
