const { Pool } = require ("pg");
const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "nasa",
    port: 5432,
})

async function obtenerUsuarios(){
    try{
        const resultado = await pool.query( "SELECT id, correo, nombre, contraseña, auth FROM nasa_usuarios");
        return resultado.rows;
    }catch (ex){
        console.log(ex);
        return ex;
    }
}

async function cambiarEstado(auth , id){
    try {
        const resultado = await pool.query(`UPDATE nasa_usuarios SET auth = ${auth} WHERE id = ${id} RETURNING *`);
        const cambioExitoso = resultado.rows[0];
        return cambioExitoso;
    } catch (ex){
        console.log(ex);
        return ex;
    }
};

async function crearUsuario(correo, nombre, contraseña, auth){
    try{
        const resultado = await pool.query(`INSERT INTO nasa_usuarios (correo, nombre, contraseña, auth) VALUES (${correo}, ${nombre}, ${contraseña}, ${vigencia}) RETURNING *`);
        const usuarioNuevo = resultado.rows[0];
        return usuarioNuevo;
    }catch (ex){
        console.log(ex);
        return ex;
    }
};

async function filtrarporEstado(auth){
    try{
        const resultado = await pool.query(`SELECT id, correo, nombre, contraseña, auth FROM nasa_usuarios WHERE auth = ${auth}`);
        return resultado.rows;
    }catch(ex){
        console.log(ex);
        return ex;
    }
};

module.exports = {
    obtenerUsuarios,
    cambiarEstado,
    crearUsuario,
    filtrarporEstado,
}