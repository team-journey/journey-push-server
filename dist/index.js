"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const alarm_1 = __importDefault(require("./controller/alarm"));
const dayjs_1 = __importDefault(require("dayjs"));
const course_1 = __importDefault(require("./controller/course"));
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const app = (0, express_1.default)();
//시퀄라이즈
models_1.default.authenticate()
    .then(() => {
    console.log('DB Connected.');
}).catch((err) => {
    console.error(err);
});
app.use(express_1.default.json());
app.use("/api/emoji", require("./api/emoji"));
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
    res.render("error");
});
app
    .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
})
    .on("error", (err) => {
    console.error(err);
    process.exit(1);
});
let ex = (0, moment_1.default)().format();
console.log('서버시간: ' + ex);
let change = (0, moment_1.default)().add(9, 'hours').format();
console.log('대한민국 시간: ' + change);
change = (0, moment_1.default)().add(18, 'hours').format();
console.log('대한민국 시간2: ' + change);
alarm_1.default.testing();
const morning = node_schedule_1.default.scheduleJob('0 0 1 * * *', async function () {
    let date = new Date();
    console.log(`시작 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
    await alarm_1.default.morning();
    console.log(`종료 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
});
const evening = node_schedule_1.default.scheduleJob('0 0 11 * * *', async function () {
    let date = new Date();
    console.log(`시작 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
    await alarm_1.default.evening();
    console.log(`종료 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
});
const init = node_schedule_1.default.scheduleJob('0 0 20 * * *', async function () {
    let date = new Date();
    console.log(`시작 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
    await course_1.default.init();
    console.log(`종료 시각 ${(0, dayjs_1.default)(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
});
//# sourceMappingURL=index.js.map