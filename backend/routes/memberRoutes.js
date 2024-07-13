import express from "express";
import { Member } from "../models/memberModel.js";
const router = express.Router();

router.post('/createmember', async (req, res) => {
    let success = false;
    try {

        let member = await Member.create({
            name: req.body.name,
            age: req.body.age,
            exp: req.body.exp,
            desc: req.body.desc,
            profilePicUrl: req.body.profilePicUrl,
            instaUrl: req.body.instaUrl,
            whatsAppUrl: req.body.whatsAppUrl,
            facebookUrl: req.body.facebookUrl

        })
        success = true;
        res.json({ success, member });

    } catch (error) {

        console.error(error.message)
        res.status(500).json({ success, msg: error.message })
    }
})

router.get('/fetchallmembers', async (req, res) => {

    try {
        const member = await Member.find();
        res.json(member);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

})


router.put('/updatemember/:id', async (req, res) => {
    let success = false;

    const { name, age, exp, desc, profilePicUrl, instaUrl, whatsAppUrl, facebookUrl } = req.body;
    try {
        //Create a new note object
        const newMember = {};
        if (name) { newMember.name = name };
        if (age) { newMember.age = age };
        if (exp) { newMember.exp = exp };
        if (desc) { newMember.desc = desc };
        if (profilePicUrl) { newMember.profilePicUrl = profilePicUrl };
        if (instaUrl) { newMember.instaUrl = instaUrl };
        if (whatsAppUrl) { newMember.whatsAppUrl = whatsAppUrl };
        if (facebookUrl) { newMember.facebookUrl = facebookUrl };

        //Check if it's the same user and fetch/update the note
        let member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).send("Not found")
        }



        member = await Member.findByIdAndUpdate(req.params.id, { $set: newMember }, { new: true })
        success = true;
        res.json({ success, member });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success, msg: error.message })
    }
})



router.delete('/deletemember/:id', async (req, res) => {
    let success=false;
    try {
        let member = await Member.findById(req.params.id);
        if (!member) { return res.status(404).send("Not Found") }

        member = await Member.findByIdAndDelete(req.params.id)
        success=true;
        res.json({ success, member });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success, msg: error.message })
    }

})


export default router;