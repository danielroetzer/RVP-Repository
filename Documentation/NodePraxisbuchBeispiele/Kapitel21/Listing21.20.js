var fs = require('fs');
fs.open('input.txt', 'wx+', function (e, fd) {
    if (e) throw e;
    console.log(fd);
});
