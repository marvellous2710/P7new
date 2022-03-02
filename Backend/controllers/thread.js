const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const db      = require("../lib/db");

exports.createThread = (req, res, next) => {
    
    const mysql = `INSERT INTO thread SET ?`;
    const thread = { titre: req.body.titre, text: req.body.text, email: req.body.email};
    
    db.query(
        mysql, thread,
     
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        }
        return res.status(201).send({ 
          message: "Thread registred !",
        });
      }
    );
}


exports.getAllThread = (req, res, next) => {
  const size = req.query.size;
  const pageNumber = req.query.page;
  const offset = (pageNumber - 1) * size;

  //const mysql = `SELECT * FROM thread LIMIT 1 OFFSET 0`;//DESC pour afficher les thread par le dernier posté
  //const mysql = `SELECT * FROM thread ORDER BY datePost DESC LIMIT 5 OFFSET ${yo += 10}`;
  const mysql = `SELECT * FROM thread ORDER BY datePost DESC LIMIT ${size} OFFSET ${offset}`;

  db.query(
      mysql,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      return res.status(201).send(result);   
    }
  );   
  return res.status(201);
}


exports.getOneThread = (req, res, next) => {
  const mysql    = 'SELECT * FROM thread WHERE idthread = ?';
  const threadId = req.params.threadId;

  db.query(
    mysql, [threadId],
  (err, result) => {
    if (err) {
      throw err;
      return res.status(500).send({
        message: err,
      });
    }
    console.log(result);
    if (result.length === 0) {
      return res.status(404).send({
        message : `Thread not found ${threadId}`
      });
    }
    return res.status(201).send(result[0]);
   }
  );
}

exports.modifyThread = (req, res, next) => {
  const idTh    = req.params.id;
  const mysql    = `UPDATE thread SET titre = ? WHERE idTh = ${idTh}`;
  const user     = req.body;
  const data     = [user.titre, user.text, req.params.threadId];
  //const idThread = ({ idthread: req.params.threadId }, { ...req.body, idthread: req.params.threadId });
   
    db.query(mysql, data, (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        } 

        // if (idThread == idThread) {
        //   return res.status(201).send({          
        //     message: "Thread modified !"
        //   });
        // }

        return res.status(201).send({          
          message: "Thread modified !"
        });
        
      }
    );
}

exports.deleteThread = (req, res, next) => {
    // const mysql = `DELETE FROM thread WHERE idthread = ?`;
    // const thread = ({ idthread: req.body.idthread });
    const mysql = 'DELETE FROM thread WHERE idthread = ?';

    const user = req.body; 
    const data = [user.idthread];
    
    db.query(
        mysql, data,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            message: err,
          });
        }
        return res.status(201).send({ 
          message: "Thread deleted !",
        });
      }
    );
}

exports.like = (req, res, next) => {}

