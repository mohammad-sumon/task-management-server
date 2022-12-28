const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// user: taskUser
// password: laildOJNwe35YQj7



const uri = "mongodb+srv://taskUser:laildOJNwe35YQj7@cluster0.jiixnyw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const taskCollection = client.db('taskManagement').collection('myTasks');
        const completedTaskCollection = client.db('taskManagement').collection('completedTasks');
        
        app.get("/myTasks", async(req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        });

        app.post("/myTasks", async (req, res) => {
            const task = req.body;
            console.log(task);
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        app.delete("/myTasks/:id", async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
            // console.log(result);
            res.send(result);
        });

        app.get("/completedTasks", async(req, res) => {
            const query = {};
            const cursor = completedTaskCollection.find(query);
            const completed = await cursor.toArray();
            res.send(completed);
        });

        app.post("/completedTasks", async(req, res) => {
            const completedTask = req.body;
            const result = await completedTaskCollection.insertOne(completedTask);
            res.send(result);
        });

        app.delete("/completedTasks/:id", async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await completedTaskCollection.deleteOne(query);
            // console.log(result);
            res.send(result);
        });

    }
    finally{

    }
}

run().catch(err => console.log(err));


app.get("/", async(req, res) => {
    res.send('task management server is running')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

