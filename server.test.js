//unit test - server.js tesztelese
const request = require('supertest');
const app = require('../server');

// teszt szkript
describe('POST /api/math/calculate', () => { //test leírása
    test('Összeadás tesztelése (2+3)', async () => { // teszt művelet leírása
        const response = await request(app) //hozzáférés a backendhez
        .post('/api/math/calculate') //végpont elérése
        .send({num1: 2, num2: 3, operation: 'add'}) //műveletek átadása

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(5);
    });

    test('Kivonás tesztelése (5 - 3)', async () => { //Teszt művelet leírása
        const response = await request(app) //Szerverünk meghívása
        .post('/api/math/calculate') //Végpont elérése
        .send({ num1: 5, num2: 3, operation: 'subtract'}); //Változók (értákek átadása)

        expect(response.statusCode).toBe(200); //Státuszkód kérése
        expect(response.body.result).toBe(2); //Elvárt eredmény kérése
    });

    test('Szorzás tesztelése (5*3)', async () => { // teszt művelet leírása
        const response = await request(app) //hozzáférés a backendhez
        .post('/api/math/calculate') //végpont elérése
        .send({num1: 5, num2: 3, operation: 'multiply'}) //műveletek átadása

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(15);
    });

    test('Kivonás tesztelése (5/3)', async () => { // teszt művelet leírása
        const response = await request(app) //hozzáférés a backendhez
        .post('/api/math/calculate') //végpont elérése
        .send({num1: 6, num2: 3, operation: 'divide'}) //műveletek átadása

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(2);
    });

    test('Érvényzelen művelet', async () => { // teszt művelet leírása
        const response = await request(app) //hozzáférés a backendhez
        .post('/api/math/calculate') //végpont elérése
        .send({num1: 2, num2: 3, operation: 'valami'}) //műveletek átadása

        expect(response.statusCode).toBe(400); //az api nem validálja a bemenő adatokat
        expect(response.body.error).toBe('Érvénytelen művelet'); // teszteli, hogy rossz számítás történik
    });

    test('Hiányzó számok', async () => { // teszt művelet leírása
        const response = await request(app) //hozzáférés a backendhez
        .post('/api/math/calculate') //végpont elérése
        .send({operation: 'add'}) //műveletek átadása

        expect(response.statusCode).toBe(400); //az api nem validálja a bemenő adatokat
        expect(response.body.error).toBe('Hiányzó vagy érvénytelen számok'); // teszteli, hogy rossz számítás történik
    });
});