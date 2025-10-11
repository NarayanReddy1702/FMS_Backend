import app from "./app.js";
import DBconnection from "./db/DB.js";

const port = process.env.PORT

app.listen(port,()=>{
    DBconnection()
    console.log(`App is runing on port ${port}`)
})