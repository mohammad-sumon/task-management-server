const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
        
        app.get("/myTasks", async(req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })

        app.post("/myTasks", async (req, res) => {
            const task = req.body;
            console.log(task);
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })
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

