const Statement = require('./Models/Statement');
const readFileAsync = require('./utils/readFileAsync');

(async () => {
    const invoices = await readFileAsync('data', 'invoices.json');
    const plays = await readFileAsync('data', 'plays.json');
    const statement = new Statement(invoices[0], plays);
    console.log(statement.getAmmount());
})();
