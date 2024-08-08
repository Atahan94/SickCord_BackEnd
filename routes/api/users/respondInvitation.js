import { getServerById, updateServer } from "../../../controller/server";
import { getUser, updateUser } from "../../../controller/user";


const respondInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { accept, type, name } = req.body;

    const user = await getUser(req.session.user.name);
    
 if(accept){
  if(type === "user"){
      const friend = await getUser(name);

      await updateUser(user._id, {
        $push: {
          friends: friend._id,
        },
      });

      await updateUser(friend._id, {
        $push: {
          friends: user._id,
        },
      });
  }
  else {
    const invitation = user.invitations.find(inv => inv._id.toString() === id.toString())
    const server = await getServerById(invitation.referenceId)

    await updateServer(server._id, {$push: { members: user._id }})
    await updateUser(user._id, {$push: { servers: server._id }})
   
  }}



    await updateUser(user._id, {
      $pull: {
        invitations: { _id: id },
      },
    });

    /* console.log("RespondInvitation", id, accept, type, name); */
    
    res.status(200).json({ message: 'Invitation responded successfully' });
    return Promise.resolve();
  } catch (error) {
    console.log("error on the request", error);
    res.status(500).json({ code: error });
  }
};

export default respondInvitation;
