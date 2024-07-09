import { updateServer } from "../../../../controller/server";

const deleteGroup =  async (req, res) => {
    try {
      const {id, groupID} = req.params
      
      const groupInfo = await  updateServer({id, contents:{
        $pull: {
          groups: { _id: groupID }
        }
      }})
      
      res.status(200).json({groupInfo});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default deleteGroup;