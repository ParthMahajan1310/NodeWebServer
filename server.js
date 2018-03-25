const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentDate', ()=> {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}, ${req.url}`;

    fs.appendFile('server.log', log + `\n`, (err) => {
        (err) ? console.log(err) : null;
    });
    next();
});
/* app.use((req, res, next) => {
    res.render('maintenance.hbs')
    next();
}) */

app.get('/', (req, res) => {
    /* res.send({
        status: 200,
        message: 'Our Node app is working!!'
    }) */
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        userName: 'Parth',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})

app.listen(port, () =>  {
    console.log(`Server is up on port no: ${port}`);
});