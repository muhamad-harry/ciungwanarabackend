const conn = require('../db/db.js');
const authorization = require('../middlewares/authorization.js');

exports.kabupaten = async function(req,res){
    //return "hai"; .select('users.id', 'contacts.phone')
    // const auth = await authorization(req,res);
    // const rekaps = await conn('tps')
    //                         .select(conn.raw('sum(cl_satu) as cln1'),
    //                             conn.raw('sum(cl_dua) as cln2'), 
    //                             conn.raw('sum(cl_tiga) as cln3'),
    //                             conn.raw('sum(cl_empat) as cln4'),
    //                             conn.raw('sum(jml) as hak_pilih'),
    //                             conn.raw('sum(ts) as tdk_sah'))
    //                         .first();
    res.status(200);
    res.json({
        message : 'berhasil euy'
    })
}