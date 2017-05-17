var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');

function mail(name,mail,date,time,dogname,comment) {

	var context =`
	姓名：${name}
	信箱：${mail}
	日期：${date}
	時間：${time}
	狗：${dogname}
	備註：${comment}
	`

let transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25 ,
	auth: {
		user: 'love321127@gmail.com',
		pass: 'love127321'
	},
	tls:{
		rejectUnauthorized: false
	}
});

let HelperOptions = {
	from: '"Jerry" <love321127@gmail.com>',
	to: 'creatmylife850710@gmail.com',
	subject: 'Hi',
	text: context
};

transporter.sendMail(HelperOptions,(error,info)=>{
	if(error){
	return	console.log(error);
	}
	console.log("The message was sent!");
	console.log(info);
});
}

function tell(name,mail,text) {

	var context =`
	姓名：${name}
	信箱：${mail}
	事件：${text}
	`

let transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25 ,
	auth: {
		user: 'love321127@gmail.com',
		pass: 'love127321'
	},
	tls:{
		rejectUnauthorized: false
	}
});

let HelperOptions = {
	from: '"Jerry" <love321127@gmail.com>',
	to: 'creatmylife850710@gmail.com',
	subject: 'Hi',
	text: context
};

transporter.sendMail(HelperOptions,(error,info)=>{
	if(error){
	return	console.log(error);
	}
	console.log("The message was sent!");
	//console.log(info);
});
}


module.exports = {
    mail,
		tell
};
