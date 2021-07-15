"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = __importDefault(require("./config"));
const fcm_node_1 = __importDefault(require("fcm-node"));
const firebaseAccount = require(path_1.default.join(__dirname, "../journey-firebase-admin.json"));
let fcm = new fcm_node_1.default(firebaseAccount);
const priority = 'high';
const time_to_live = 3;
const content_available = true;
const mutable_content = true;
const collapse_key = '';
// admin.initializeApp({
//   credential: admin.credential.cert(firebaseAccount),
// });
const journeyAlarm = node_schedule_1.default.scheduleJob('0 10 03 * * *', async function () {
    let date = new Date();
    console.log(`시작 시각 ${dayjs_1.default(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
    // 전체 유저의 fcm token 값들을 가져온다.
    console.log(`${config_1.default.journeyURL}/api/users`);
    // const registration_ids = await axios.get(`${config.journeyURL}/api/users`);
    const registration_ids = [
        'fZBZtMtjk0pdqiyW-Qln7-:APA91bHFcZinM88tH7GJuMFCDdhKG4Nzd4m0uQNJjvXGQ-d4B6PAbO5X72VxzsEFjcoab8EEgN3CYlV82H58StIjfPdSvFhbO1xYRsnSGB7HHw-Bj4zb44NTxD6tT6b-bx1lKhSLOwG4',
        'e_0GyXigjUp_nEwlqJXf4y:APA91bGBRb9ID8GiBpyf495pg91MGU1vGKKbtLhPxwXXeIAPGh6fbLI0Td1YVLd-9tzBn__ruqGBkG-Kzfqyq9DoiPsgRcDB7JV0ju3Ad1O-02atOCcsHAim-7yt-acsB1Fek5I5DZ1H',
        'ecVV7Tk4DEXvra9nJyre19:APA91bEyokK8ly52zRJe9u5w9ma8Zhtc9uNO-L92ZKgvq2EUBnq9USCjo1r36TXCU8RppgfFbPsB2xoKghMnkThYyRzN1mmv_lYsH5y94yGKK_mGmJKOJRMTvBswN_EEnqVml2m88FZL',
    ];
    console.log(registration_ids);
    const message = {
        registration_ids: registration_ids,
        notification: {
            title: '작업하고있니 우리 아기 고양이?',
        },
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("FAIL");
            console.error(err.message);
        }
        else {
            console.log("SUCCESS");
            console.log(response);
        }
    });
    console.log(`종료 시각 ${dayjs_1.default(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD hh:mm:ss')} 입니다.`);
});
//# sourceMappingURL=index.js.map
