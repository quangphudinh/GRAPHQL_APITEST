import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
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

// Truy vấn GraphQL
// query (
//     $sortKey : String ,
//     $sortValue : String,
//     $currentPage : Int,
//     $limitItems : Int,
//     $filterKey : String,
//     $filterValue : String,
//     $keyword : String
//     ) {
//     getListArticles
//     (
//       sortKey : $sortKey,
//       sortValue :$sortValue,
//       currentPage : $currentPage,
//       limitItems : $limitItems,
//       filterKey : $filterKey,
//       filterValue : $filterValue,
//       keyword : $keyword
  
//     ) {
//       _id
//       title
//       category {
//         id
//       }
//     }
//   }

//   {
//     "sortKey" : "title",
//     "sortValue":"desc",
//     "currentPage" : 1,
//     "limitItems" : 10,
//     "keyword" : "Viet"
//   }