import express from "express";
import connectDB from "./loader/db";
import path from "path";
import admin from "firebase-admin";

const app = express();
const apidocPath = path.join(__dirname, "../apidoc");
const firebaseAccount = require(path.join(__dirname, "../journey-firebase-admin.json"));

// Connect Database
connectDB();

admin.initializeApp({
  credential: admin.credential.cert(firebaseAccount),
});

app.use(express.json());

app.use("/api/message", require("./controller/messageController"));

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
