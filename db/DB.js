import mongoose  from "mongoose";

async function DBconnection(){
   try {
    const db = await mongoose.connect(`${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`)
    if(db){
    console.log("Mongodb Connection Done");
    }else{
    console.error("while connecting Mongodb error");
    }
   } catch (error) {
    console.error("Mongodb Connection Error");
   }
}

export default DBconnection