const conn = require('../db/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users = async function(req,res){
    console.log(req.headers);
    res.end();
}

exports.register = async function(req,res){
    //if (req.method !== 'POST') return res.status(405).end;
    var regist;
    const {username,password,nama,hak_akses,lokasi,status} = req.body;  
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    let data = {
        username,
        password : passwordHash,
        nama,
        hak_akses,
        lokasi,
        status
    }
   
    res.status(200);
    res.json({
        message: 'Succes Register',
        data
    })
}

exports.login = async function(req,res){
    //if(req.method !== 'POST') return res.status(405).end();
    const {username,password} = req.body;  
    // // const salt = bcrypt.genSaltSync(10);
    // // const passwordHash = bcrypt.hashSync(password, salt);
    // var prosess;
    // //console.log(username, passwordHash);
    // try {
    //     prosess = await new Promise((res, rej) =>{
    //         conn.query("SELECT * from Users WHERE username =?",[username],(err, results)=>{
    //             //if(err) return res.status(401).end();
    //             if(results.length = !null){

    //                 var user = results[0];
    //                 var item = {
    //                     username : user.username.toString(),
    //                     password : user.password.toString(),
    //                     nama : user.nama.toString(),
    //                     hak_akses : user.hak_akses.toString(),
    //                     lokasi : user.lokasi.toString(),
    //                     status : user.status.toString()
    //                 }
    //                 res(item);
    //             }else{
    //                 res('kosong');
    //             }
    //         })
    //     })
    // } catch (error) {
    //     throw error;
    //     //res.status(401).end();
    // }
    // // console.log(prosess);
    // // res.end()
    // if (!prosess) return res.status(401).end();
    // const cep = await bcrypt.compare(password, prosess.password);
    
    // // console.log(cep);
    // if (!cep) return res.status(401).end();
    // res.status(200);
    // res.json({
    //     message : 'berhasil',
    //     data : prosess
    // })
    // conn.query('SELECT * from Users WHERE username ="'+username+'"',(err, results)=>{
    //    // console.log(results)
    //     if(results.length > 0){
    //         var user = results[0];
    //         const cep = await bcrypt.compare(password, user.password);
    //         console.log(cep);
    //         if( passwordHash === user.password){
    //             res.status(200).json({
    //                 message: 'Succes Login',
    //                 data : {
    //                     username : user.username.toString(),
    //                     password : user.password.toString(),
    //                     nama : user.nama.toString(),
    //                     hak_akses : user.hak_akses.toString(),
    //                     lokasi : user.lokasi.toString(),
    //                     status : user.status.toString()
    //                 }
    //             })
    //         }else{
    //             res.status(401).json({
    //                 message: 'Password Salah'
    //             })
    //         }
    //     }else{
    //         res.status(401).json({
    //             message: 'Data User Tidak ditemukan'
    //         })
    //     }
    // })

    const cekUser = await conn('Users').where({username}).first();
    
    if(!cekUser) return res.status(401).end();

    const cekp = await bcrypt.compare(password, cekUser.password);

    //console.log(cekp);

    if(!cekp) return  res.status(401).end();

    const token = jwt.sign({
        username: cekUser.username,
        hak_akses: cekUser.hak_akses
    },'independen',{
        expiresIn: '7d'
    })


    res.status(200).json({
        message: 'Succes Login',
        data : token
    })

    


}