const express = require('express');
const app = express();
const users = require('./db/consultas.js')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { root } = require('router')

//Servidor
app.listen(3005, () => {
    console.log('Servicios Operando al 100%')
})
/* const router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json()) */

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static("public"))

//Conexión Home
app.get("/Home", (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
    onclick (bg-light) = users.crearUsuario
    res.redirect("/Login")
})


const secretkey = 'Llave Secreta'
const token = jwt.sign(users[0], secretkey)
const token_tiempo = jwt.sign({
    exp: Math.floor(Date.now() / 3000) +60,
    data: users[0],
},
secretkey
)

//Token
app.get("/JWT", (req, res) => {
    res.send(token)
})
app.get("/validaJWT", (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretkey, (err, data) => {
        res.send( err ? "Token no valido" : data);
    })
})
console.log(token_tiempo)

app.get("/Admin", (req, res) => {
    req.get(token)
    res.sendFile(__dirname + "/views/Admin.html")
    const tabla = users.obtenerUsuarios
    res.writetable(obtenerUsuarios)
})

//Acceso a probar token con expiración
app.get("/Login", (req, res) => {
    const { correo, nombre, contraseña, auth } = req.query;
    const usuario = users.find((users)=> users.correo == correo && users.nombre == nombre && users.contraseña == contraseña && users.auth == auth );

    if(usuario){
        const token_usuario = jwt.sign({
            exp: Math.floor(Date.now() / 3000) + 60,
            data: usuario,
        },
        secretkey
        );
        res.send(`<a href="./usuario?token=${token_usuario}"><p>Ingreso Usuario</p></a>
        Bienvenido, ${nombre}... a descubrir lo desconocido
        <script>
          localStorage.setItem('token_usuario' , JSON.stringify("${token_usuario}"))
        </script>
        `);
    }else{
        res.send("Usuario o contraseña invalidos...")
      }
    });

    app.get("/Login", (req, res) => {
        let { token } = req.query;
        jwt.verify(token, secretkey, (err, decoded) =>{
        err
            ? res.status(401).send({
                error: "401 no autorizado",
                messege: err.message,
            })
            : res.send(`Bienvenido usuario validado ${decoded.data.nombre}`);
            res.redirect("/Evidencia")    
        });
    });

app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "La fotografía es muy grande",
    })
);


app.post("/Evidencias", (req, res) => {
    const foto = req.files.target_file;
    const { posicion } = req.body;
    foto.mv(`${__dirname}/public/img/${foto}.jpg`, (err) => {
        res.send(`Gracias ${decoded.data.nombre}`);
    })
    
})
