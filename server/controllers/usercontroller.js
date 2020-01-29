//we need bcrypt for basic salt and hashing
const bcrypt = require('bcryptjs');
require('dotenv').config();
//only give this key to people I trust
const {REACT_APP_ADMIN_SECRET} = process.env;

const registerUser = async (req, res) => {
   const db = req.app.get('db');
   const {username, password, email} = req.body;
   const dupeUserName = await db.check_for_username(username);
   const dupeEmail = await db.check_for_email(email);
   if (dupeUserName[0] || dupeEmail[0]) {
      res.status(409).json('Username and/or email already exists.');
   } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await db.register_user(username, hash, email);
      req.session.user = {
         user_id: newUser[0].user_id
      }
      res.status(201).json(req.session.user);
   }
}

// I might want to make registering an admin a separate component.
const registerAdmin = async (req, res) => {
   const db = req.app.get('db');
   const {user, password, email, key} = req.body;
   const dupeUserName = await db.check_for_username(user);
   const dupeEmail = await db.check_for_email(email);
   // 11/13 17:57: After each adminkey has been successfully inputted, make a function to change the adminkey in .env. (Low Priority)
   if (key !== REACT_APP_ADMIN_SECRET) {
      res.sendStatus(403);
   } else if (dupeUserName[0] || dupeEmail[0]) {
      res.status(409).json('Username and/or email already exists.');
   } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newAdmin = await db.is_admin(user, hash, email);
      req.session.user = {
         user_id: newAdmin[0].user_id,
         username: newAdmin[0].username,
         is_Admin: newAdmin[0].is_admin
      }
      res.status(201).json(req.session.user);
   }
}

const loginUser = async (req, res) => {
   const db = req.app.get('db');
   const {usernameOrEmail, password} = req.body;
   //a salt/hash is not necessary due to the compareSync function of bcrypt;
   //it checks if the password inputted is the same as the hash of the one found.
   let userid = await db.check_for_username(usernameOrEmail);
   //if it cannot find via username, try to find via email instead
   if (!userid[0]) {
      userid = await db.check_for_email(usernameOrEmail);
   }
   if (userid[0]) {
      const checkPass = bcrypt.compareSync(password, userid[0].password)
      if (checkPass) {
         req.session.user = {
            user_id: userid[0].user_id, 
            username: userid[0].username,
            // experimental for now
            is_admin: userid[0].is_admin
         }
         res.status(200).json(req.session.user);
      } else {
         res.status(401).json('Invalid credentials.');
      }
   } else {
      res.status(401).json('Invalid credentials.');
   }
}

//We do NOT want the user to be doing anything else while logging out!
const logoutUser = (req, res) => {
   //destroys current session (their "cookie");
   req.session.destroy();
   res.sendStatus(200);
   // res.status(200).json('Logged out');
}

const getCurrentUser = (req, res) => {
   res.status(200).json(req.session.user);
}

const getUser = async (req, res) => {
   const db = req.app.get('db');
   const {user_id} = req.params;
   const userData = await db.get_page_user(user_id);
   res.status(200).json(userData);
}

const getUserName = async (req, res) => {
   // we can grab other things here, just DO NOT GRAB THE PASSWORD.
   const db = req.app.get('db');
   const {user_id} = req.params;
   const username = await db.get_user_name(user_id)
   res.status(200).json(username[0].username)
}

module.exports = {
   registerUser,
   registerAdmin,
   loginUser,
   logoutUser,
   getCurrentUser,
   getUser,
   getUserName
}