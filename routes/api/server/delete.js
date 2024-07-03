import { deleteServer } from "../../../controller/server";
import { deleteUserServer } from "../../../controller/user";

const deleteS =  async (req, res) => {
    try {
      const {id} = req.params
      console.log("REQUEST name", req.session, "serverID", id)
      const {result} = await deleteServer({id});
    
      const updatedUser = await deleteUserServer({ serverId: id}); //FİX THE UPDATEUSER FUNCTİON
      res.status(200).json({received: `received: ${id}` });
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default deleteS;