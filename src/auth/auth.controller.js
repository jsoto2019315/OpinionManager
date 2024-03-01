import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

const token = '';
export const login = async (req, res) => {

    const { email, userName, password } = req.body;

    try {
        let user;

        if (email) {
            user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    msg: "Email hasn't been register"
                });
            }

            if (!user.status) {
                return res.status(400).json({
                    msg: "Email doesn't exist in DB",
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Incorrect password"
                });
            }

            token = await generateJWT(user.id)

            console.log(token);
            res.status(200).json({
                msg: `You've logged in, welcome ${user.userName}. Your token is:  ${token}`
            });
        } else if (userName) {
            user = await User.findOne({ userName });

            if (!user) {
                return res.status(400).json({
                    msg: "User hasn't been register"
                });
            }

            if (!user.status) {
                return res.status(400).json({
                    msg: "User doesn't exist in DB",
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Incorrect password"
                });
            }

            const token = await generateJWT(user.id)

            res.status(200).json({
                msg: `You've logged in, welcome ${user.userName}. Your token is:  ${token}`
            });
        } else {
            return res.status(400).json({
                msg: "You must give an email or user to log in"
            });
        }

    } catch (e) {
        console.log(e),
            res.status(500).json({
                msg: "Contact the admin"
            })

    }
}

export const getToken = () => {
    return token;
}