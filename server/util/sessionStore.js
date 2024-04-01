// Session Store
// This file is used to store the session data in the database.

const sessionStore = {
    sessions: [],

    findSession(sessionID) {
        return this.sessions.find((session) => session.sessionID === sessionID);
    },
    saveSession(session) {
        this.sessions.push(session);
    },
    removeSession(sessionID) {
        this.sessions = this.sessions.filter((session) => session.sessionID !== sessionID);
    },
    };


export default sessionStore;