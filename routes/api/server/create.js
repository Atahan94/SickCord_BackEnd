import { createServer } from "../../../controller/server";
import { updateUser } from "../../../controller/user";

const create =  async (req, res) => {
    try {
      const {name} = req.body
      const image = req.file;
      
      const {serverID} = await createServer({name, owner: req.session.user.id, image});
      
      const updatedUser = await updateUser(req.session.user.id, { $push: { servers: serverID } }); //FİX THE UPDATEUSER FUNCTİON
      res.status(200).json({updatedUser});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default create;