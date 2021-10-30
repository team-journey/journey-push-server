import FCM from "fcm-node";
import path from "path";
import sequelize from 'sequelize';
import { eveningMentForComplete, eveningMentForNotComplete, morningMentForComplete, morningMentForNotComplete } from '../dummy/Message';

import { Message } from '../models/Message';
import { User } from '../models/User';

const admin = require('firebase-admin');
const firebaseAccount = require(path.join(__dirname, "../../mohaeng.json"));

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseAccount)
// });

let fcm = new FCM(firebaseAccount);
const Op = sequelize.Op;

export default {
  morning: async () => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'token', 'nickname', 'is_completed'],
        where: {
          token: {
            [Op.ne]: null,
            [Op.ne]: ''
          }
        }
      });
      console.log(users);

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const token = user.token;

        const ment = (user.is_completed) ? pickRandom(morningMentForComplete) : pickRandom(morningMentForNotComplete);
        const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
        console.log('morning ment: ' + msgMent);
        const message = {
          data: {
            title: '오늘의 모행 메세지 🐱',
            body: msgMent,
          },
          token: user.token
        };
        
        admin
          .messaging()
          .send(message)
          .then(function (response) {
            console.log("SUCCESS: " + response);
            Message.create({
              user_id: user.id,
              ment: ment.join("ㅡ"),
              is_new: false
            });
          })
          .catch(function (err) {
            console.log("FAIL: " + err.message);
          });
      }
    } catch (err) {
      console.log('********************* morning alarm error *********************');
      console.error(err.message);
    }
  },
  evening: async () => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'token', 'nickname', 'is_completed'],
        where: {
          token: {
            [Op.ne]: null,
            [Op.ne]: ''
          }
        }
      });
      console.log(users);

      for (let i = 0; i < 1; i++) {
        const user = users[i];
        const token = user.token;

        const ment = (user.is_completed) ? pickRandom(eveningMentForComplete) : pickRandom(eveningMentForNotComplete);
        const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
        console.log('evening ment: ' + msgMent);
        const message = {
          data: {
            title: '오늘의 모행 메세지 🐱',
            body: msgMent,
          },
          token: token
        };
        
        // fcm.send(message, function (err, response) {
        //   if (err) {
        //     console.log("FAIL: " + err.message);
        //   } else {
        //     console.log("SUCCESS: " + response);
        //     Message.create({
        //       user_id: user.id,
        //       ment: ment.join("ㅡ"),
        //       is_new: false
        //     });
        //   }
        // });

        admin
          .messaging()
          .send(message)
          .then(function (response) {
            console.log("SUCCESS: " + response);
            Message.create({
              user_id: user.id,
              ment: ment.join("ㅡ").replace(/ㅁㅁㅁ/gi, user.nickname),
              is_new: false
            });
          })
          .catch(function (err) {
            console.log("FAIL: " + err.message);
          });
      }
    } catch (err) {
      console.log('********************* evening alarm error *********************');
      console.error(err.message);
    }
  }
}

function pickRandom(array: string[][]) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};