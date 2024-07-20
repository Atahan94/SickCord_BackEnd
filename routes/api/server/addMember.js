import { getServerById } from "../../../controller/server";
import { getUser, updateUser } from "../../../controller/user";

const addMember =  async (req, res) => {
    try {
      const {id, memberName} = req.params; // CREATE END POİNT WHERE İT RETURN ALL MEMBERS OF SERVER OF GIVEN ID ON PARAMS
      
      console.log("serverID:", id ,"memberID", memberName)

      const server = await getServerById(id);
      const member = await getUser(memberName);

      const alreadyMember = server.members.includes(member._id);

      if (alreadyMember) {
        throw new Error("Already member");
      }

     
      await updateUser(member._id, {$push: { invitations:{ type: 'server', name: server.name, referenceId: server._id }}})
      
      res.status(200).json({res: "successfully add a member"});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error.message});
    }
  };

  export default addMember;