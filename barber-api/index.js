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
		password: 'f9y7z5x1',
		database: 'kullanici'
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
	const sql = 'INSERT INTO appointments (service,date,time,is_fill) VALUES (?,?,?,?)';
	const checkapp= 'SELECT * FROM appointments WHERE date = (?) AND time = (?)';
	db.query(checkapp,[bookdate,booktime],(err, results)=>{			
		console.log(results[0]);
		if(err)
			return res.status(500).send('Veritabanı hatası oluştu.');
		if(results.length > 0 && results[0].is_fill === 1){
			return res.send('Bu saatte randevu dolu.');
		}
		else{
			db.query(sql,[bookservice,bookdate,booktime,1],(err,results)=>{
				if(err)
					return res.status(500).send('Randevu oluşturulamadı.');
				res.send('Randevu Başarı ile oluşturuldu.');

			})
		}
	})
	})
app.listen(port, () => {
	console.log(`sunucu ${port} üzerinde çalışıyor.`);
});