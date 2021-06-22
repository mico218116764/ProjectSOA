const exp= require('express');
const db = require('../database');
const route = exp.Router();



route.get('/all', async function (req,res){
    let conn = await db.getConn()
    let api = req.body.api_key
    let checkAPI = await db.executeQuery(conn, `select * from user where api_key = '${api}'`)
    if(checkAPI[0] == null){
        res.status(404).send({msg:"API tidak valid"})
    }else{
        let select = await db.executeQuery(conn,`select * from recipe `)
        res.status(200).send({select})
    }
})

route.post('/new', async function (req,res){
    let conn = await db.getConn()
    let api = req.body.api_key
    let email = req.body.email
    let nama = req.body.nama_recipe
    let tipe = req.body.tipe_diet
    let checkEmail = await db.executeQuery(conn,`select * from user where email = '${email}'`)
    let checkAPI = await db.executeQuery(conn, `select * from user where api_key = '${api}'`)
    if(checkEmail[0] == null){
        res.status(404).send({msg:"Email user tidak ada"})
    }
    if(checkAPI[0] == null){
        res.status(404).send({msg:"API tidak valid"})
    }else{
        let select = await db.executeQuery(conn,`select * from recipe`)
        let id = ''
        if(select.length<10){
            id ='RE00'+select.length+1
        }else if(select.length < 100){
            id ='RE0'+select.length+1
        }else{
            id ='RE'+select.length+1
        }
        
        let q = await db.executeQuery(conn, `
            INSERT INTO recipe VALUES ('${id}', '${email}', '${nama}',${tipe}, null)
        `);

        const hasil = {
            email : email,
            nama : nama,
            api_key : api
        };

        res.status(200).send({id})
    }
})


module.exports = route;
