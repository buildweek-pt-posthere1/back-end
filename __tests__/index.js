const supertest = require('supertest');
const server = require('../server');
const db = require('../config');

describe('test the router',()=>{
    test('GET /',async ()=>{
        const res = await supertest(server).get('/')
        expect(res.statusCode).toBe(200)
    })
})