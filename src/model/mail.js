var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');

function mail(name,mail,date,dogname,note) {

	var context =`
	姓名：${name}
	信箱：${mail}
	日期：${date}
	狗：${dogname}
	備註：${note}
	`;

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
	to: 'jauy9131253@gapp.nthu.edu.tw',
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

function tell(name,mail,date,location,dogname,process_in,check_event) {

	var context =`
	姓名：${name}
	信箱：${mail}
	時間：${date}
	地點：${location}
	犬隻：${dogname}
	過程：${check_event}
	事件：${process_in}
	`;

	console.log(context);

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
	to: 'jauy9131253@gapp.nthu.edu.tw',
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

function adoptMail(name, phone, email, address, exp, id) {

	var context =`
	姓名：${name}
	欲認養犬隻：${id}
	電話號碼: ${phone}
	信箱：${email}
	地址：${address}
	養狗經驗：${exp}
	`;

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
	to: 'jauy9131253@gapp.nthu.edu.tw',
	subject: `您好我想要認養${id}！！`,
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
		tell,
		adoptMail
};
