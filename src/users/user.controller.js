import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import { getToken } from '../auth/auth.controller.js';

export const userPost = async (req, res) => {

    try {
        const { userName, email, password } = req.body;
        const user = new User({ userName, email, password });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            user
        });
    } catch (e) {
        console.log('Mistake creating the student');
        console.error(e);
    }

}

export const userPut = async (req, res) => {
    //res.header('x-token', getToken());

    const { id } = req.user;
    const { oldPassword, newPassword, _id, status, __v, ...rest } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                msg: "User isn't logged in"
            });
        }

        if (oldPassword && newPassword) {
            const validOldPassword = bcryptjs.compareSync(oldPassword, user.password);
            if (!validOldPassword) {
                return res.status(400).json({
                    msg: "Incorrect old password "
                });
            }

            const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
            user.password = hashedNewPassword;
        }

        for (const key in rest) {
            user[key] = rest[key];
        }

        await user.save();

        res.status(200).json({
            msg: "User updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error processing request"
        });
    }


}