import { updateServer } from "../../../../controller/server";

const editChannel =  async (req, res) => {
    try {
      const {id, channelID} = req.params
      const {name, type} = req.body
      

      /* console.log("ID", id, "name and type" , name, type) */
      const channelİnfo = await updateServer( id, { $set: { "channels.$[elem].name": name, "channels.$[elem].type": type } }, { arrayFilters: [{ "elem._id": channelID }] } );
      
      res.status(200).json({channelİnfo});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default editChannel;