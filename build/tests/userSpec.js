"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const order_1 = require("../models/order");
const dotenv_1 = __importDefault(require("dotenv"));
const lodash_1 = __importDefault(require("lodash"));
dotenv_1.default.config();
describe('Testing user model', () => {
    const store = new user_1.UserStore();
    const userList = [
        {
            username: 'testuser1',
            firstName: 'Freddie',
            lastName: 'Mercury',
            password: 'testpwd1'
        },
        {
            username: 'testuser2',
            firstName: 'Brian',
            lastName: 'May',
            password: 'testpwd2'
        },
        {
            username: 'testuser3',
            firstName: 'John',
            lastName: 'Deacon',
            password: 'testpwd3'
        }
    ];
    // Add ids and strip passwords to make test comparisons simpler
    const userListWithIdAndNoPwd = userList.map((user, index) => {
        return {
            id: index + 1,
            ...lodash_1.default.pick(user, ['username', 'firstName', 'lastName'])
        };
    });
    it('has an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('has a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('has a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('has an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    beforeAll(async () => {
        for (const user of userList) {
            await store.create(user);
        }
    });
    it('index should return a list of all users', async () => {
        const result = await store.index();
        const resultWithoutPwd = result.map((user) => {
            return lodash_1.default.pick(user, ['id', 'username', 'firstName', 'lastName']);
        });
        expect(resultWithoutPwd).toEqual(userListWithIdAndNoPwd);
    });
    it('create should add a user', async () => {
        const result = await store.create({
            username: 'testuser4',
            firstName: 'Roger',
            lastName: 'Taylor',
            password: 'testpwd4'
        });
        const resultWithoutPwd = lodash_1.default.pick(result, [
            'id',
            'username',
            'firstName',
            'lastName'
        ]);
        expect(resultWithoutPwd).toEqual({
            id: 4,
            username: 'testuser4',
            firstName: 'Roger',
            lastName: 'Taylor'
        });
    });
    it('show should return the user with the given id', async () => {
        const result = await store.show(4);
        const resultWithoutPwd = lodash_1.default.pick(result, [
            'id',
            'username',
            'firstName',
            'lastName'
        ]);
        expect(resultWithoutPwd).toEqual({
            id: 4,
            username: 'testuser4',
            firstName: 'Roger',
            lastName: 'Taylor'
        });
    });
    it('authenticate should return null for the wrong user and password combination', async () => {
        const result = await store.authenticate('testuser1', 'testpwd2');
        expect(result).toBe(null);
    });
    it('authenticate should return a user for the right user and password combination', async () => {
        const result = await store.authenticate('testuser1', 'testpwd1');
        const resultWithoutPwd = lodash_1.default.pick(result, [
            'id',
            'username',
            'firstName',
            'lastName'
        ]);
        expect(resultWithoutPwd).toEqual(userListWithIdAndNoPwd[0]);
    });
});
describe('Testing user actions on orders', () => {
    const testUser = {
        username: 'testuser1',
        firstName: 'Freddie',
        lastName: 'Mercury',
        password: 'testpwd1'
    };
    const testProduct = {
        name: 'notepad',
        price: 9,
        category: 'office',
        rating: 4.2
    };
    const testOrder1 = {
        userId: 1,
        currentStatus: 'active'
    };
    const testOrder2 = {
        userId: 1,
        currentStatus: 'completed'
    };
    const userStore = new user_1.UserStore();
    const productStore = new product_1.ProductStore();
    const orderStore = new order_1.OrderStore();
    beforeAll(async () => {
        await userStore.create(testUser);
        await productStore.create(testProduct);
    });
    it('has an addProductToOrder method', () => {
        expect(userStore.addProductToOrder).toBeDefined();
    });
    // TODO: test removeproductfromorder definition
    // TODO: test addtoproductf unctionality
    // TODO: test removeproductfromorder functionality
});
