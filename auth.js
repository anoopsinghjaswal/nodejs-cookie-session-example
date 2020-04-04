/* jshint esversion: 6 */
import uuid from 'uuid-random';
import userService from './users';
import sessionService from './sessions';

class AuthenticationService {
    isAuthenticated(req, res, next) {
        /* implement cookie/JWT based authentication for a user
            if a cookie is valid grab user information from db and set add that info in request object
        */
        console.log('cokies list', req.cookies)
        sessionService.getSessionInfo(req.cookies.sessionId).then(result => {
            console.log('result from session', result);
            if (result && result.userName) {
                req.user = {};
                req.user.userName = result.userName;
                req.user.emailId = result.emailId;
                req.user.contactNumber = result.contactNumber;
                return next();
            }
            throw new Error('Invalid Decoded Token');
        }).catch(err => {
            console.error('Error Occured in isAuthenticated::', err);
            res.status(401).send('Unauthorized User');
        });
    }
    loginUser(req, res) {
        /* validate user credentials and set a valid cookie/JWT for user */
        console.log('Login request recieved');
        return userService.validateUser(req.body.userName, req.body.password).then(result => {
            console.log('result', result);
            if (result && result.length) {
                return sessionService.createSession(uuid(), result[0]);
            }
            throw new Error('Unauthorized User');
        }).then(sessionId => {
            console.log('session created successfully ::', sessionId);
            res.cookie("sessionId", sessionId);
            return res.redirect('/app/home.html');
        }).catch(err => {
            console.error('Error Occured in loginUser::', err);
            return res.status(401).send('Unauthorized User');
        });
    }
    registerUser(req, res) {
        /* create a user based on information provided by him */
        res.staus(200);
    }
    logoutUser(req, res) {
        /* destory the session if useing cookie authentication or invalidate JWT */
        sessionService.destroySession(req.cookies.sessionId).then(result => {
            if (result) {
                // expire the cookie afterwards
                console.log('User logged out', result);
                console.log('remaining sessions', sessionService.getAll());
                return res.status(200).send('USer Successfully logged out');
            }
        }).catch(err => {
            console.error('Error Occured in logout::', err);
            return res.status(500).send('Internal Server Error');
        });
    }
}

export default new AuthenticationService();
