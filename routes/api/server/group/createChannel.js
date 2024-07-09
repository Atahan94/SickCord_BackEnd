import { updateServer } from "../../../../controller/server";

const createChannel =  async (req, res) => {
    try {
      const {id, groupID} = req.params
      const {name, type} = req.body
      
      
      const contents = {
        $push: {
          "groups.$[group].channels": { name, type }
        }
      };

      const options = {
        arrayFilters: [{ "group._id": groupID }]  // Targeting the group by its ID
      };

      const groupInfo = await updateServer({
        id,
        contents,
        options
      });
  
      
      res.status(200).json({groupInfo}); 
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default createChannel;