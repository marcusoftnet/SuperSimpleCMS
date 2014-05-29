var mongoProdUri = process.env.MONGOHQ_URL || 'localhost:27017/koaSSCMS_Prod';
var adminUser = {
	name : process.env.BASIC_USER || 'admin',
	pass : process.env.BASIC_PASS || 'sscms'
};

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'localhost:27017/koaSSCMS_Dev',
		user : adminUser
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongoUrl: 'localhost:27017/koaSSCMS_Test',
		user : adminUser
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri,
		user : adminUser
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};