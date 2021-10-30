"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const alarm_1 = __importDefault(require("./controller/alarm"));
const dayjs_1 = __importDefault(require("dayjs"));
//시퀄라이즈
models_1.default.authenticate()
    .then(() => {
    console.log('DB Connected.');
}).catch((err) => {
    console.error(err);
});
let ex = new Date();
console.log('서버시간: ' + ex);
const morning = node_schedule_1.default.scheduleJob('0 55 13 * * *', async function () {
    let date = new Date();
    console.log(`시작 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
    await alarm_1.default.morning();
    console.log(`종료 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
});
const evening = node_schedule_1.default.scheduleJob('0 56 13 * * *', async function () {
    let date = new Date();
    console.log(`시작 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
    await alarm_1.default.evening();
    console.log(`종료 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
});
//# sourceMappingURL=index.js.map