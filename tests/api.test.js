import { server } from '../src/server.js';
import request from 'supertest';
import * as chai from 'chai';

const expect = chai.expect;

describe('Verify existing book API tests', () => {
    const book = {
        id: '1', 
        title: 'Test Book', 
        author: 'Test Author'
    };
    
    it('Should return an empty array when no books are added', async () => {
        const res = await request(server).get('/books');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
    });
        
    it('Should POST a book', async () => {
        const res = await request(server)
            .post('/books')
            .send(book);
        expect(res.status).to.equal(201);
        expect(res.body).to.deep.equal(book);
    });

    it('Should GET all books', async () => {
        const res = await request(server).get('/books/');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
    });

    it('Should GET a book by Id', async () => {
        const res = await request(server).get(`/books/${book.id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(book);
    });

    it('Should PUT (update) a book by Id', async () => {
        book.title = 'Updated Test Book';
        book.author = 'Updated Test Author';
        const res = await request(server).put(`/books/${book.id}`).send(book);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(book);
    });

    it('Should DELETE a book by Id', async () => {
        const res = await request(server).delete(`/books/${book.id}`);
        expect(res.status).to.equal(204);
    });
});

describe('Verify non-existing book API tests', () => {
    const noBook = {
        id: '9999',
        title: 'Some title',
        author: 'Some author'
    };

    it('Should return 404 when trying to GET non-existing book by Id', async () => {
        const res = await request(server).get(`/books/${noBook.id}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Book not found');
    });

    it('Should return 404 when trying to PUT (update) non-existing book by Id', async () => {
        const res = await request(server).put(`/books/${noBook.id}`).send(noBook);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Book not found');
    });

    it('Should return 404 when trying to DELETE non-existing book by Id', async () => {
        const res = (await request(server).delete(`/books/${noBook.id}`));
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Book not found');
    });
});