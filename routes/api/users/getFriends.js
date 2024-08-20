import { getUser } from "../../../controller/user";
import redisClient from "../../../redis/redis-client";

const getFriends =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);
      console.log("CHECK SESSİON FRİENDS", req.session.user.name);

      await user.populate('friends').execPopulate();

      let onlineFriends = [];
      let friends = []
      redisClient.smembers('onlineUsers', (err, users) => {//DİVİDE USERS İNTO ONLİNE AND OFFLİNE
        if (err) {
            console.error('Redis error:', err);
            return callback(err);
        }
        /* console.log("onlineUsers",users) */ // users is the array of online users
        user.friends.forEach((el) => {
          const base64Image = el.image.data.toString('base64');
          const objToPass = {
            id: el._id,
            name: el.name,
            image: `data:${el.image.contentType};base64,${base64Image}`
          }
          friends.push(objToPass)
          if(users.includes(el.name))
          {
            onlineFriends.push(objToPass)
          }
        })
        res.status(200).json({res:{online: onlineFriends, all: [...friends]}});
    });

      /* console.log("FRİENDS Populated Mapped", friends) */

     // res.status(200).json({res: [...friends]});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getFriends;