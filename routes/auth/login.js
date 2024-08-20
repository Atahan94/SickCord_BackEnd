import { loginUser } from "../../controller/user";

const login =  async (req, res) => {
    try {
      const {email, password} = req.body
      const {user, token} = await loginUser({email, password});
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      console.log("USER", req.session.user, "TOKEN", token)
      res.status(200).json({token, user});
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default login;