const dbFunctions = require('./database');

function createNewAccount(username, password) {
    dbFunctions.findAccountByUsername(username, (account) => {
        if (account) {
            console.log(`Account with username ${username} already exists.`);
        } else {
            dbFunctions.createAccount(username, password);
        }
    });
}

function editAccount(id, newUsername, newPassword) {
    dbFunctions.updateAccount(id, newUsername, newPassword);
}

function deleteAccount(id) {
    dbFunctions.deleteAccount(id);
}

module.exports = { createNewAccount, editAccount, deleteAccount };