const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'kullanici_sistemi'
	}
)

db.connect((err) => {
	if (err) {
		console.log("Veritabanına bağlantı hatası:", err);
		return;
	}
	console.log("Veritabanına bağlanıldı.");

});

app.post('/signup', (req, res) => {
	const { sname, semail, spassword } = req.body;
	const sql = 'INSERT INTO users (name, email, password) VALUES(?,?,?)';
	db.query(sql,[sname,semail,spassword],(err,results)=>{
		if(err || results.length===0)
			return res.status(500).send('Kayıt başarısız!');
		res.send('Kullanıcı başarıyla eklendi.');
	});
});

app.post('/login',(req,res)=>{
	const {lmail, lpassword}= req.body;
	const sql='SELECT * FROM users WHERE email = ? AND password = ?';
	db.query(sql,[lmail,lpassword],(err,results)=>{
		if(err || results.length === 0)
			return res.status(401).send('Giriş Başarısız!');
		res.send('Giriş Başarılı!');
	})
})
app.post('/book',(req,res)=>{
	const {bookservice,bookdate,booktime} = req.body;
	const sql = 'INSERT INTO appointments (service,date,time) VALUES (?,?,?)';
	const isfill= 'SELECT fill FROM appointments WHERE date = ? AND time = ?';
	db.query(isfill,[bookdate,booktime],(err,results)=>{
		if(results === 1)
			return res.status(500).send('Randevu oluşturulamadı.Bu saat dolu!');
		else{
			db.query(sql,[bookservice,bookdate,booktime],(err,results)=>{
				if(err || results.length===0)
					return res.status(500).send('Randevu oluşturulamadı.');
				db.query('INSERT INTO appointments (fill) VALUES (?)',[1]);
				res.send('Randevu Başarı ile oluşturuldu.');

			})
		}
	})
	
	console.log("bookthat");
})
app.listen(port, () => {
	console.log(`sunucu ${port} üzerinde çalışıyor.`);
});