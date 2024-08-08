import { updateServer } from "../../../../controller/server";

const createChannel =  async (req, res) => {
    try {
      const {id} = req.params
      const {name, type} = req.body
      

     /*  console.log("ID", id, "name and type" , name, type) */
      const channelİnfo = await  updateServer(id, {$push: { channels:{ name, type }}})
      
      res.status(200).json({channelİnfo});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default createChannel;