import { getUser } from "../../../controller/user";

const getAllServers =  async (req, res) => {
    try {
      const user = await getUser(req.session.user.name);

      await user.populate('servers').execPopulate();

      const serversWithImages = user.servers.map(server => {
        const base64Image = server.image.data.toString('base64');
        return {
          ...server.toObject(),  // Ensure only the necessary data is included
          image: `data:${server.image.contentType};base64,${base64Image}`
        };
      });

     /*  console.log("GETTİNG ALL SERVERS",  serversWithImages) */

      res.status(200).json({res: serversWithImages});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default getAllServers;