import express from "express";
import alarm from '../controller/alarm';

const router = express.Router();

router.get("/", async (req, res) => {
  await alarm.emoji(req.header("feed-user-id"));
});

module.exports = router;