const ExcelJS = require('exceljs');

async function read (fileName){
  const dir = `${__dirname}/store/${fileName}`
  const workbook = new ExcelJS.Workbook();
  const result = await workbook.xlsx.readFile(dir)
  result.worksheets.forEach((item) => {
    item.unprotect()
  })
  // save under export.xlsx
  await workbook.xlsx.writeFile(`${__dirname}/store/export.xlsx`);
}

module.exports = {
  read
}
