import Log from "../models/log.model.js";

const logRequest = async (req, res, next) => {
  res.on("finish", async () => {
    try {
      await Log.create({
        method: req.method,
        route: req.originalUrl,
        status: res.statusCode,
        time: new Date().toLocaleString(), 
      });
    } catch (err) {
      console.error("Log save error:", err.message);
    }
  });

  next();
};

export default logRequest;
