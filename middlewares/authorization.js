const jwt = require('jsonwebtoken');

function authorization(req,res){
    return new Promise((resolve, reject) => {
        const {authorization}=req.headers;
        
        if(!authorization) return res.status(401).end();

        const authSplit = authorization.split(' ');
        const [authType, authToken] = [
            authSplit[0],
            authSplit[1]
        ]

        if(authType !== 'Bearer') return res.status(401).end();
        return jwt.verify(authToken, 'independen', function(err, decode){
            if(err) return res.status(401).end();

            return resolve(decode);
        });
    })    
    

}

module.exports = authorization;
// const {authorization}=req.headers;
//     if(!authorization) return res.status(401).end();

//     const authSplit = authorization.split(' ');
//     const [authType, authToken] = [
//         authSplit[0],
//         authSplit[1]
//     ]

//     if(authType !== 'Bearer') return res.status(401).end();
