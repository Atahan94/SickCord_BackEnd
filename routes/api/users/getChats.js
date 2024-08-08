import {getUser, getUserById} from "../../../controller/user";

const getChat =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);

      let chats = [...user.privateChats];

     /*  console.log("CHATS", chats); */
      
      const populatedChats = await Promise.all(chats.map(async (chat) => {
        const withUser = await getUserById(chat.with); // Kullanıcıyı ID ile al
        return {
          id: chat._id,
          with: {
            _id: withUser._id,
            name: withUser.name,
            mutualFriends: withUser.friends.filter(friendId => user.friends.includes(friendId)),
            mutualServers: withUser.servers.filter(serverId => user.servers.includes(serverId)),
            createdAt: withUser.createdAt,
          },
          messages: [...chat.messages]
        };
      }));

      /* console.log("CHATS POPULATED", populatedChats); */
      
      
      res.status(200).json({ res: populatedChats});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getChat;