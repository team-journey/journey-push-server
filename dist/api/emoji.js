"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alarm_1 = __importDefault(require("../controller/alarm"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    await alarm_1.default.emoji(req.header("feed-user-id"));
});
module.exports = router;
//# sourceMappingURL=emoji.js.map