import FCM from "fcm-node";
import path from "path";
import sequelize from 'sequelize';

import { eveningMent, morningMent, notSuccessMent } from '../dummy/Message';
import { Message } from '../models/Message';
import { User } from '../models/User';

const firebaseAccount = require(path.join(__dirname, "../../mohaeng.json"));
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

        const ment = (user.is_completed) ? pickRandom(morningMent) : pickRandom(notSuccessMent);
        const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
        console.log('morning ment: ' + msgMent);
        const message = {
          data: {
            body: msgMent,
          },
          token: user.token
        };
        
        fcm.send(message, function (err, response) {
          if (err) {
            console.log("FAIL: " + err.message);
          } else {
            console.log("SUCCESS: " + response);
            Message.create({
              user_id: user.id,
              ment: ment.join("ㅡ"),
              is_new: false
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
      console.log(users);

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const token = user.token;

        const ment = (user.is_completed) ? pickRandom(eveningMent) : pickRandom(notSuccessMent);
        const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
        console.log('evening ment: ' + msgMent);
        const message = {
          data: {
            body: msgMent,
          },
          token: user.token
        };
        
        fcm.send(message, function (err, response) {
          if (err) {
            console.log("FAIL: " + err.message);
          } else {
            console.log("SUCCESS: " + response);
            Message.create({
              user_id: user.id,
              ment: ment.join("ㅡ"),
              is_new: false
            });
          }
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