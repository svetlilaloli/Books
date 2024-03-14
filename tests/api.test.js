const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('..\\src\\server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
    let bookId;
    it('Should POST a book', (done) => {
        const book = { id: "1", title: "Test Book", autor: "Test Testov" };
        chai.request(server).post('/books').send(book).end((err, res) => {
            if (err) {
                return done();
            };
            expect(res).to.have.status(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('autor');
            bookId = res.body.id;
            done();
        });
    });
    it('Should GET all books', (done) => {
        chai.request(server).get('/books').end((err, res) => {
            if (err) {
                return done();
            };
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            done();
        });
    });
    it('Should GET a single book', (done) => {
        chai.request(server).get(`/books/${bookId}`).end((err, res) => {
            if (err) {
                return done();
            };
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('autor');
            done();
        });
    });
    it('Should PUT an existing book', (done) => {
        const updatedBook = { id: bookId, title: "Updated title", author: "Updated author"};
        chai.request(server).put(`/books/${bookId}`).send(updatedBook).end((err, res) => {
            if (err) {
                return done();
            };
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.title).to.equal('Updated title');
            expect(res.body.author).to.equal('Updated author');
            done();
        });
    });
})