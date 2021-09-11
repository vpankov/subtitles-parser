if (process.argv.length < 3) {
  process.exit(1);
}

var fs = require("fs"),
  filename = process.argv[2];
fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;
  processData(data);
});

function processData(text) {
  const reg1 = new RegExp(/(([^\w ^' \xC0-\xFF])|([0-9])|(\s+))+/g);

  //Clear data
  array = text.replace(reg1, " ").toLowerCase().split(" ");

  let wordsWithQuantity = [];
  array.forEach((el) => {
    const index = wordsWithQuantity.findIndex((item) => item.title == el);
    if (index !== -1) {
      wordsWithQuantity[index].value++;
    } else {
      wordsWithQuantity.push({
        title: el,
        value: 1,
      });
    }
  });

  //Sorting
  const sorted = wordsWithQuantity.sort(function (a, b) {
    return b.value - a.value;
  });
  writeFile(sorted);
}

function writeFile(data) {
  let csv = "word,quantity\n";
  data.forEach((item) => {
    csv += `${item.title}, ${item.value}\n`;
  });

  fs.writeFile("words.csv", csv, function (err) {
    if (err) return console.log(err);
  });
}
