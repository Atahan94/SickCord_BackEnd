import { Server } from "socket.io";
import { getServerById } from "../controller/server";
import { getUser } from "../controller/user";
import redisClient from "../redis/redis-client";

export function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
    },
  });

  io.on("connection", async (socket) => {
    const username = socket.handshake.query.name;
    console.log("A user connected:", username);
    redisClient.sadd('onlineUsers', username);

    let channel, group, server,user;
    // Handle joining a channel
    socket.on("joinServerChannel", async (data) => {
      try {
        user = await getUser(username);
        server = await getServerById(data.serverId);
        if (data.groupId) {
          group = server.groups.find(
            (el) => el._id.toString() === data.groupId
          );
          channel = group.channels.find(
            (el) => el._id.toString() === data.channelId
          );
        } else {
          channel = server.channels.find(
            (el) => el._id.toString() === data.channelId
          );
        }
        /* console.log("joinServerChannel", data, "server", server, "channel", channel); */
        socket.join(channel._id.toString());
        socket.emit("getAllMessages", channel.messages);
      } catch (error) {
        console.error(error);
        socket.emit("error", "An error occurred while joining the channel");
      }
    });

    socket.on("serverMessage", async (data) => {
      try {
        console.log("ServerMessage", data, user);
        const { message, hash } = data;
        const messageObj = { userId: user._id, text: message, hash };
        channel.messages.push(messageObj);
        await server.save();
        io.to(channel._id.toString()).emit("receiveMessage", messageObj);
      } catch (error) {
        console.error(error);
        socket.emit(
          "error",
          "An error occurred while joining the private chat"
        );
      }
    });

    let chat, withUser, withChat;
    socket.on("joinPrivateChat", async (data) => {
      try {
        user = await getUser(username);
        withUser = await getUser(data.name);
        chat = user.privateChats.find((el) => el._id.toString() === data._id);
        withChat = withUser.privateChats.find(
          (el) => el._id.toString() === data._id
        );
        console.log("joinPrivateChat", data, "chat", chat, "user", user);
        socket.join(chat._id.toString());
        socket.emit("getAllMessages", chat.messages);
      } catch (error) {
        console.error(error);
        socket.emit(
          "error",
          "An error occurred while joining the private chat"
        );
      }
    });

    socket.on("privateMessage", async (data) => {
      try {
        const { message, hash } = data;
        const messageObj = { userId: user._id, text: message, hash };
        chat.messages.push(messageObj);
        withChat.messages.push(messageObj);
        await user.save();
        await withUser.save();
        io.to(chat._id.toString()).emit("receiveMessage", messageObj);
        console.log("privateMessage", data);
      } catch (error) {
        console.error(error);
        socket.emit(
          "error",
          "An error occurred while joining the private chat"
        );
      }
    });

    let room;
    socket.on("JoinVoiceChannel", (data) => {
      room = data.id;
      socket.join(room);
      redisClient.sadd(room, username);
      redisClient.smembers(room, (err, members) => {
        console.log("members", members);
        io.to(room).emit("updateMembers", members);
      });
      console.log(username, "Joined voiceChannel with ID:", room);
    });

    

    socket.on("audio", (data) => {
      socket.broadcast.to(room).emit("audio1", data);
    });

    socket.on("disconnectRoom", () => {
      redisClient.srem(room, username);
      redisClient.smembers(room, (err, members) => {
        console.log("members leave", members);
        io.to(room).emit("updateMembers", members);
        socket.leave(room);
      });

      console.log(username, "Left voiceChannel with ID:", room);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", username);
      redisClient.srem('onlineUsers', username);
    });
  });
}

export default setupSocketIO;
