import { getServerById } from "../../../controller/server";
import redisClient from "../../../redis/redis-client";

const getAllMembers =  async (req, res) => {
    try {
      const {id} = req.params; // CREATE END POİNT WHERE İT RETURN ALL MEMBERS OF SERVER OF GIVEN ID ON PARAMS

      const server = await getServerById(id);

      const populatedServer = await server.populate("members").execPopulate();
      
      let members = populatedServer.members.map((el) => {
        return{
          id: el._id,
          name: el.name
        }
      })
      redisClient.smembers('onlineUsers', (err, users) => {//DİVİDE USERS İNTO ONLİNE AND OFFLİNE
        if (err) {
            console.error('Redis error:', err);
            return callback(err);
        }
        console.log("onlineUsers",users) // users is the array of online users
    });
     
      res.status(200).json({res: members});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getAllMembers;