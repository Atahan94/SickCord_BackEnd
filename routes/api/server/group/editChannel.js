import { updateServer } from "../../../../controller/server";

const editChannel =  async (req, res) => {
    try {
      const {id, groupID, channelID} = req.params
      const {name, type} = req.body
      
      console.log("SERVERID", id, "GROUPID", groupID, "CHANNELID", channelID);
      const contents = {
        $set: {
          "groups.$[group].channels.$[channel].name": name,
          "groups.$[group].channels.$[channel].type": type
        }
      };

      const options = {
        arrayFilters: [
          { "group._id": groupID },  // Targeting the group by its ID
          { "channel._id": channelID }  // Targeting the channel by its ID
        ]
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

  export default editChannel;