
const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];
let executives = [];

let usersForVideoCalls = [];
let executivesForVideoCalls = [];
let currentCalls = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId == userId) && users.push({userId, socketId})
}

const addUserForVideoCall = (userId, socketId) => {
    !usersForVideoCalls.some(user => user.userId == userId) && usersForVideoCalls.push({userId, socketId})
}

const addExecutive = (userId, socketId) => {
    !executives.some(user => user.userId == userId) && executives.push({userId, socketId})
}

const getFreeExecutives = async () => {
    return executivesForVideoCalls.filter(executive => executive.free == 1)
}

const addExecutiveForVideoCall = (userId, socketId) => {
    !executivesForVideoCalls.some(user => user.userId == userId) && executivesForVideoCalls.push({userId, socketId, free: 1})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const removeExecutive = (socketId) => {
    executives = executives.filter(user => user.socketId !== socketId)
}

const removeUserForVideoCall = (socketId) => {
    usersForVideoCalls = usersForVideoCalls.filter(user => user.socketId !== socketId)
}
const removeExecutiveForVideoCall = (socketId) => {
    executivesForVideoCalls = executivesForVideoCalls.filter(user => user.socketId !== socketId)
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

const removeCurrentCalls = (socketId) => {
    currentCalls.filter(currentCall => !currentCall.user == socketId && !currentCall.executive == socketId)
    for (var i = 0; i < executivesForVideoCalls; i++) {
        if (executivesForVideoCalls[i].socketId == socketId) {
            executivesForVideoCalls[i].free = 1;
            break;
        }
    }
}

io.on("connection", (socket) => {
    // console.log("A user connected");

    // take user id and socket id from user

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getExecutives", executives)
    })

    socket.on("addUserForVideoCall", (userId) => {
        addUserForVideoCall(userId, socket.id)
        socket.emit("yourID", socket.id);
    })

    socket.on("addExecutive", (userId) => {
        addExecutive(userId, socket.id)
        io.emit("getExecutives", executives)
    })

    socket.on("addExecutiveForVideoCall", (userId) => {
        addExecutiveForVideoCall(userId, socket.id)
    })

    socket.on("sendNewConversation", async (req) => {
        const user = await getUser(req.receiverId); 

        io.to(user?.socketId).emit("newConversation", {
            conversation: req.conversation
        })
    })

    socket.on("getFreeExecutives", async (userId) => {
        const freeExecutives = await getFreeExecutives()
        console.log(freeExecutives)
        io.emit("getExecutivesForVideoCall", freeExecutives)
    })


    socket.on("disconnect", () => {
        removeUser(socket.id)
        removeExecutive(socket.id)
        removeUserForVideoCall(socket.id)
        removeExecutiveForVideoCall(socket.id)
        removeCurrentCalls(socket.id)
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

    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        currentCalls.push({user: socket.id, executive: data.userToCall})
        for (var i = 0; i < executivesForVideoCalls; i++) {
            if (executivesForVideoCalls[i].socketId == data.userToCall) {
                executivesForVideoCalls[i].free = 0;
                break;
            }
        }
        console.log("hi")
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })

})