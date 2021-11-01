import express from "express";
import alarm from '../controller/alarm';

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("GET " + req.header("feed-user-id"));
  await alarm.emoji(req.header("feed-user-id"));
  res.status(200).json({
    "status": 200,
    "message": "success"
  });
});

module.exports = router;