/* jshint esversion: 6 */
class Users {
    constructor() {
        this._users = [{
            userName: 'johndoe',
            password: 'test123',
            emailId: 'johndoe@exmaple.com',
            contactNumber: '9985654123',
            firstName: 'John',
            lastName: 'Doe',
        }, {
            userName: 'guest',
            password: 'pass',
            emailId: 'guest@exmaple.com',
            contactNumber: '9985657823',
            firstName: 'Guest',
            lastName: 'User',
        }];
    }
    validateUser(userName, password) {
        const userObj = [];
        this._users.forEach(user => {
            if (user.userName == userName && user.password == password) {
                userObj.push(user);
            }
        });
        return Promise.resolve(userObj);
    }
    getUserInfo(userName) {
        const userObj = [];
        this._users.forEach(user => {
            if (user.userName == userName) {
                userObj.push(user);
            }
        });
        return Promise.resolve(userObj[0]);
    }
}


export default new Users();
