import { getToken } from "../../controller/user";

export default async (req, res) => {
  try {
    const token = await getToken(req.session.user.name)
    res.status(200).json({ token });
  } catch (error) {
    console.log("error on the request", error.message)
    res.status(500).json({error: "There is no session" });
  }
};