import { createServer } from "../../../controller/server";
import { updateUser } from "../../../controller/user";

const create =  async (req, res) => {
    try {
      const {name} = req.body
      console.log("REQUEST name", req.session)
      const {serverID} = await createServer({name, owner: req.session.user.id});
      console.log("NAME",serverID)
      const updatedUser = await updateUser({ server: serverID}, req.session.user.id); //FİX THE UPDATEUSER FUNCTİON
      res.status(200).json({updatedUser});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default create;