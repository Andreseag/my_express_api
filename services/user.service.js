class UserService {
  constructor() {
    this.users = [];
  }

  async createUsers() {
    const users = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      isBlock: faker.datatype.boolean(),
    }));

    this.users = users;
  }

  addUser(user) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
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
