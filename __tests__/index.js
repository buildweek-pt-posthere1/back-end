const supertest = require('supertest');
const server = require('../server');
const db = require('../config');
beforeEach(async ()=>{
    await db.seed.run()
})
describe('test the router',()=>{
    test('GET /',async ()=>{
        const res = await supertest(server).get('/')
        expect(res.statusCode).toBe(200)
    })
    test('sign up for a new user',async ()=>{
    await supertest(server).post('/api/users/register')
    .send({username:'test',password:'test'})
    .expect(201)
    })
})

afterAll(async ()=>{
    await db.destroy()
})