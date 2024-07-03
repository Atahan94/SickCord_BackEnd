import { getUser } from "../../../controller/user";

const getAllServers =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);

      await user.populate('servers').execPopulate();

      console.log("user", user)

      res.status(200).json({res: [...user.servers]});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getAllServers;