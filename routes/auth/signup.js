import { signUpUser } from "../../controller/user";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file;
    console.log("İMAGE", image)

    await signUpUser({ name, email, password, image });
    res.send({ message: "successfully created" });
  } catch (error) {
    console.log("error on the request", error.error.keyPattern)
    res.status(500).json({...error.error.keyPattern, code: error.error.code});
  }
};

export default signup;