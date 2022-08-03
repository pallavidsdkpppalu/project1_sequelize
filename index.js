const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const port = 7000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const sequelize = new Sequelize("pallaviDB", "pallavi", "pallavi@123",{
    dialect: "mysql",
});




const user_detail = sequelize.define(
    "user_detail",
    
    {
        user_name: Sequelize.STRING,
        user_password: Sequelize.STRING,
    },

    {tableName: "user_detail"}

);

user_detail.sync();

sequelize.authenticate().then(() => {
    console.log("connection made successsfully")
}).catch((err)=>console.log(err,"this has a error"))
// app.get("/", (req,res) => {

//     res.send("this is working fine");
// });

app.post("/", async(req,res) => {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const saveUser = user_detail.build({
        user_name,
        user_password,
    });
    await saveUser.save();
    res.send("data posted successfuly");
});

app.get("/",async(req,res)=>{
    const alldata = await user_detail.findAll();
    res.json(alldata);
});

app.put("/:id", (req, res) => {
    const data = req.body.data;
    user_detail.update(
        {
             user_password: data,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    res.redirect("/");
});

app.delete("/:id", (req, res) => {
    user_detail.destroy(
        {
            where: {
                id: req.params.id,
            },
        
        });
    res.redirect("/");
});

app.listen(port,() => {
    console.log(`server starts at http://localhost:${port}`);
});
