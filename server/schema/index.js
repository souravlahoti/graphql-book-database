const graphql = require('graphql')
const _ = require('lodash')
const db = require('../db')
const Book = require('../models/book')
const Author = require('../models/author')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql


const BookType = new GraphQLObjectType({
    name: 'book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authorId: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({
                    authorId: parent.id
                })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //do somethngs 
                return Book.findById(args.id)
            }
        },

        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: () => ({
        addBook:{
            type: BookType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parents, args){
                let book = new Book({
                    title: args.title,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        },
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt}
            },
            resolve(parents, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})