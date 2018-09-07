require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');

const User = require('../../app/models/User');
const testUserData = {
  name: 'name1',
  email: 'email1',
  password: '12345678',
};

describe('Database tests', () => {
  before((done) => {
    mongoose.connect(process.env.DB_TEST_URL, { useNewUrlParser: true });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connected to the test database.');
      done();
    });
  });

  describe('User', () => {
    it('new user saved to test database', (done) => {
      const user = User(testUserData);
      user.save(done);
    });

    it('wont save user with no name to database', done => {
      const incorrectUser = User({
        email: 'email1',
        password: '12345678',
      });

      incorrectUser.save(error => {
        if (error) {
          return done();
        }
        throw new Error('Should generate an error');
      });
    });

    it('wont save user with no email to database', done => {
      const incorrectUser = User({
        name: 'name1',
        password: '12345678',
      });

      incorrectUser.save(error => {
        if (error) {
          return done();
        }
        throw new Error('Should generate an error');
      });
    });

    it('wont save user with no password to database', done => {
      const incorrectUser =
        User({
          name: 'name1',
          email: 'email1',
        });

      incorrectUser.save(error => {
        if (error) {
          return done();
        }
        throw new Error('Should generate an error');
      });
    });

    it('should retrieve data from the test database', (done) => {
      User.find({ email: testUserData.email }, (error, users) => {
        if (error) {
          throw error;
        }

        if (users.length === 0) {
          throw new Error('User not found');
        }
        done();
      });
    });

    after(done => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
      });
    });
  });
});
