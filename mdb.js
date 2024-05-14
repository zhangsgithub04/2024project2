const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb'); // or ObjectID 




module.exports = {
    client: null,
    collection: null,

    start: function () {
        const uri = "mongodb+srv://stephen2:888888@newdev.ob1jxog.mongodb.net/?retryWrites=true&w=majority&appName=newdev";
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version

        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        async function run() {
            try {
                // Connect the client to the server	(optional starting in v4.7)
                await client.connect();
                // Send a ping to confirm a successful connection
                await client.db("admin").command({ ping: 1 });

                const database = client.db("test");
                collection = database.collection("rooms");
                // console.log("collection is:", collection); 

                console.log("Pinged your deployment. You successfully connected to MongoDB!");
            }
            catch (err) {
                console.log(err);
            }

            finally {
                // Ensures that the client will close when you finish/error
                //await client.close();
                ;
            }
        }
        run().catch(console.dir);
    },


    f1: function () {
        return 100;
    },

    getAll: async function () {
        let flag;
        let data
        await collection.find({}).toArray() // since otherwise it is a cursor
            .then(result => {
                console.log("retrieved successfully: "+result);
                data=JSON.stringify(result);
                console.log("retrieved JSON: ", data);
                flag=0;
            })
            .catch(err => {
                console.error(`Retrival failed with error: ${err}`);
                flag =-1;
            })

        if (flag==0)
            {
                console.log(data);
                return {"message":data};
            }
        else 
        {
            console.log("flag is:", flag);
            return {"message":-1};
        }
    },



    insert: async function (newObject) {
        let flag = 0;

        console.log(newObject);
        try {
            // Insert the defined document into the  collection
            const result = await collection.insertOne(newObject);

            // Print the ID of the inserted document
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            flag = 0;
        } catch {
            console.log("something wrong when insert!");
            flag = -1;
        }
        finally {
            // Close the MongoDB client connection
            ;
        }
        return flag;
    },

    deleteOneByName: async function (query) {

        console.log("query is", query);

        collection.deleteOne(query)
            .then(result => {
                console.log(`Deleted ${result.deletedCount} item.`);
                return 0;
            })
            .catch(err => {
                console.error(`Delete failed with error: ${err}`);
                return -1;
            })

    },

    deleteOneById: async function (id) {
        let flag = 0;
        let query = { '_id': new ObjectId(id) };
        //despite deprecated, still working here using ObjectId. 

        await collection.deleteOne(query)
            .then(result => {
                console.log(`Deleted ${result.deletedCount} item.`);
                flag = result.deletedCount;
            })
            .catch(err => {
                console.error(`Delete failed with error: ${err}`);
                flag = -1;
            })
        return flag;

    }

}

