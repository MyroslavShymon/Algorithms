const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.set("port", 8080);
app.listen(app.get("port"), () => {
  console.log(`[OK] Server is running on localhost:${app.get("port")}`);
});
fs.writeFile("hello.txt", "Hello мир!", function(error) {
  if (error) throw error; // если возникла ошибка
  console.log("Асинхронная запись файла завершена. Содержимое файла:");
  let data = fs.readFileSync("hello.txt", "utf8");
  console.log(data); // выводим считанные данные
});
