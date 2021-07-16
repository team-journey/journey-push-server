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
const journeyMent = [
  '잘 잤어? 나의 아기 고양이?',
  '오늘 당신의 하루가 기대되지 않아?',
  '아침은 꼭 챙겨먹고 하루를 시작하길 바라',
  '오늘 컨디션은 어때?',
  '오늘 기분은 어때?',
  '오늘도 하루를 시작해보지 않겠어?'
];

const journeyAlarm = schedule.scheduleJob('0 */1 * * * *', async function() {
  let date = new Date();
  console.log(
    `시작 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );

  let randomMent = pickRandom(journeyMent);
  console.log('멘트: ', randomMent);

  // 전체 유저의 fcm token 값들을 가져온다.
  console.log(`${config.journeyURL}/api/users`);
  // const registration_ids = await axios.get(`${config.journeyURL}/api/users`);
  const registration_ids = [
    'cJ6mDN_UgEkhuUQA3oFHIh:APA91bFT5aQlSorSHspFrVEtPddePoFlwtiNgc_g_l7JR0DVnGADMyLhyjgQa9E7Twh4RfPdLOODbOn_2hqgLZrcZns2O4nKrnESCTICZaFZM-WBv4fDA-2WoBA4otm-9Y68rbdoRlBr'
  ]
  console.log(registration_ids)
  
  const message = {
    registration_ids:  registration_ids,
    notification: {
      body: randomMent,
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
});

function pickRandom(array: string[]) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};