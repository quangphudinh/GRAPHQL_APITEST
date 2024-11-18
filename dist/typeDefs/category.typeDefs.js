"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql) `

    type Category {
        id : ID,
        title : String,
        avatar : String
    }

    # Lấy dữ liệu ra : sử dụng Query
    type Query {
        getListCategory : [Category],
        getCategory(id:ID) : Category
    }

    # Thêm Sửa Xóa : sử dụng Mutation
    input CategoryInput {
        title : String, 
        avatar : String  
    }

    type Mutation {
        createCategory(category : CategoryInput) : Category
        updateCategory(id : ID, category : CategoryInput) : Category
        deletedCategory(id : ID) : String
    }
`;
