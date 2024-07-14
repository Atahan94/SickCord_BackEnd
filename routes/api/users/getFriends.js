import { getUser } from "../../../controller/user";

const getFriends =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);
      
      console.log("FRİENDS", user)

      res.status(200).json({res: [...user.friends]});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getFriends;