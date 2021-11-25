let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;

let sanitizer = require("express-sanitizer");
let ObjectId = require("mongodb").ObjectId;

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbPhotoAlbum";

// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());

// middleware body parser to handle CORs errors while developing
app.use(express.json());
// add middware for sanitizer to check on incoming JSON
app.use(sanitizer());

// get absolute path to /build folder (production build of react web app)
const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

app.get("/get", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

    try {
        await mongoClient.connect();
        // get reference to database via name
        let db = mongoClient.db(DB_NAME);
        let techArray = await db.collection("photos").find().sort("id",1).toArray();
        let json = { "photos": techArray };
        // serializes sampleJSON to string format
        response.status(200);
        response.send(json);
    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
        response.status(500);
        response.send({error: error.message});
    } finally {
        mongoClient.close();
    }
});

app.put("/put", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    let id = new ObjectId(request.sanitize(request.body._id));

    try {
        await mongoClient.connect();
    
        // sanitize form input
        request.body.comments.forEach(comment => {
            comment.comment = request.sanitize(comment.comment);
            comment.author = request.sanitize(comment.author);
        });
        
        // get reference to collection
        let photoCollection = mongoClient.db(DB_NAME).collection("photos");
        let selector = {"_id" : id};
      
        let newComment = {
                        $push : {
                            comments : {
                                $each : request.body.comments,
                                // $sort : {"comment": 1}
                                $position : 0
                            } 
                        } 
                    };
        // db.collection("photos")let newComment1 =  ("comments").find().sort({ $natural: 1 });
        
        // add new technology document into collection
        let result = await photoCollection.updateOne(selector, newComment);

        if (result.matchedCount <= 0) {
            response.status(404);
            response.send({error: "No technology documents found with ID"});
            mongoClient.close();
            return;
        }
        // status code
        response.status(200);
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
        response.status(500);
        response.send({error: error.message});
    } finally {
        mongoClient.close();
    }
});

//------------------------------------------------------- added delete for test cases so didn't have to rebuild docker

// app.delete("/delete", async (request, response) => {
//     // construct a MongoClient object, passing in additional options
//     let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

//     let id = new ObjectId(request.sanitize(request.body._id));

//     try {
//         await mongoClient.connect();
    
//         // get reference to collection
//         let photoCollection = mongoClient.db(DB_NAME).collection("photos");

//         let selector = {"_id" : id};

//         // make it happen
//         let result = await photoCollection.deleteOne(selector);
        
//         console.log("the result is " + result.deletedCount);
//         console.log("the result is " + result.acknowledged);
//         console.log("the result is " + id);
//         console.log("the result is " + selector);
//         // if (result.error == null) {
//         //     response.status(404);
//         //     response.send({error: "No technology documents found with ID"});
//         //     mongoClient.close();
//         //     return;
//         // }

//         if (result.deletedCount == 0) {
//             response.status(404);
//             response.send({error: "No technology documents found with ID"});
//             mongoClient.close();
//             return;
//         }
//         // if (!techCollection.hasOwnProperty(id)) {
//         //     response.status(404);
//         //     response.send({error: "No technology documents found with ID"});
//         //     mongoClient.close();
//         //     return;
//         // }

//         // status code
//         response.status(200);
//         response.send(result);

//     } catch (error) {
//         console.log(`>>> ERROR : ${error.message}`);
//         response.status(500);
//         response.send({error: error.message});
//     } finally {
//         mongoClient.close();
//     }
// });

// wildcard to handle all other non-api URL routings and point to index.html
app.use((request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(8080, () => console.log("Listening on port 8080"));