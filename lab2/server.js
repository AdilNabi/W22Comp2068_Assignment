<<<<<<< HEAD
const connect = require('connect');
const url = require('url');
const app = connect();

app.listen(3000);

console.log('Server is running');

function calculator(request,response,next) {

    response.writeHead(200, 'text-html');

    let queryString = url.parse(request.url, true).query;
    let method = queryString.method;
    let x = queryString.x;
    let y = queryString.y;
    let result;

    if (method === 'add')
    {
        result = parseFloat(x) + parseFloat(y);
        response.write(`<h1>Output: ${x} + ${y} = ${result} </h1>`);
    }

    else if (method === 'subtract')
    {
        result = parseFloat(x) - parseFloat(y);
        response.write(`<h1>Output: ${x} - ${y} = ${result} </h1>`);
    }

    else if (method === 'multiply')
    {
        result = parseFloat(x) * parseFloat(y);
        response.write(`<h1>Output: ${x} * ${y} = ${result} </h1>`);
    }

    else if (method === 'divide')
    {
        result = parseFloat(x) / parseFloat(y);
        response.write(`<h1>Output: ${x} / ${y} = ${result} </h1>`);
    }
    response.end();
}
=======
const connect = require('connect');
const url = require('url');
const app = connect();

app.listen(3000);

console.log('Server is running');

function calculator(request,response,next) {

    response.writeHead(200, 'text-html');

    let queryString = url.parse(request.url, true).query;
    let method = queryString.method;
    let x = queryString.x;
    let y = queryString.y;
    let result;

    if (method === 'add')
    {
        result = parseFloat(x) + parseFloat(y);
        response.write(`<h1>Output: ${x} + ${y} = ${result} </h1>`);
    }

    else if (method === 'subtract')
    {
        result = parseFloat(x) - parseFloat(y);
        response.write(`<h1>Output: ${x} - ${y} = ${result} </h1>`);
    }

    else if (method === 'multiply')
    {
        result = parseFloat(x) * parseFloat(y);
        response.write(`<h1>Output: ${x} * ${y} = ${result} </h1>`);
    }

    else if (method === 'divide')
    {
        result = parseFloat(x) / parseFloat(y);
        response.write(`<h1>Output: ${x} / ${y} = ${result} </h1>`);
    }
    response.end();
}
>>>>>>> f4fa9c76c0b7e951ac3cd16acc6f35ac6f0a3fd6
app.use(calculator);