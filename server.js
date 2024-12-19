//REST API backend egyszerű számolási műveletek végrehajtására
 
const express = require('express');
const cors = require('cors'); //Cross Origin Resource Sharing
const app = express();
const port = 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;
//Midlleware - köztes alkalmazások
app.use(express.json()); //JSON kezelés
app.use(cors()); //A CORS-t felvettük a Middleware-k közé
 
//A műveleteket végrehajtó POST végpont
app.post('/api/math/calculate', (req, res) => {
    const { num1, num2, operation } = req.body; //Változók átvétele az üzenet törzséből

    //ellenőrízzük, hogy mind a két szm létezik és szám típusú
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({error: 'Hiányzó vagy érvénytelen számok'});
    }

    //Számolási logika
    let result;
    if (operation == 'add') {
        result = num1 + num2;
    }
    else if (operation == 'subtract') {
        result = num1 - num2;
    }
    else if (operation == 'multiply') {
        result = num1 * num2;
    }
    else if (operation == 'divide') {
        result = num1 / num2;
    }
    else{
        return res.status(400).json({ error: 'Érvénytelen művelet'}); //Státusz kód és hibaüzenet visszadaása
    }
 
    res.json({ result }); //Az eredmény elküldése a klinsnek JSON formátumban
});
 
if (require.main === module) { //csak akkor induljon el a szerver, ha mi inditjuk el
//A szerver elindítása a megadott portszámon (3000)
app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port}`); //Kiírja hogy fut a szerver
});
}
module.exports = app; //a backend exportálása
