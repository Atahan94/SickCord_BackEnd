import { getUser } from "../../../controller/user";

const getFriends =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);
      
      await user.populate('friends').execPopulate();

      let friends = user.friends.map((el) => { return {id: el._id, name: el.name}})

      /* console.log("FRİENDS Populated Mapped", friends) */

      res.status(200).json({res: [...friends]});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getFriends;