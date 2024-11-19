// '../' = go up a folder
const pool = require('../../db')
const queries = require('./queries')

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        //200 = the code for successful call
        //if okay, send all rows from users table (all users)
        res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    //get id out of html parameter /1 or /2 - req.params.id defiend in routes.js
    const id = parseInt(req.params.id)
    //query statement (getUserById), parameters [id] (if you had more you would add them), and callback function
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const addUser = (req, res) => {
    //sending json file with all the necessary data to create a user
    const {username, first_name, last_name, email, grad_year, joined_games} = req.body;
     //first check if email already exists (if user is already in database)
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email already exists");
        }

        //add user to database
        pool.query(queries.addUser, [username, first_name, last_name, email, grad_year, joined_games], (error, results) => {
            if (error) throw error;
            res.status(201).send("User Created Successfully!");
        });
    });
};

const getUserByEmail = (req, res) => {
    const {email} = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        res.send(results);
    });

};

const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        if(results.rows.length){
            pool.query(queries.removeUser, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("User removed sucessfully!")
            });
        }
        else{
            res.send("A user by this ID does not exist")
        }
    });

}
const updateUsername = (req, res) => {
    const id = parseInt(req.params.id);
    const {username} = req.body;
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        if(results.rows.length){
            pool.query(queries.updateUsername, [username, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Username updated successfully!")
            });
        }
        else{
            res.send("User does not exist in database")
        }
    });
};
module.exports = {
    getUsers, 
    getUserById,
    addUser,
    getUserByEmail,
    removeUser,
    updateUsername
};