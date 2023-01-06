//AQUI VAN LAS INTERACCIONES CON LA DB
import { getConnection } from "./../database/database";

/*FUNCION getUser
    RECIBE: 
    DESCRIPCION: La funcion retorna los email y password de los usuarios registrados en la DB,
                 esta funcion se empleara para el inicio de sesion
*/
const getUser = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT idUser, userEmail, userPassword FROM user");
        console.log(result);
        res.json(result);
    }catch{
        res.status(500);
        res.send(error.message);
    }
};
/*FUNCION addUser
    RECIBE: Name, email, password, telephone number, age and gender del usuario
    DESCRIPCION: La funcion registra los datos de un nuevo usuario en la DB, en caso de que
                 alguno de los campos no se reciba, se manda un "BAD REQUEST"
*/

const addUser = async (req, res) =>{
    try{
        const {userName, userEmail, userPassword, userTel, userAge, userGender} = req.body;
        
        //Verificamos que se envien los datos completos
        if(userName == undefined || userEmail == undefined || userPassword==undefined || userTel == undefined ||userAge == undefined || userGender == undefined){
            res.status(400).json({message: "Bad Request. Fill all field."});
        }      
        //Objeto en el que guardo las variables que empleo para insertar en mi tabla user
        const usuario = {userName, userEmail, userPassword, userTel,userAge, userGender}
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO user SET ?", usuario);
        res.json({message: "User added"});
    }catch{
        res.status(500);
        res.send(error.message);
    }
};
/*FUNCION deleteUser
    RECIBE: Id del usuario a eliminar
    DESCRIPCION: Elimina al usuario con el id que se recibe por parametro
                 En caso de que no se encuentre el usuario, se retrona un "BAD REQUEST" 
*/
const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM user WHERE idUser = ?", id);

    }catch{
        res.status(500);
        res.send(error.message);
    }
};
/*FUNCION updateUser
    RECIBE: Id del usuario que se quiere actualizar
    DESCRIPCION: Actualiza los datos del usuario con el id que se recibe por parametro
                 En caso de que no se encuentre el usuario, se retrona un "BAD REQUEST" 
*/
const updateUser = async (req, res) =>{
    try{
        const {idUser ,userName, userEmail, userPassword, userTel, userAge, userGender} = req.body;
        
        //Verificamos que se envien los datos completos
        if(idUser == undefined || userName == undefined || userEmail == undefined || userPassword==undefined || userTel == undefined ||userAge == undefined || userGender == undefined){
            res.status(400).json({message: "Bad Request. Fill all field."});
        } 
        const usuario = {userName, userEmail, userPassword, userTel,userAge, userGender}
        const connection = await getConnection();
        const result = await connection.query("UPDATE user SET ? WHERE idUser = ?", [usuario, idUser]);
    }catch{
        res.status(500);
        res.send(error.message);
    }
}

//Exporto funciones
export const methods = {
    getUser,
    addUser,
    deleteUser,
    updateUser
};

