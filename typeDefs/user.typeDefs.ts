import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
    type User {
        id : ID
        fullName : String
        email : String
        token : String
        code : Int 
        message : String
    }
    #Lay du lieu
    type Query {
        getUser : User
    }

    # Them Sua Xoa
    input RegisterUserInput {
        fullName : String, 
        email : String,
        password : String
    }

    input LoginUserInput {
        email : String,
        password : String
    }

    type Mutation {
        registerUser(user : RegisterUserInput) : User,
        loginUser(user : LoginUserInput) : User
    }
`;


// Login 
// mutation(
//     $email : String ,
//     $password : String
//   ){
//     loginUser( user : {
//       email : $email,
//       password : $password
//     }){
//       id
//       fullName
//       email
//       token
//       code
//       message
//     }
//   }