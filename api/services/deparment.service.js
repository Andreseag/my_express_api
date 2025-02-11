class DepartmentService {
  constructor() {
    this.departments = [];
    this.generate();
  }

  async generate() {
    const departments = Array.from({ length: 10 }, (_, index) => ({
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      categories: Array.from({ length: 5 }, (_, index) => ({
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      })),
    }));

    this.departments = departments;
  }
}
