//REST API Kliens oldali szkript az adatok küldésére és fogadására a REST Backend-től (server.js)
/* 
REST API kliens - Async/Await módszerrel. (Aszinkron függvényhívás)
Az aszinkron művelet (függvény) visszatérési értéke egy Promise objektum.
A Promise objektum állapotai:
1. pending: várakozás az API-val való kapcsolatra
2. fullfilled: a kapcsolat létrejött
3. rejected: kapcsolat visszautasítva
*/
 
async function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
 
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Kérem adjon meg egy számot";
        return;
    }
 
    //Az adatok küldése a klienstől az API-nak.
    const response = await fetch('http://localhost:3000/api/math/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1, num2, operation })
    });
 
    //Az adatok fogadása az API-tól
    const result = await response.json();
    document.getElementById('result').textContent = result.result;
    };