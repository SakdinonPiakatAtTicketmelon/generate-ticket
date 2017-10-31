import express from 'express'
import csv from 'csvtojson'

import path from 'path'
import formidable from 'formidable'
import fs from 'fs'
import bodyParser from 'body-parser'
import util from 'util'


const app = express()

app.set('views', __dirname + '/views');
app.use("/asset", express.static(__dirname + '/asset'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.join(__dirname + '/views/index.html'))
})

app.post('/template', (req, res) => {
  let data = []
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.filetoupload.path;
    var newpath = './tmp' + files.filetoupload.name;
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      csv()
        .fromFile(newpath)
        .on('json', (jsonObj, rowIndex) => {
          data.push(jsonObj)
        })
        .on('done', (error) => {
          fs.unlink(newpath, (err) => {
            if (err) throw err;
          });
          let template = fields.template
          switch (template) {
            case '1':
              res.render(path.join(__dirname + '/views/ticket1.html'), { data: data })
              break;
            case '2':
              res.render(path.join(__dirname + '/views/ticket2.html'), { data: data })
              break;
            case '2.1':
              res.render(path.join(__dirname + '/views/ticket2.1.html'), { data: data })
              break;
            case '3':
              res.render(path.join(__dirname + '/views/ticket3.html'), { data: data })
              break;
            case '4':
              res.render(path.join(__dirname + '/views/ticket4.html'), { data: data })
              break;
            case '5':
              res.render(path.join(__dirname + '/views/ticket5.html'), { data: data })
              break;
            case '6':
              res.render(path.join(__dirname + '/views/ticket_Epic_Poll_Party.html'), { data: data })
              break;
            case '7':
              res.render(path.join(__dirname + '/views/ticket_maya_complimentary.html'), { data: data })
              break;
            case '8':
              res.render(path.join(__dirname + '/views/ticket_maya_general.html'), { data: data })
              break;
            case '9':
              res.render(path.join(__dirname + '/views/ticket_maya_QR_Only.html'), { data: data })
              break;
            default:
              res.render(path.join(__dirname + '/views/ticket1.html'), { data: data })
          }
        })
    });
  });
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})