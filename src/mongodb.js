const mongoose = require("mongoose");
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://utkarshgoyal07:iDWEOq88ODqTVM5b@spendvizer.hq0ijtf.mongodb.net/?retryWrites=true&w=majority');
      console.log("run");
  }
  const LogInSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    cpassword:{
      type:String,
      required:true
    },
    expamount:{
        type:Number,
        default:0
      },
    expamount2:{
        type:Number,
        default:0
      },
      date:{
        type:Date
        
      }
    

  })

  const Contactschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Contact:{
      type:String,
      required:true
    },
    Address:{
        type:String,
        required:true
    }
  })
//   const expschema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     },
//     Contact:{
//       type:String,
//       required:true
//     },
//     Address:{
//         type:String,
//         required:true
//     }
//   })

  const collection= new mongoose.model("Collection1",LogInSchema);
  const collection3=new mongoose.model("collection2",Contactschema);
  
  module.exports={collection, collection3};