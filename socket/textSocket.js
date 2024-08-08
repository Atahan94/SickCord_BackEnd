import { Server } from "socket.io";
import { getServerById } from "../controller/server";
import { getUser } from "../controller/user";

export function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
    },
  });

  io.on("connection", async (socket) => {
    const username = socket.handshake.query.name;
    console.log("A user connected:", username);
    
    let channel, group, server;
    // Handle joining a channel
    socket.on("joinServerChannel", async (data) => {
      try {
        /* console.log("CHANNEL DATA", data) */
         server = await getServerById(data.serverId);
        if(data.groupId)
        {
          group = server.groups.find((el) => el._id.toString() === data.groupId)
          channel = group.channels.find((el) => el._id.toString() === data.channelId);
        }
        else
        {
         channel = server.channels.find((el) => el._id.toString() === data.channelId);
        }
        /* console.log("joinServerChannel", data, "server", server, "channel", channel); */
        socket.join(channel._id.toString());
        socket.emit("getAllMessages", channel.messages)
      } catch (error) {
        console.error(error);
        socket.emit("error", "An error occurred while joining the channel");
      }
    });
     
      socket.on("serverMessage", async (data) =>{
          try {
            console.log("ServerMessage", data)
            const { message, hash } = data;
            const messageObj = { userId: user._id , text: message, hash}
            channel.messages.push(messageObj);
            await server.save();
            io.to(channel._id.toString()).emit("receiveMessage", messageObj);
          } catch (error) {
            console.error(error);
            socket.emit("error", "An error occurred while joining the private chat");
          }
        })

     let chat, user, withUser, withChat
    socket.on("joinPrivateChat", async (data) => {
      try {
        user = await getUser(username);
        withUser = await getUser(data.name);
        chat = user.privateChats.find((el) => el._id.toString() === data._id);
        withChat = withUser.privateChats.find((el) => el._id.toString() === data._id);
        console.log("joinPrivateChat", data, "chat", chat, "user", user);
        socket.join(chat._id.toString());
        socket.emit("getAllMessages", chat.messages)
      } catch (error) {
        console.error(error);
        socket.emit("error", "An error occurred while joining the private chat");
      }
    });
   
    socket.on("privateMessage", async (data) => {
      try {
        const { message, hash } = data;
        const messageObj = { userId: user._id , text: message, hash}
        chat.messages.push(messageObj)
        withChat.messages.push(messageObj)
        await user.save()
        await withUser.save()
        io.to(chat._id.toString()).emit("receiveMessage", messageObj);
        console.log("privateMessage", data);
      } catch (error) {
        console.error(error);
        socket.emit("error", "An error occurred while joining the private chat");
      }
    });
    


    socket.on('joinVoiceChannel', (roomId) => {
      socket.join(roomId);
      console.log(`${username} joined room: ${roomId}`);
    });
  
    socket.on('signal', (data) => {
      io.to(data.roomId).emit('signal', data);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
    


    socket.on("disconnect", () => {
      console.log("A user disconnected:", username);
    });
  });
}

export default setupSocketIO;
