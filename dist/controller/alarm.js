"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fcm_node_1 = __importDefault(require("fcm-node"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("sequelize"));
const Message_1 = require("../dummy/Message");
const Message_2 = require("../models/Message");
const User_1 = require("../models/User");
const admin = require('firebase-admin');
const firebaseAccount = require(path_1.default.join(__dirname, "../../mohaeng.json"));
// admin.initializeApp({
//   credential: admin.credential.cert(firebaseAccount)
// });
let fcm = new fcm_node_1.default(firebaseAccount);
const Op = sequelize_1.default.Op;
exports.default = {
    morning: async () => {
        try {
            const users = await User_1.User.findAll({
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
                const ment = (user.is_completed) ? pickRandom(Message_1.morningMentForComplete) : pickRandom(Message_1.morningMentForNotComplete);
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
                    console.log("SUCCESS: " + user.nickname + response);
                    Message_2.Message.create({
                        user_id: user.id,
                        ment: ment.join("ㅡ").replace(/ㅁㅁㅁ/gi, user.nickname),
                        is_new: false
                    });
                })
                    .catch(function (err) {
                    console.log("FAIL: " + err.message);
                });
            }
        }
        catch (err) {
            console.log('********************* morning alarm error *********************');
            console.error(err.message);
        }
    },
    evening: async () => {
        try {
            const users = await User_1.User.findAll({
                attributes: ['id', 'token', 'nickname', 'is_completed'],
                where: {
                    token: {
                        [Op.ne]: null,
                        [Op.ne]: ''
                    }
                }
            });
            for (let i = 0; i < 1; i++) {
                const user = users[i];
                const ment = (user.is_completed) ? pickRandom(Message_1.eveningMentForComplete) : pickRandom(Message_1.eveningMentForNotComplete);
                const msgMent = ment.join(" ").replace(/ㅁㅁㅁ/gi, user.nickname);
                console.log('evening ment: ' + msgMent);
                const message = {
                    data: {
                        title: '오늘의 모행 메세지 🐱',
                        body: msgMent,
                    },
                    token: user.token
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
                    console.log("SUCCESS: " + user.nickname + response);
                    Message_2.Message.create({
                        user_id: user.id,
                        ment: ment.join("ㅡ").replace(/ㅁㅁㅁ/gi, user.nickname),
                        is_new: false
                    });
                })
                    .catch(function (err) {
                    console.log("FAIL: " + err.message);
                });
            }
        }
        catch (err) {
            console.log('********************* evening alarm error *********************');
            console.error(err.message);
        }
    }
};
function pickRandom(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}
;
//# sourceMappingURL=alarm.js.map