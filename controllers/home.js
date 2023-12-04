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
    res.status(200);
    res.json({
        message : 'berhasil',
     rekaps
    })
}

exports.kecamatan = async function(req,res){

    const auth = await authorization(req,res);
    const rekaps = await conn('tps')
                            .join('kecamatan', 'tps.id_kecamatan', '=', 'kecamatan.id')
                            .select('kecamatan.kecamatan',conn.raw('sum(tps.cl_satu) as cln1'),
                                conn.raw('sum(tps.cl_dua) as cln2'), 
                                conn.raw('sum(tps.cl_tiga) as cln3'),
                                conn.raw('sum(tps.cl_empat) as cln4'),
                                conn.raw('sum(tps.jml) as hak_pilih'),
                                conn.raw('sum(tps.ts) as tdk_sah'))
                            .groupBy('tps.id_kecamatan')
    
    
    if(!rekaps) return res.status(401).end();

    res.status(200);
    res.json({
        message : 'berhasil euy',
        data: rekaps
    })
}


exports.kecamatandetail = async function(req,res){
    var idkec = req.params.id;

    const auth = await authorization(req,res);

    const kec = await conn('kecamatan')
                            .select('id','kecamatan')
                            .where('id', idkec)
                            .first();
    
    if(!kec) return res.status(401).end();

    const rekaps = await conn('tps')
                            .join('desa', 'tps.id_desa', '=', 'desa.id')
                            .select('desa.id','desa.desa',conn.raw('sum(tps.cl_satu) as cln1'),
                                conn.raw('sum(tps.cl_dua) as cln2'), 
                                conn.raw('sum(tps.cl_tiga) as cln3'),
                                conn.raw('sum(tps.cl_empat) as cln4'),
                                conn.raw('sum(tps.jml) as hak_pilih'),
                                conn.raw('sum(tps.ts) as tdk_sah'))
                            .groupBy('tps.id_desa')
                            .where('tps.id_kecamatan', idkec);
    
    
    if(!rekaps) return res.status(401).end();

    res.status(200);
    res.json({
        message : 'berhasil euy',
        data: rekaps,
        kecamatan : kec
    })
}

exports.desadetail = async function(req,res){
    var idkec = req.params.id;
    var idds = req.params.idds;

    const auth = await authorization(req,res);

    const ds = await conn('desa')
                            .join('kecamatan', 'desa.id_kecamatan', '=', 'kecamatan.id')
                            .select('desa.id','desa.desa', 'desa.id_kecamatan', 'kecamatan.kecamatan')
                            .where('desa.id', idds)
                            .first();
    
    if(!ds) return res.status(401).end();

    const rekaps = await conn('tps')
                            .select('id','tps', 'cl_satu as cln1', 'cl_dua as cln2', 'cl_tiga as cln3', 'cl_empat as cln4', 'jml as hak_pilih', 'ts as tdk_sah')
                            .where('id_desa', idds);
    
    
    if(!rekaps) return res.status(401).end();

    res.status(200);
    res.json({
        message : 'berhasil euy',
        data: rekaps,
        desa : ds
    })
}

exports.tps = async function(req,res){
    var idkec = req.params.id;
    var idds = req.params.idds;
    var idtps = req.params.idtps;

    const auth = await authorization(req,res);

    const tps = await conn.select('tps.id','tps.tps','tps.id_desa','desa.desa', 'tps.id_kecamatan', 'kecamatan.kecamatan', 'tps.cl_satu as cln1', 'tps.cl_dua as cln2', 'tps.cl_tiga as cln3', 'tps.cl_empat as cln4', 'tps.jml as hak_pilih', 'tps.ts as tdk_sah')
    .from('tps')                    
    .join('kecamatan', 'tps.id_kecamatan', '=', 'kecamatan.id')
                        .join('desa', 'tps.id_desa', '=', 'desa.id')
                        .where('tps.id', idtps)
                        .first();
    //console.log(tps);
    if(!tps) return res.status(401).end();

    res.status(200);
    res.json({
        message : 'berhasil euy',
        data: tps
    })
}