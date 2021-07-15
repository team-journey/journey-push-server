import express from "express";
import path from "path";
import admin from "firebase-admin";
import schedule from "node-schedule";
import dayjs from "dayjs";
import axios from "axios";
import config from "./config";
import FCM from "fcm-node";

const firebaseAccount = require(path.join(__dirname, "../journey-firebase-admin.json"));

let fcm = new FCM(firebaseAccount);
const priority = 'high';
const time_to_live = 3;
const content_available = true;
const mutable_content = true;
const collapse_key = '';

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseAccount),
// });

const journeyAlarm = schedule.scheduleJob('0 15 03 * * *', async function() {
  let date = new Date();
  console.log(
    `시작 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );

  // 전체 유저의 fcm token 값들을 가져온다.
  console.log(`${config.journeyURL}/api/users`);
  // const registration_ids = await axios.get(`${config.journeyURL}/api/users`);
  const registration_ids = [
    'fZBZtMtjk0pdqiyW-Qln7-:APA91bHFcZinM88tH7GJuMFCDdhKG4Nzd4m0uQNJjvXGQ-d4B6PAbO5X72VxzsEFjcoab8EEgN3CYlV82H58StIjfPdSvFhbO1xYRsnSGB7HHw-Bj4zb44NTxD6tT6b-bx1lKhSLOwG4',
    'e_0GyXigjUp_nEwlqJXf4y:APA91bGBRb9ID8GiBpyf495pg91MGU1vGKKbtLhPxwXXeIAPGh6fbLI0Td1YVLd-9tzBn__ruqGBkG-Kzfqyq9DoiPsgRcDB7JV0ju3Ad1O-02atOCcsHAim-7yt-acsB1Fek5I5DZ1H',
    'ecVV7Tk4DEXvra9nJyre19:APA91bEyokK8ly52zRJe9u5w9ma8Zhtc9uNO-L92ZKgvq2EUBnq9USCjo1r36TXCU8RppgfFbPsB2xoKghMnkThYyRzN1mmv_lYsH5y94yGKK_mGmJKOJRMTvBswN_EEnqVml2m88FZL',
    'ep4RhYrbTHOnhzARWNTSS1:APA91bHKZFvBnREutA-c41Jczt0HO5IBCr0Xs3EZv1EqFRV_ccNlzkClT-ilfOqFMAVNaOPV1iXHB22lxkpvIEcS5n-24-g66ITuwJ5ioZZRmaWyGT7_6bP8eGPNdwvJCpQlYoWZBXGT',
    'd45DgY4-R5O1OF5SSgYss3:APA91bGZuy5Sof-4SVaAaOtPiFcI2G9dVj-4SFeX5JbTQUg9SxXx0b28rErR26xa02VgOIxap44BM6kq4T8TddxljJbTuGroiD2UYXlKse17wqh54D2tyaHf7jhWao2sPTs8RBwkxftn',
    'eH4yZ1YdR0b1hPp1IrLCST:APA91bHLwDpnAti8-Q2sy4bjVmywyhMvLpT8RvDEg3QMgzH1TtARbc350RTbJIKPK5k4MRlp8dLj4Yx-L12BaOHdSgq4QRy4yBc0vaPyYuuMa_6gTP1d6mCqsZGZ5rKPjbf6wmKi8XKb'
  ]
  console.log(registration_ids)
  
  const message = {
    registration_ids:  registration_ids,
    notification: {
      title: '작업하고있니 우리 아기 고양이?',
    },
  };

  fcm.send(message, function(err, response){
    if (err) {
      console.log("FAIL");
      console.error(err.message);
    } else {
      console.log("SUCCESS");
      console.log(response);
    }
  });
  console.log(
    `종료 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );
})
