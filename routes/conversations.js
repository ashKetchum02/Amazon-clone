
const router = require("express").Router()
const Conversation = require("../models/Conversation")

router.post("/", async (req, res) => {

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        await newConversation.save();
        res.status(200).json(newConversation);
    } catch(err) {
        res.status(500).json(err)
    } 

})

router.get("/:userId", async (req, res) => {

    try {

        const conversations = await Conversation.find({members: {$in: req.params.userId}});

        res.status(200).json(conversations);

    } catch(err) {
        res.status(500).json(err)
    }

})



module.exports = router;