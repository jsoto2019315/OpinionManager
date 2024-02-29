import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token, please log in to generate one'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'User does not exists on DB'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid Token - User with status: false'
            })
        }

        req.user = user
        
        next();
    } catch (e) {
        console.log('Mistake creating the token \nPlease log in again to generate a new token');
        //console.log(e);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}