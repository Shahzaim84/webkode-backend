import jwt from "jsonwebtoken";

const generateToken = (user) => {
  try {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "7d" });
    return token; 
  } catch (error) {
    console.error("Error while generating token:", error);
  }
};

export default generateToken;
