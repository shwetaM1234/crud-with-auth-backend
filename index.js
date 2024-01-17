const {app}= require("./app")

const server=app.listen(5000, ()=>{
    console.log("Your website is running on port at http://localhost:5000/");
})