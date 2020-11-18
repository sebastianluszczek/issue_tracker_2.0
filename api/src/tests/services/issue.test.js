const {
  createIssue,
  getAllIssue,
  getOneIssue,
  updateIssue,
  deleteOneIssue,
} = require('../../services/issue.services');
const db = require('../../models');
const Issue = db.issues;

const input = {
  title: 'Test Issue',
  description: 'descriptions',
};

describe('Issue services unit tests', () => {
  // sync database, {force: true} will clear it before usage
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });
  afterEach(async () => {
    Issue.destroy({
      where: {},
      truncate: true,
    });
  });
  // close connection after averything done
  afterAll(async done => {
    await db.sequelize.close();
    done();
  });
  describe('createIssue', () => {
    let response;
    beforeAll(async () => {
      response = await createIssue(input);
    });
    it('Should create new Issue', async () => {
      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
    });
  });
  describe('getAllIssues', () => {
    let response;
    beforeAll(async () => {
      await createIssue(input);
      await createIssue(input);

      response = await getAllIssue();
    });
    it('Should get response', () => {
      expect(response).toBeDefined();
    });
    it('Should return array', () => {
      expect(Array.isArray(response)).toBe(true);
    });
    it('Should get all (2) users', () => {
      expect(response.length).toBe(2);
    });
  });
  describe('getOneIssue', () => {
    let response;
    let issue;
    beforeAll(async () => {
      issue = await createIssue(input);
      response = await getOneIssue(issue.id);
    });
    it('Should get response', () => {
      expect(response).toBeDefined();
    });
    it(`Should return element with correct id`, () => {
      expect(response.id).toBe(issue.id);
    });
  });
  describe('updateIssue', () => {
    let response;
    let issue;
    beforeAll(async () => {
      issue = await createIssue(input);

      const updateInput = {
        title: 'Updated Test Issue',
        description: 'descriptions',
      };

      response = await updateIssue(issue.id, updateInput);
    });
    it('Should get response', () => {
      expect(response).toBeDefined();
    });
    it('Should get correct updated "title"', () => {
      expect(response.title).toBe('Updated Test Issue');
    });
  });
  describe('deleteOneIssue', () => {
    let response;
    let issue;
    beforeAll(async () => {
      issue = await createIssue(input);
      response = await deleteOneIssue(issue.id);
    });
    it('Should delete Issue', async () => {
      expect(response).toBe(1);
    });
  });
});
