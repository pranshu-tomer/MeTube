<!-- ( - [title](link) ) -->

1. .getkeep (empty folder upload karne ke liye)
2. dotenv
3. Package.json - type : module (for  import use)
4. prettier - reduce conflicts

5. DataBase connection

6. cors - cross origin resource sharing
7. cookie-parser

8. mongoose-aggregate-paginate-v2
9. bcrypt , jsonwebtoken

10. mongoose hooks - (pre)
11. Arrow funtion me this ka refrence nahi hota , context nahi pata hota use

12. multer
13. cloudinary

14. fs - node js file system
15. Controller
16. Router

17. Postman Collection
18. register user and login with refreshtoken and access token
19. === , ?

20. Like we store user details in subscription model , so How we get subscriber details to user Account

Answer is - MongoDB Aggregation Pipeline
why not just add subscripber to user model using array - Answer is DSA (million data me se ek delete karo)

Aggregation Pipeline
An aggregation pipeline consists of one or more stages the process dicuments
* Each stage performs an operation on input document
* The document that are output from a stage are passed to next stage

how to write
model.aggregate([])
array contain objects , each object act as stage

$lookup : {
    from :
    localField:
    foreignField:
    as: 
}

$addFields: {
    author_details: {
        $first:"$as"
    }
}

these pipeline returns array with objects