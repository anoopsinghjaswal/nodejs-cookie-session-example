/* jshint esversion: 6 */
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authSvc from './auth';
import userService from './users';

dotenv.config();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.port || 3000;

app.use(express.static(__dirname + '/public'));



/* Following API are for testing cookies
 */
app.get('/hello', (req, res) => {
    res.status(200).send('hello');
});


app.get('/setcookie/:user', (req, res) => {
    res.cookie("userCookie", req.params.user);
    res.status(200).send(`Cookie set to ${req.params.user}`);
});

app.get('/testcookie/', (req, res) => {
    console.log('cookies are ', req.cookies);
    res.status(200).send(req.cookies);
});

/* session managemet API , login /logout 
 */
app.post('/login', authSvc.loginUser);
app.get('/logout', [authSvc.isAuthenticated], authSvc.logoutUser);
/*
Protected Data APIs
*/
app.get('/user/:userName', [authSvc.isAuthenticated], (req, res) => {
    userService.getUserInfo(req.params.userName).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.error('Error while fetching user info ', err);
        res.status(500).json('INternal server Error');
    });

});
app.get('/user', [authSvc.isAuthenticated], (req, res) => {
    console.log('userInfo', req.user);
    userService.getUserInfo(req.user.userName).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.error('Error while fetching user info ', err);
        res.status(500).json('INternal server Error');
    });

});
/* 
Following API are protecting te application views
 */

app.use('/app', [authSvc.isAuthenticated], express.static(__dirname + '/private'));

app.listen(port, () => {
    console.log(`Service started on port ${port}`);
});
