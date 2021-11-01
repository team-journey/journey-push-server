"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alarm_1 = __importDefault(require("../controller/alarm"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    console.log("GET " + req.header("feed-user-id"));
    await alarm_1.default.emoji(req.header("feed-user-id"));
    res.status(200).json({
        "status": 200,
        "message": "success"
    });
});
module.exports = router;
//# sourceMappingURL=emoji.js.map