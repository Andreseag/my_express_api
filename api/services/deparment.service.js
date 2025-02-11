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

  getDepartments() {
    return this.departments;
  }

  getDepartmentById(id) {
    if (!this.departments.some((department) => department.id === id)) {
      throw boom.notFound('Department not found');
    }

    return this.departments.find((department) => department.id === id);
  }

  createDepartment(department) {
    const newDepartment = {
      id: faker.database.mongodbObjectId(),
      ...department,
    };
    this.departments.push(newDepartment);
    return newDepartment;
  }

  updateDepartment(id, data) {
    const index = this.departments.findIndex(
      (department) => department.id === id
    );
    if (index === -1) {
      throw boom.notFound('Department not found');
    }
    this.departments[index] = {
      ...this.departments[index],
      ...data,
    };
    return this.departments[index];
  }

  deleteDepartment(id) {
    const index = this.departments.findIndex(
      (department) => department.id === id
    );
    if (index === -1) {
      throw boom.notFound('Department not found');
    }
    this.departments.splice(index, 1);
    return { id };
  }
}
