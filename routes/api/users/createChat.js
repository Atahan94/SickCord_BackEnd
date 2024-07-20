import { updateUser, getUser } from "../../../controller/user";

const createChat =  async (req, res) => {
    try {
      const {id} = req.params

      const user = await getUser(req.session.user.name); // Assuming getUser is a function to fetch user data
    
      const existingChat = user.privateChats.find(chat => { return chat.with.toString() === id.toString()});
      console.log("EEEEEexistingChat", existingChat)
    
    if (existingChat) {
      return res.status(400).json({ res: "Chat already exists between these users" });
    }
      
   // İMPLEMENT CHAT APİS AND İT'S FRONTEND THEN İMPLEMENT MESSEAGES AND VOİCE CHAT WİTH WEB SOCKET
      
       await updateUser( req.session.user.id ,{$push: { privateChats:{ with: id, messages: [] }}})
      
      res.status(200).json({ res: "chat created sucessfully"});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default createChat;