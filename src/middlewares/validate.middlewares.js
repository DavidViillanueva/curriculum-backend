const { response } = require('express');

const validateJWT = async ( req, res = response, next ) => {
    let token = req.header('authorization');

    if (!token)
        return res.status(401).json({
            ok: false,
            msg: "missing token"
        })

    if ( !token === process.env.AUTH_TOKEN )
        return res.status(401).json({
            ok: false,
            msg: "Token invalid"
        })
    
    next();

}

module.exports = {
    validateJWT
}