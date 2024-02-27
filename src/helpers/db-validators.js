import User from "../users/user.model.js";

export const existentUserEmail = async (email = '') => {
    const existentUserEmail = await User.findOne({ email });
    if (existentUserEmail) {
        throw new Error(`Email ${email} already be registered`);
    }
}

export const existentUserName = async(userName = '') => { 
    const existentUserName = await User.findOne({ userName });
    if (existentUserName){
        throw new Error(`User: ${userName} already exists. You must register another username.`);
    }
}