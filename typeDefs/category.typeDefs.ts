import { gql } from "apollo-server-express";

export const typeDefsCategory = gql`

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
