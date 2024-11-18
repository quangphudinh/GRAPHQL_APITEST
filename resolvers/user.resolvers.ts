import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from "md5";


export const resolversUser = {
    Query : {
        getUser : async (_, args, context) => {
            console.log(context.user);
            // const {id} = args;

            const user = await User.findOne({
            // _id : id,
            token : context.user.token,
            deleted : false
            });

            if (user) {
            return {
                code : 200,
                message : "Thành công",
                id : user.id,
                fullName : user.fullName,
                email : user.email,
                token : user.token
            };
            } else {
            return {
                code : 400,
                message : "Thất bại!"
            }
            }
      },  
    },
    Mutation : {
        registerUser : async (_, args) => {
            const {user} = args;

            const existEmail = await User.findOne({
                email : user.email,
                deleted : false
            });

            if (existEmail) {
                return {
                    code : 400,
                    message : "Email đã tồn tại"
                };
            }else{
                user.password = md5(user.password);
                user.token = generateRandomString(30);

                const newUser = new User(user);
                const data = await User.create(newUser);
                return {
                    code : 200,
                    message : "Đăng ký thành công",
                    id : data.id,
                    fullName : data.fullName,
                    email : data.email,
                    token : data.token
                }
            }
        },
        loginUser : async (_, args) => {
            const {email, password} = args.user;
            
            const infoUser = await User.findOne({
                email : email,
                deleted : false
            });

            if (infoUser) {
                if (infoUser.password === md5(password)) {
                    return {
                        code : 200,
                        message : "Đăng nhập thanh cong",
                        id : infoUser.id,
                        fullName : infoUser.fullName,
                        email : infoUser.email,
                        token : infoUser.token
                    }
                }else{
                    return {
                        code : 400,
                        message : "Sai mat khau"
                    }
                }
            } else {
                return {
                    code : 400,
                    message : "Email khong ton tai"
                }
            }
        }
    }
};