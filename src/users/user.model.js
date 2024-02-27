import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        require: [true, "Required field"]
    },
    email: {
        type: String,
        require: [true, "Required field"],
        unique: true //Cuidado, si da erro en el endpoint puede ser por esto
    },
    password: {
        type: String,
        require: [true, "Required field"]
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, status, google, ...user} = this.toObject();
    user.uid = _id;
    return user
}

export default mongoose.model('User', UserSchema);