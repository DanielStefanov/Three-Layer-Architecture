const sqlite3 = require('sqlite3').verbose();

function connectDatabase() {
    return new sqlite3.Database('./data/account_management.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
}

function createAccount(username, password) {
    const db = connectDatabase();
    db.serialize(() => {
        db.run(`INSERT INTO accounts (username, password) VALUES (?, ?)`, [username, password], (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Account with username ${username} created successfully.`);
            }
        });
    });
    db.close();
}

function updateAccount(id, newUsername, newPassword) {
    const db = connectDatabase();
    db.serialize(() => {
        db.run(`UPDATE accounts SET username = ?, password = ? WHERE id = ?`, [newUsername, newPassword, id], (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Account with ID ${id} updated successfully.`);
            }
        });
    });
    db.close();
}

function deleteAccount(id) {
    const db = connectDatabase();
    db.serialize(() => {
        db.run(`DELETE FROM accounts WHERE id = ?`, [id], (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Account with ID ${id} deleted successfully.`);
            }
        });
    });
    db.close();
}

function findAccountByUsername(username, callback) {
    const db = connectDatabase();
    db.serialize(() => {
        db.get(`SELECT * FROM accounts WHERE username = ?`, [username], (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
            }
        });
    });
    db.close();
}

module.exports = { createAccount, updateAccount, deleteAccount, findAccountByUsername };
