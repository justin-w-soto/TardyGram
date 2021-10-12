const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
    username;
    avatarUrl

    constructor(row){
        this.username = row.github_username;
        this.avatarUrl = row.github_avatar_url;
    }

    static async insert({ username, avatarUrl}){
        const { rows } = await pool.query(
            'INSERT INTO users (github_username, github_avatar_url) VALUES ($1, $2) RETURNING *' [username, avatarUrl]  
        );

        return new User(rows[0]);
    }
    

    static async findByUserName(username){
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE github_username=$1', [username]
        );
       
        if (!rows[0]) return null;

        return new User(rows[0]);
    }



    authToke(){
        return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
            expiresIn: '24h'
        });
    }

    toJSON(){
        return{
          username: this.username,
          avatarUrl: this.avatarUrl
        };
    }

};