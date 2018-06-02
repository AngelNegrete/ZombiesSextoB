var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-Parser');
//modificado
var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, "public/img")));
app.use(express.static(path.resolve(__dirname, "public")));
    
var ip_permit=['192.168.10.1', '88.55.68.127', '::1', '123.123.12.1'];
var aux;

app.use("/", (request, response, next,)=>{
    for(var i = 0; i < ip_permit.length; i++){
        if(ip_permit[i] === request.ip)
        {
            aux=ip_permit[i];
        }
    }
    if(request.ip===aux)
    {
        next();
    }
    else{
        response.status(404).send("<h1>No tienes autorizacion</h1>");
    }
});


app.set('view engine','ejs');
var entries = [];
app.locals.entries = entries;

var images = [];
app.locals.images = images;
images.push({
    zombie1: "zombie1.png",
    zombie2: "zombie2.png",
    zombie3: "zombie3.png",
    tyrant: "Tyrant.png",
    nemesis: "Nemesis.png",
    logo: "logo1.png"
});

var weapons = [];
app.locals.weapons = weapons;
weapons.push({
    w1: "w1.jpg",
    w2: "w2.jpg",
    w3: "w3.jpg",
    w4: "w4.jpg"
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (request, response)=> response.render("index"));

app.get('/clases', (request, response)=> response.render("clases"));
app.get('/weapons', (request, response)=> response.render("weapons"));
app.get('/new-entry', (request, response)=> response.render("new-entry"));

app.post('/new-entry', (request, response)=> {
    if(!request.body.title || !request.body.body){
    response.status(400).send("Las entradas deben tener una victima y una muerte")
    return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date(),
        nombre: nombre = "Victima: ",
        sex: request.body.sex,
        edad: request.body.edad
    });
    response.redirect('/');    
});





app.use((request, response)=> response.status(404).render('404'));
http.createServer(app).listen(3000,()=>
console.log("La aplicacion GuestBook esta corriendo en el puerto 3000"));