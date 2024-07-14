import { updateUser, getUser } from "../../../controller/user";


const addFriends =  async (req, res) => {
    try {
      const {name , type} = req.body

      if(name === req.session.user.name){
        throw new Error("you cannot send yourself an invitation")
      }

      const user = await getUser(name);
      
      if (!user) {
        throw new Error("user doens't exists")
      }

      const existingInvitation = user.invitations.find(
        (invitation) => invitation.name === req.session.user.name && invitation.type === type
      );

      if (existingInvitation) {
        throw new Error("already have an invitation")
      }

      await updateUser(user._id, { $push: { invitations: {name: req.session.user.name, type: type} } })
  
      res.status(200).json({res: "sucessfully send invitation"});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error.message)
      res.status(500).json({code: error.message});
    }
  };

  export default addFriends;