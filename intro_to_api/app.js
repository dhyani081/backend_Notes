import express from 'express';


const app = express();
const PORT = 5010;

app.use(express.json());

let taskArr = [
    {
        id:1,
        task: "Buy Grocery"
    },
    {
        id:2,
        task: "Buy Books"
    },
    {
        id:3,
        task: "Buy Fruits"
    },
    {
        id:4,
        task: "Buy Laptop"
    }

]


app.get("/alltasks", (req, res)=>{
    res.json({
        message: "All Tasks",
        result: taskArr
    })
})

app.get("/task/:id",(req, res)=>{
    let taskId = +req.params.id 

    let foundTask = taskArr.find((task)=>{
        return task.id === taskId
    })

    if(foundTask){
        res.json({
            message: "Task Found",
            result: foundTask
        })
    } else{
        res.json({
            message: "Task Not Found"
        })
    }
})

app.patch("/task/:id", (req, res)=>{
    let taskId = +req.params.id

    let updatedTask = req.body.task

    for(let t of taskArr){
        if(t.id === taskId){
            t.task = updatedTask
        }
    }

    res.json({
        message: "Task Updated",
        result: taskArr
    })
})

app.post("/addTask", (req, res)=>{

    let lastTask = taskArr[taskArr.length-1].id

    let newTask = {
        id: lastTask + 1,
        task: req.body.task
    }

    taskArr.push(newTask)

    res.json({
        message: "Task Added",
        result: taskArr
    })
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

