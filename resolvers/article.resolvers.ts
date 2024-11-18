import Article from "../models/article.model"
import Category from "../models/category.model";

export const resolversArticle = {
    Query : {
        // Article
        getListArticles : async (_,args) => {
            const {
                sortKey,
                sortValue , 
                currentPage , 
                limitItems,
                filterKey,
                filterValue,
                keyword
            } = args;

            const find = {
                deleted: false
            };

            //sort
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue
            }
            //pagination
            const skip = (currentPage - 1) * limitItems
            //filter
            if (filterKey && filterValue) {
                find[filterKey] = filterValue
            }
            //search
            if (keyword) {
                const keywordRegex = new RegExp(keyword, 'i');
                find['title'] = keywordRegex
            }


            const article = await Article.find(find).sort(sort).limit(limitItems).skip(skip);
            return article;
        },
        getArticle : async (_,args) => {
            const {id} = args
            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        }
    },

    Article : {
        category : async (article) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({
                _id: categoryId
            })
            return category;
        }
    },

    Mutation : {
        createArticle : async (_,args) => {
            const {article} = args;
            const record = await Article.create(article);
            return record
        },
        deletedArticle : async (_,args) => {
            const {id} = args;
            await Article.updateOne({ 
                _id: id 
            }, { 
                deleted: true,
                deletedAt: new Date() 
            });
            return `Đã xóa ${id}`
        },
        updateArticle : async (_,args) => {
            const {id , article} = args;
            await Article.updateOne({ 
                _id: id ,
                deleted: false
            }, article);
            
            const record = await Article.findOne({
                _id: id,
                deleted: false
            });

            return record;
        }
    }
}