import { updateServer } from "../../../../controller/server";

const deleteChannel =  async (req, res) => {
    try {
      const {id, channelID} = req.params
      console.log("REQUEST name", req.session, "serverID", id)
      
      await  updateServer(id, { $pull: { channels: { _id: channelID } } })
      
      res.status(200).json({ message: "Channel deleted successfully" });
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default deleteChannel;