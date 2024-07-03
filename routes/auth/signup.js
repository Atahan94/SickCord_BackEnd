import { signUpUser } from "../../controller/user";

export default async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("REQ", name, email, password);
    await signUpUser({ name, email, password });
    res.send({ message: "successfully created" });
  } catch (error) {
    console.log("error on the request", error.error.keyPattern)
    res.status(500).json({...error.error.keyPattern, code: error.error.code});
  }
};