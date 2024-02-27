import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => { 
    return new Promise((resolve, reject) =>{
        const payload = { uid, userName };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h'
            },
            (err, token) => {
                err ? (console.log(err), reject('Token cannot be added')) : resolve(token)
            }
        )
    })
}