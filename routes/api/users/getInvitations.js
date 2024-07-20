import { getUser } from "../../../controller/user";
import { getServerById } from "../../../controller/server";

const getInvitations =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);
      
      const userInvitations = [];
      const serverInvitations = [];
  
      user.invitations.forEach(invitation => {
        invitation.type === 'user'? userInvitations.push(invitation) : serverInvitations.push(invitation)
      });
  
      const invitationsResponse = {
        user: userInvitations,
        server: serverInvitations
      };
      
      res.status(200).json(invitationsResponse);
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getInvitations;