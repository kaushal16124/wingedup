import express from "express";
import { Payment } from "../models/paymentModel.js";
const router = express.Router();

// router.post('/createblog', async (req, res) => {
//     let success = false;
//     try {

//         let blog = await Blogs.create({
//             title: req.body.title,
//             description: req.body.description,
//             author: req.body.author,
//             images: req.body.images,
//             videos: req.body.videos
//         })
//         success = true;
//         res.json({ success, blog });

//     } catch (error) {

//         console.error(error.message)
//         res.status(500).json({ success, msg: error.message })
//     }
// })

router.get('/fetchallorders', async (req, res) => {

    try {
        const payment = await Payment.find();
        res.json(payment);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

})


// router.put('/updateblog/:id', async (req, res) => {
//     let success = false;

//     const { title, description, author, images, videos } = req.body;
//     try {
//         //Create a new blog object
//         const newBlog = {};
//         if (title) { newBlog.title = title };
//         if (description) { newBlog.description = description };
//         if (author) { newBlog.author = author };
//         if (images) { newBlog.images = images };
//         if (videos) { newBlog.videos = videos };

//         //Check if it's the same user and fetch/update the note
//         let blog = await Blogs.findById(req.params.id);
//         if (!blog) {
//             return res.status(404).send("Not found")
//         }



//         blog = await Blogs.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
//         success = true;
//         res.json({ success, blog });
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ success, msg: error.message })
//     }
// })



// router.delete('/deleteblog/:id', async (req, res) => {
//     let success=false;
//     try {
//         let blog = await Blogs.findById(req.params.id);
//         if (!blog) { return res.status(404).send("Not Found") }

//         blog = await Blogs.findByIdAndDelete(req.params.id)
//         success=true;
//         res.json({ success, blog });
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ success, msg: error.message })
//     }

// })


export default router;