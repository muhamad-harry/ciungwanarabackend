const conn = require('../db/db.js');
const authorization = require('../middlewares/authorization.js');

exports.home = async function(req,res){
    //return "hai"; .select('users.id', 'contacts.phone')
    const auth = await authorization(req,res);
    const rekaps = await conn('tps')
                            .select(conn.raw('sum(cl_satu) as cln1'),
                                conn.raw('sum(cl_dua) as cln2'), 
                                conn.raw('sum(cl_tiga) as cln3'),
                                conn.raw('sum(cl_empat) as cln4'),
                                conn.raw('sum(jml) as hak_pilih'),
                                conn.raw('sum(ts) as tdk_sah'))
                            .first();
    
    if(!rekaps) return res.status(401).end();
    
    res.status(200);
    res.json({
        cln1 : rekaps.cln1,
        cln2 : rekaps.cln2,
        cln3 : rekaps.cln3,
        cln4 : rekaps.cln4,
        hak_pilih : rekaps.hak_pilih,
        ts : rekaps.tdk_sah
    })
}