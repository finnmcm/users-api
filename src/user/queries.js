const getUsers = "SELECT * from users";
const getUserById = "SELECT * FROM users WHERE id = $1";
//checker method for creating a user, that checks first if user is already registered
//s in this case is an 'alias', a generic user object that has the email attribute equal to $1, aka the first parameter
//we pass to the query (in this case the email we're checking)
const checkEmailExists = "SELECT * FROM users WHERE email = $1";

const addUser = "INSERT INTO users (username, first_name, last_name, email, grad_year, joined_games) VALUES ($1, $2, $3, $4, $5, $6)";
const removeUser = "DELETE FROM users WHERE id=$1";
const updateUsername = "UPDATE users SET username = $1 WHERE id = $2";
module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    removeUser,
    updateUsername
}