import express from "express";
import csv from "csvtojson";

import path from "path";
import formidable from "formidable";
import fs from "fs";
import bodyParser from "body-parser";
import util from "util";

const app = express();

app.set("views", __dirname + "/views");
app.use("/asset", express.static(__dirname + "/asset"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/views/index.html"));
});

app.post("/template", (req, res) => {
  let data = [];
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.filetoupload.path;
    var newpath = "./tmp" + files.filetoupload.name;
    fs.rename(oldpath, newpath, err => {
      if (err) throw err;
      csv()
        .fromFile(newpath)
        .on("json", (jsonObj, rowIndex) => {
          data.push(jsonObj);
        })
        .on("done", error => {
          fs.unlink(newpath, err => {
            if (err) throw err;
          });
          let template = fields.template;
          console.log("template", template);
          switch (template) {
            case "test":
              res.render(path.join(__dirname + "/views/testPdf.html"), {
                data: data
              });
              break;
            case "amplify e-certificate":
              res.render(path.join(__dirname + "/views/amplify_e_cer.html"), {
                data: data
              });
              break;
            case "WCD_Ticket_EMPTY":
              res.render(
                path.join(__dirname + "/views/WCD_Ticket_EMPTY.html"),
                {
                  data: data
                }
              );
              break;
            case "WCD_Promo_EMPTY":
              res.render(path.join(__dirname + "/views/WCD_Promo_EMPTY.html"), {
                data: data
              });
              break;
            case "16":
              res.render(
                path.join(__dirname + "/views/Ticket_template_default.html"),
                { data: data }
              );
              break;
            case "15":
              res.render(path.join(__dirname + "/views/joox.html"), {
                data: data
              });
              break;
            case "1":
              res.render(path.join(__dirname + "/views/ticket1.html"), {
                data: data
              });
              break;
            case "2":
              res.render(path.join(__dirname + "/views/ticket2.html"), {
                data: data
              });
              break;
            case "2.1":
              res.render(path.join(__dirname + "/views/ticket2.1.html"), {
                data: data
              });
              break;
            case "3":
              res.render(path.join(__dirname + "/views/ticket3.html"), {
                data: data
              });
              break;
            case "4":
              res.render(path.join(__dirname + "/views/ticket4.html"), {
                data: data
              });
              break;
            case "5":
              res.render(path.join(__dirname + "/views/ticket5.html"), {
                data: data
              });
              break;
            case "6":
              res.render(
                path.join(__dirname + "/views/ticket_Epic_Poll_Party.html"),
                { data: data }
              );
              break;
            case "7":
              res.render(
                path.join(__dirname + "/views/ticket_maya_complimentary.html"),
                { data: data }
              );
              break;
            case "8":
              res.render(
                path.join(__dirname + "/views/ticket_maya_general.html"),
                { data: data }
              );
              break;
            case "9":
              res.render(
                path.join(__dirname + "/views/ticket_maya_QR_Only.html"),
                { data: data }
              );
              break;
            case "10":
              res.render(path.join(__dirname + "/views/e-ticket-03.html"), {
                data: data
              });
              break;
            case "11":
              res.render(path.join(__dirname + "/views/maya-a4.html"), {
                data: data
              });
              break;
            case "12":
              res.render(path.join(__dirname + "/views/TRANSMISSION.html"), {
                data: data
              });
              break;
            case "13":
              res.render(
                path.join(__dirname + "/views/QR_only_digi_top.html"),
                { data: data }
              );
              break;
            case "14":
              res.render(path.join(__dirname + "/views/KnockKnock2019.html"), {
                data: data
              });
              break;
            default:
              res.render(path.join(__dirname + "/views/ticket1.html"), {
                data: data
              });
          }
        });
    });
  });
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
