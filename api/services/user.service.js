const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const users = Array.from({ length: 10 }, (_, index) => ({
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      isBlock: faker.datatype.boolean(),
    }));

    this.users = users;
  }

  addUser(user) {
    const newUser = {
      id: faker.database.mongodbObjectId(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUsers() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM task');
    console.log(rta);
    return rta.rows;
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id, data) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users[index] = {
      ...this.users[index],
      ...data,
    };
    return this.users[index];
  }

  deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
