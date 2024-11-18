"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
    type Article {
        _id : ID
        title : String
        avatar : String
        description : String
        category : Category
    }

    # Lấy dữ liệu ra : sử dụng Query
    type Query {
        getListArticles(
            sortKey : String, 
            sortValue : String,
            currentPage : Int = 1,
            limitItems : Int = 2,
            filterKey : String,
            filterValue : String,
            keyword : String
        ) : [Article],
        getArticle(id:ID) : Article
    }

    # Thêm Sửa Xóa : sử dụng Mutation
    input ArticleInput {
        title : String, 
        avatar : String,
        description : String,
        categoryId : String
    }

    type Mutation {
        createArticle(article : ArticleInput) : Article,
        deletedArticle(id : ID) : String,
        updateArticle(id : ID, article : ArticleInput) : Article
    }
`;
