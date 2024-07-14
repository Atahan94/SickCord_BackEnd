import { removeToken } from "../../controller/user";

const logOut =  async (req, res) => {
    try {
      await removeToken(req.session.user.name)
      req.session.destroy((err) => {
        if (err) {
          console.log('Error destroying session:', err);
          return res.status(500).json({ error: 'Failed to log out' });
        }
    
        // Clear the session cookie
        res.clearCookie('sessId');
    
        res.status(200).json({ message: 'Logged out successfully' });
      });
      return Promise.resolve();
    } catch (error) {
      console.log("error on the request", error)
      res.status(500).json({code: error});
    }
  };

  export default logOut;