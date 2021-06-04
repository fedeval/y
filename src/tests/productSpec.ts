import { Product, ProductStore } from '../models/product';

const store = new ProductStore();
const productList: Product[] = [
  {
    name: 'bike',
    price: 150,
    category: 'sports',
    rating: 4.3
  },
  {
    name: 'kayak',
    price: 600,
    category: 'sports',
    rating: 4.6
  },
  {
    name: 'carpet',
    price: 40,
    category: 'household',
    rating: 3.4
  },
  {
    name: 'desk',
    price: 200,
    category: 'office',
    rating: 3.9
  },
  {
    name: 'pen',
    price: 2,
    category: 'office',
    rating: 2.9
  },
  {
    name: 'laptop',
    price: 2000,
    category: 'office',
    rating: 4.9
  },
  {
    name: 'chair',
    price: 40,
    category: 'household',
    rating: 4.2
  }
];

describe('Testing Product model', () => {
  it('Has an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Has a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('Has a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('Has a topfive method', () => {
    expect(store.topfive).toBeDefined();
  });

  beforeAll(() => {
    productList.forEach((product) => store.create(product));
  });

  it('index should return a list of all products', async () => {
    const result = await store.index();
    expect(result).toEqual(productList);
  });

  it('create should add a product', async () => {
    const result = await store.create({
      name: 'notepad',
      price: 9,
      category: 'office',
      rating: 4.2
    });
    expect(result).toEqual({
      id: 8,
      name: 'notepad',
      price: 9,
      category: 'office',
      rating: 4.2
    });
  });

  it('show should return the product with the given id', async () => {
    const result = await store.show(8);
    expect(result).toEqual({
      id: 8,
      name: 'notepad',
      price: 9,
      category: 'office',
      rating: 4.2
    });
  });

  it('delete should remove the product with the given id', async () => {
    await store.delete(8);
    const result = await store.index();
    expect(result).not.toContain({
      id: 8,
      name: 'notepad',
      price: 9,
      category: 'office',
      rating: 4.2
    });
  });

  // TODO: test topfive
  // TODO: test category
});
