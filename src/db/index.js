const sql = require('mysql');


const config = {
    user: 'root',
    password: '',
    server: 'localhost',
    database: 'slibrary'
};

const connection = sql.createConnection(config);

const dbConnect = (debug) => {
    connection.connect((err) => {
        if (err) {
            debug(`error connecting: ${err.stack}`);
            return;
        }
        debug(`Connected as id ${connection.threadId}`);
    });

    return connection;
};


module.exports = dbConnect;
