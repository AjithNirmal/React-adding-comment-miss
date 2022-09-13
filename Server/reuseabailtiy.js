const registerModals = require("./Modals/registerSchema")

const checkmail = async(email)=>{
    let exist = false;
    await registerModals.find({email:email}).then((userdata)=>{
        if(userdata.length)
        {
            exist = true;
        }
    })
    return exist;
}
module.exports = checkmail;