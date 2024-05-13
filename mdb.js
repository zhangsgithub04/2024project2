const { MongoClient, ServerApiVersion } = require('mongodb');


var client = null;
var rooms = null;


module.exports = {

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
                rooms = database.collection("rooms");

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

    insert: async function (newObject) {
        let flag = 0;

        console.log(newObject);
        try {
            // Insert the defined document into the  collection
            const result = await rooms.insertOne(newObject);

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

    deleteOne: async function (query) {
        try {
            console.log("query is", query);

            const result = await rooms.deleteOne(query);
        }
        catch {
            console.log("something wrong");
        }
        finally { }

    }

}

