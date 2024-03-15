import { server } from '../src/server.js';
import request from 'supertest';
import * as chai from 'chai';

const expect = chai.expect;

describe('Books API', () => {
    it('should return an empty array when no books are added', async () => {
        const res = await request(server).get('/books');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
    });
        
    it('should add a new book', async () => {
        const newBook = { id: '1', title: 'Test Book', author: 'Test Author' };
        const res = await request(server)
            .post('/books')
            .send(newBook);
        expect(res.status).to.equal(201);
        expect(res.body).to.deep.equal(newBook);
    });

    it('should return a book by id', async () => {
        const testBook = { id: '1', title: 'Test Book', author: 'Test Author' };
        const res = await request(server).get('/books/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(testBook);
    });

    it('should update a book by id', async () => {
        const updatedBook = { id: '1', title: 'Updated Test Book', author: 'Updated Test Author' };
        const res = await request(server)
            .put('/books/1')
            .send(updatedBook);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(updatedBook);
    });

    it('should delete a book by id', async () => {
        const res = await request(server).delete('/books/1');
        expect(res.status).to.equal(204);
    });
});