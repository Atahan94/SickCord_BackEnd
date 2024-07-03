import { getToken } from "../../controller/user";

export default async (req, res) => {
  try {
    if(req.session.user)
    {const token = await getToken(req.session.user.name)
    console.log("REQUESTED TOKEN",token, "SESSİON", req.session);
    res.status(200).json({ token });}
    else {
      throw new Error("There is no session");
    }
  } catch (error) {
    console.log("error on the request", error)
    res.status(500).json({error: "There is no session" });
  }
};