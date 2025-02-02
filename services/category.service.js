class CategoryService {
  constructor() {
    this.categories = [];
  }

  async create() {
    const newCategory = {
      id: this.categories.length,
      name: faker.commerce.department(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  addCategory(category) {
    this.categories.push(category);
  }

  getCategories() {
    return this.categories;
  }

  getCategoryById(id) {
    return this.categories.find((category) => category.id === id);
  }

  updateCategory(id, data) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories[index] = {
      ...this.categories[index],
      ...data,
    };
    return this.categories[index];
  }

  deleteCategory(id) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}
