
const express = require('express'); // for CJS (Common JS Modle)
// as your package type by default it is CJS

const app = express();
const port = process.env.port || 3007;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mdb1 = require('./mdb');
mdb1.start();


app.get('/', async function (req, res) {

    let result = await mdb1.getAll();
    console.log("Result is: "+result);

    if (result.message==-1)
            res.status(404).json(result);   
    else
    {   console.log("all is:",JSON.stringify( result.message));
        res.status(200).json(JSON.stringify(result.message));  
    }
});

app.get("/:id", function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.post('/',
    async function (req, res) {
        let resData;

        console.log("debug in post:" + JSON.stringify(req.body));

        let newItem = {
            name: req.body.name,
            course: req.body.course,
            roll_no: req.body.roll_no
        }

        result = await mdb1.insert(newItem);
        console.result;

        console.log("insert flag:", result);

        if (result == 0) {
            resData = { 'message': "successfully created" };
            res.status(201).json(resData);
        }
        else {
            resData = { 'message': "Not created" };
            res.status(400).json(resData);
        }

    });


app.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let updateData = {
            id: found.id,
            name: req.body.name,
            course: req.body.course,
            roll_no: req.body.roll_no
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updateData);

        res.status(201).json({ 'message': "data updated" });
    } else {
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});



app.delete('/:id', async function (req, res) {
    let resData;

    console.log("delete id: ", req.params.id);
    
    //query = { "_id": `ObjectId('${req.params.id}')` }
    
    let result =await mdb1.deleteOneById(req.params.id);
    console.log("result", result);
    // here result is number of docs deleted
    if (result >= 0) {
        resData = { 'message': 'Delete Successfully' }

        res.sendStatus(200);
    }
    else {
        resData = {
            'message': 'unable to delete data because data doesn\'t even exist'
        }
        res.sendStatus(404);
    }

});




app.delete('/ByName/:name', async function (req, res) {
    let resData;

    console.log("name: ", req.params.name);
    
    //query = { "_id": `ObjectId('${req.params.id}')` }
    
    query = { "name": `${req.params.name}` }
    let result = mdb1.deleteOneByName(query);

    if (result == 0) {
        resData = { 'message': 'Delete Successfully' }

        res.sendStatus(200);
    }
    else {
        resData = {
            'message': 'unable to delete data because data doesn\'t even exist'
        }
        res.sendStatus(404);
    }

});


app.patch("/:id", function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        if (req.body.name) {
            found.name = req.body.name;
        }
        if (req.body.course) {
            found.course = req.body.course;
        }
        if (req.body.roll_no) {
            found.roll_no = req.body.roll_no;
        }
        res.status(201).json({ "message": "data updated" });
    } else {
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});