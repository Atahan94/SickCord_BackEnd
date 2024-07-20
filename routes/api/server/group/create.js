import { updateServer } from "../../../../controller/server";

const createGroup =  async (req, res) => {
    try {
      const {id} = req.params
      const {name} = req.body
      
      const groupInfo = await  updateServer(id, {$push: { groups:{ name, channels: [] }}})
      
      res.status(200).json({groupInfo});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default createGroup;