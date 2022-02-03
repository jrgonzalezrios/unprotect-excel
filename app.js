const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index')
})
const excel = require('./excel')
app.post('/', (req, res) => {
    if (req.files) {
        const file = req.files.file
        const fileName = file.name
        file.mv(`${__dirname}/store/${fileName}`, err => {
            const processFile = excel.read(fileName)
            if (err) {
                console.log(err)
                res.send('There was an error')
            } else {
                res.send('uploaded successfully')
            }
        })
    } else {
        res.send('There are no files')
    }
})
app.get('/download', function(req, res){
    const file = `${__dirname}/store/export.xlsx`;
    res.download(file); // Set disposition and send it.
  });
app.listen(3000, () => {
    console.log('server started')
})