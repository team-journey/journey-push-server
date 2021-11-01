import sequelize from './models';
import schedule from "node-schedule";
import alarm from './controller/alarm';
import dayjs from "dayjs";
import course from './controller/course';
import express from "express";

const app = express();

//시퀄라이즈
sequelize.authenticate()
    .then(() => {
        console.log('DB Connected.');
    }).catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use("/", require("./api/emoji"));

let ex = new Date();
console.log('서버시간: ' + ex);

const morning = schedule.scheduleJob('0 0 1 * * *', async function () {
  let date = new Date();
  console.log(
    `시작 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );

  await alarm.morning();

  console.log(
    `종료 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );
});

const evening = schedule.scheduleJob('0 0 11 * * *', async function () {
  let date = new Date();
  console.log(
    `시작 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );

  await alarm.evening();

  console.log(
    `종료 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );
});

const init = schedule.scheduleJob('0 0 20 * * *', async function () {
  let date = new Date();
  console.log(
    `시작 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );

  await course.init();

  console.log(
    `종료 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );
})
