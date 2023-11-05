const express = require("express");
const app = express();
const schedule=require("node-schedule")
const path = require("path");
let cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const port = process.env.PORT || 3500;

const hbs = require("hbs");
const { collection, collection3} = require("./mongodb");
// const collection3 = require("./mongodb");

const tempelatePath = path.join(__dirname, '../Views')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'));

app.get("/", (req, res) => {
    res.render("index1")
})
app.get("/index1", (req, res) => {
    res.render("index1")
})
app.get("/Login", (req, res) => {
    res.render("Login")
})
app.get("/index", (req, res) => {
    res.render("index")
})
app.get("/Signup", (req, res) => {
    res.render("Signup")
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/aboutc", (req, res) => {
    res.render("aboutc")
})
app.get("/contactc", (req, res) => {
    res.render("contactc")
})

app.post("/Signup", async (req, res) => {

    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        date:new Date()

    }
    const a= req.body.password;
    const b= req.body.cpassword;
    const check = await collection.findOne({ email: req.body.email })
    if (check==null){

    
     if (a ===b) {

        await collection.insertMany([data])

        res.status(201).render("Login")
    }
    else{
        res.send("Password are not match")
    }
}
else{
    res.send("User already exist");
}

})

// app.post("/expamount", async (req, res) => {
//     try {
//         const email = req.body.email;
//         const expamount = req.body.expamount;

//         // Check if a document with the given email exists
//         const user = await collection.findOne({ email });

//         if (user) {
//             // Update the 'expamount' field
//             const updatedUser = await collection.updateOne({ email }, { $set: { expamount } });

//             if (updatedUser.modifiedCount === 1) {
//                 // Successfully updated the document
//                 res.status(201).render("index");
//             } else {
//                 // The update query didn't modify any documents
//                 res.status(500).send("Failed to update expamount.");
//             }
//         } else {
//             // User with the provided email doesn't exist
//             res.status(404).send("User not found.");
//         }
//     } catch (error) {
//         // Handle any errors that might occur during the update process
//         console.error(error);
//         res.status(500).send("Internal server error.");
//     }
// });


app.post("/expamount", async (req, res) => {

    const ab=req.body.email;
    const abc= req.body.expamount;
    const check = await collection.findOne({ email: req.body.email })
    if (check){
        // const update= await collection.updateOne({email: ab}, {$set: {expamount: abc }});
        check.email=ab;
        check.expamount=abc;
        await check.save();
        res.status(201).render("index")
    }
    else{
        res.send("Wrong email");
    }

})
let check2;
app.post("/expamount2", async (req, res) => {

    const ab1=parseInt(req.body.expamount2,10);
    d=parseInt(check2.expamount2,10)
    e=parseInt(check2.expamount,10)
    console.log(e);
    console.log(ab1+d,e);
    if(ab1 + d > e)
    {
        // res.send("Expenditure is gover ")
        res.render("Login")
    }
    else
    {
        f=ab1+d
        check2.email=check2.email;
        check2.expamount2=f;
        await check2.save();
        res.redirect("https://paytm.com")
    }

})


app.post("/Login", async (req, res) => {
    try {
         check2 = await collection.findOne({ email: req.body.email })

        if (check2.password === req.body.password) {
            new_date=new Date()
            if(check2.date===new_date){
                res.render("index")
            }
            else
            {
                check2.email=check2.email
                check2.expamount2=0
                check2.date=new_date
                await check2.save();
                res.render("index")
            }
            
        }
        else {
            res.send("wrong password")
            res.render("Login")
        }
    }
    catch {
        res.send("wrong details")
    }
})


app.post("/contact", async (req, res) => {

    const data2 = {
        name: req.body.name,
        email: req.body.email,
        Contact: req.body.Contact,
        Address: req.body.Address

    }


    await collection3.insertMany([data2])
    res.render("index")

})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})