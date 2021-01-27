const express = require('express');
const app = express();
const users = require('./db/consultas.js')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { router } = require('router')
const { obtenerUsuarios, cambiarEstado, crearUsuario, filtrarporEstado} = require('./db/consultas');


//Servidor
app.listen(3005, () => {
    console.log('Servicios Operando al 100%')
})

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({}));
app.use(express.static("public"))

//Conexión Home
app.get("/Home", (req, res) => {
    res.sendFile(__dirname + "/views/Home.html")
    onclick (bg-light) = users.crearUsuario
    //res.write()
    res.redirect(__dirname + "views/Login.html")
})
console.log(crearUsuario)
console.log(filtrarporEstado)

router.use('/secure', function(req, res, next) {
    var token = req.headers['authorization']
    if (!token) {
        res.status(401).send({
            ok: false,
            message: 'Toket inválido'
        })
    }
    token = token.replace('Bearer', '')
    jwt.verify(token, 'password', function(err,token){
        if (err) {
            return res.status(401).send({
                ok: false,
                message: 'Token inválido'
            });
        } else {
            req.token = token
            next()
        }
    })
})

const secretkey = 'Llave Secreta'
const token = jwt.sign(users[0], secretkey)
const token_tiempo = jwt.sign({
    exp: Math.floor(Date.now() / 3000) +60,
    data: users[0],
},
secretkey
)
console.log(token)

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
console.log(token)



//Acceso a probar token con expiración
app.get("/Login", (req, res) => {
    res.sendFile(__dirname + '/views/Login.html')
    //Validación de correo
    const { correo, contraseña } = req.query;
    const usuario = obtenerUsuarios.find((users)=> users.correo == correo &&  users.contraseña == contraseña);

    if(usuario){
        const token_usuario = jwt.sign({
            exp: Math.floor(Date.now() / 3000) + 60,
            data: usuario,
        },
        secretkey
        );
        res.send(`<a href="./usuario?token=${token_usuario}"><p>Ingreso Exitoso</p></a>
        Bienvenido, ${nombre}... a descubrir lo desconocido!!!
        <script>
          localStorage.setItem('token_usuario' , JSON.stringify("${token_usuario}"))
        </script>
        `);
    }else{
        res.send("Usuario o contraseña invalidos...")
        req.token = token
            next()
      }
    }),

    app.get("/Login", (req, res) => {
/*         const { correo, contraseña } = req.query;
        const usuario = obtenerUsuarios.find((user) => user.correo == correo && user.contraseña == contraseña); */
        let { token } = req.query;
        jwt.verify(token, secretkey, (err, decoded) =>{
        if (err) {
            return res.status(401).send({
                ok: false,
                error: "401 no autorizado",
                messege: err.message,
            });
        } else{
            res.send(`Bienvenido ${nombre} has sido validado por entes superiores ${decoded.data.nombre}`);
            res.redirect(__dirname + '/views/Evidencias.html')    
        }
            req.token = token
            next()
        }
    );
    }),
    console.log(cambiarEstado),

    app.get("/Admin", async (req, res) => {
        req.get(token)
        res.sendFile(__dirname + "/views/Admin.html")
        const tabla = await obtenerUsuarios()
        res.write(tabla)
    },

app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "La fotografía es muy grande",
    })
),

app.post("/Evidencias", (req, res) => {
    res.sendFile(__dirname + '/views/Evidencias.html')
    const foto = req.files.target_file;
    const { posicion } = req.body;
    foto.mv(`${__dirname}/public/img/${foto}.jpg`, (err) => {
        res.send(`Gracias ${decoded.data.nombre}`);
    })   
}))
