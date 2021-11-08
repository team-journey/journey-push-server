import FCM from "fcm-node";
import path from "path";
import sequelize from 'sequelize';
import mement from "moment";
import { emojiMent, eveningMentForComplete, eveningMentForNotComplete, morningMentForComplete, morningMentForNotComplete } from '../dummy/Message';

import { Message } from '../models/Message';
import { User } from '../models/User';
import moment from 'moment';

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

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        const ment = (user.is_completed) ? pickRandom(morningMentForComplete) : pickRandom(morningMentForNotComplete);
        const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
        console.log('morning ment: ' + msgMent);
        const message = {
          to: user.token,
          notification: {
            title: '오늘의 모행 메세지 🐱',
            body: msgMent,
          },
        };

        fcm.send(message, function (err, response) {
          if (err) {
            console.log("FAIL: " + err.message);
          } else {
            console.log("SUCCESS: " + user.nickname + " " +  response);
            Message.create({
              user_id: user.id,
              ment: ment.join("ㅡ"),
              is_new: true
            });
          }
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

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        const ment = (user.is_completed) ? pickRandom(eveningMentForComplete) : pickRandom(eveningMentForNotComplete);
        const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
        console.log('evening ment: ' + msgMent);
        const message = {
          to: user.token,
          notification: {
            title: '오늘의 모행 메세지 🐱',
            body: msgMent,
          },
        };
        
        fcm.send(message, function (err, response) {
          if (err) {
            console.log("FAIL: " + err.message);
          } else {
            console.log("SUCCESS: " + user.nickname + " " +  response);
            Message.create({
              user_id: user.id,
              ment: ment.join("ㅡ"),
              is_new: true
            });
          }
        });
      }
    } catch (err) {
      console.log('********************* evening alarm error *********************');
      console.error(err.message);
    }
  },
  emoji: async (userId: string) => {
    if (!userId) return;

    try {
      const user = await User.findOne({
        attributes: ['id', 'token', 'nickname'],
        where: { id: userId }
      });

      if (!user) return;
      
      const ment = emojiMent[0];
      const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
      console.log('emoji ment: ' + msgMent);
      const message = {
        to: user.token,
        notification: {
          title: '오늘의 모행 메세지 🐱',
          body: msgMent,
        },
      };

      fcm.send(message, function (err, response) {
        if (err) {
          console.log("FAIL: " + err.message);
        } else {
          console.log("SUCCESS: " + user.nickname + " " + response);
          Message.create({
            user_id: user.id,
            ment: ment.join("ㅡ"),
            is_new: true
          });
        }
      });
    } catch (err) {
      console.log('********************* evening alarm error *********************');
      console.error(err.message);
    }
  },
  testing: async () => {
    try {
      const user = await User.findOne({
        attributes: ['id', 'token', 'nickname', 'is_completed'],
        where: {
          id: 97
        }
      });

      const message = {
        to: user.token,
        notification: {
          title: '오늘의 모행 메세지 🐱',
          body: '테스트',
        },
      };
        
      fcm.send(message, function (err, response) {
        if (err) {
          console.log("FAIL: " + err.message);
        } else {
          console.log("SUCCESS: " + user.nickname + " " +  response);
          Message.create({
            user_id: user.id,
            ment: '테스트',
            is_new: true,
            date: new Date(moment().add(9, 'hours').format())
          });
        }
      });
    } catch (err) {
      console.log('********************* testing alarm error *********************');
      console.error(err.message);
    }
  }
}

function pickRandom(array: string[][]) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};