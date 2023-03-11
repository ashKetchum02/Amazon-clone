
const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];
let executives = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId == userId) && users.push({userId, socketId})
}

const addExecutive = (userId, socketId) => {
    !executives.some(user => user.userId == userId) && executives.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const removeExecutive = (socketId) => {
    executives = executives.filter(user => user.socketId !== socketId)
}

const getUser = async (userId) => {
    const user = await users.find(user => user.userId === userId)
    if (user) {
        return user
    } else {
        return await executives.find(user => user.userId === userId)
    }
    // console.log(users)
    
}

io.on("connection", (socket) => {
    console.log("A user connected");

    // take user id and socket id from user

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getExecutives", executives)
    })

    socket.on("addExecutive", (userId) => {
        addExecutive(userId, socket.id)
    })

    socket.on("sendNewConversation", async (req) => {
        const user = await getUser(req.receiverId); 

        io.to(user?.socketId).emit("newConversation", {
            conversation: req.conversation
        })
    })


    socket.on("disconnect", () => {
        console.log("A user disconnected")
        removeUser(socket.id)
        removeExecutive(socket.id)
        io.emit("getExecutives", executives)
    })

    // send and get a message
    socket.on("sendMessage", async ({senderId, receiverId, text}) => {

        const user = await getUser(receiverId); 

        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        })
    });
})