/* jshint esversion: 6 */
class Sessions {
    constructor() {
        this._sessions = {};
    }
    getAll() {
        return this._sessions;
    }
    createSession(sessionId, obj) {
        this._sessions[sessionId] = obj;
        return Promise.resolve(sessionId);
    }

    destroySession(sessionId) {
        let userInfo = this._sessions[sessionId];
        delete this._sessions[sessionId];
        return Promise.resolve(userInfo);
    }

    getSessionInfo(sessionId) {
        return Promise.resolve(this._sessions[sessionId]);
    }
}


export default new Sessions();
