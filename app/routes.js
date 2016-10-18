// CUSTOM MODULES
// ==============================================
var db = require('./connectionDB');

// BASE MODULES
// ==============================================
var path = require('path');
var http = require('http');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 8888;
var bodyParser = require('body-parser');

// ROUTES
// ==============================================
var router = express.Router();

// Support json encoded bodies
//app.use(bodyParser.json());

// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Support static folder for script and style
app.use(express.static(path.join(__dirname, 'public')));

router.get('/login', function(req, res){
	res.render('login.ejs');
});

app.post('/login-user', function(req, res){

	if(req.method == 'POST') {
		var email = req.body.user_email;
		var pass = req.body.user_pass;

		if(email !== false && pass !== false) {
			db.query('SELECT admin_id, admin_name, admin_email, admin_hash FROM admin WHERE admin_email="'+ email +'" AND admin_password="'+ pass +'" AND admin_stats="1"', function(error, rows, fields){
				var admin_data = rows;
				res.render('admin.ejs', {info: admin_data});
				res.end();
			});
		} else {
			res.redirect('/login');
		}
	} else {
		res.redirect('/login');
	}
});

router.get('/blog', function(req, res) {
	db.query('SELECT post_id, post_name, post_text, post_author, post_tags, post_comment_sum, post_date FROM post WHERE post_stats ="1"', function(error, rows){
		res.render('post_list.ejs', {items: rows});
		res.end();
	});
});

router.get('/post/:id', function(req, res) {
	var post_id = req.params.id;
	//var post_url = path.join(__dirname, 'templates');

	db.query('SELECT * FROM post WHERE post_id="' + post_id + '"' , function(error, rows, fields) {

		if(rows[0].post_stats == 1) {
			res.render('post.ejs', {item: rows[0]});
		} else {
			res.render('404.ejs');
		}

		res.end();

		//console.log(JSON.stringify(rows));
    });
});

// Run Router
app.use('/', router);
// Run Server
http.createServer(app).listen(port);