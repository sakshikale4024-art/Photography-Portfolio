var mysql = require('mysql');
var util = require('util');

var connection = mysql.createConnection({
    "host":"bvt7i3eekabncaaicl8x-mysql.services.clever-cloud.com",
    "user":"u6h6ckztdqgymwyw",
    "password":"oiz7uLyQTz61h8VndzcB",
    "database":"bvt7i3eekabncaaicl8x"
});
var exe = util.promisify(connection.query).bind(connection);

module.exports = exe;
