var AV = require('leanengine');


/**
 * 一个简单的云代码方法
 */

AV.Cloud.define('text', function (request, response) {
    console.log("text");
    response.success("test");
});

module.exports = AV.Cloud;
