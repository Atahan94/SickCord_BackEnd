import Server from "../models/Server";

export const createServer = async ({ name, owner}) => {
    try {
      console.log("NAME SERVER", name)
      const server = await Server.create({name, owner,  members: [owner]  });

      return Promise.resolve({
        serverID: server._id,
      });
    } catch (error) {
      return Promise.reject({ error });
    }
  };


  export const deleteServer = async ({id}) => {
  try {
    await Server.findByIdAndDelete(id);

    return Promise.resolve({
      result: "sucessfully deleted",
    });
  } catch (error) {
    return Promise.reject({ error });
  }
 }
  export const updateServer = async (id, contents, options ={}) => {
  try {
   
    await Server.findByIdAndUpdate(
      id, // id of the User to update
      contents , // push the new server id to the servers array
      { ...options}
    );

    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
 }

 export const getServerById = (id) => Server.findById(id);


 
  