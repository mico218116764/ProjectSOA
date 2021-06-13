const exp = require('express');
const mysql = require('mysql');
const sqlConnection= require('express-myconnection');

const app = exp();
const lRoute = {
    user : require('./routes/user'),
    book : require('./routes/book'),
};

app.use(exp.urlencoded({ extended: true }));

app.use(sqlConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 't6_6741'
}, 'pool'));

app.use('/api/users', lRoute.user);
app.use('/api/books', lRoute.book);

app.listen(3000, function() {console.log('Love You 3000')});


