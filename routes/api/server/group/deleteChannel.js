import { updateServer } from "../../../../controller/server";

const deleteChannel =  async (req, res) => {
    try {
      const {id, groupID, channelID} = req.params
      
      
     /*  console.log("SERVERID", id, "GROUPID", groupID, "CHANNELID", channelID); */
      const contents = {
        $pull: {
          "groups.$[group].channels": { _id: channelID }
        }
      };

      const options = {
        arrayFilters: [
          { "group._id": groupID },  // Targeting the group by its ID
        ]
      };

      const groupInfo = await updateServer(
        id,
        contents,
        options
      );
  
      
      res.status(200).json({groupInfo}); 
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default deleteChannel;