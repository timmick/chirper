const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config()
const port = process.env.CHIRPER_PORT

const connection = mysql.createConnection({
    host     : process.env.CHIRPER_DB_HOST,
    user     : process.env.CHIRPER_DB_USER,
    password : process.env.CHIRPER_DB_PASS,
    database : process.env.CHIRPER_DB_NAME
  })



app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({expected:true}))

app.get('/',  (_, response)=> 
{
 
  connection.query('SELECT * FROM atabaev_t_db.Chirps;',(error,results)=>
   
  { 
     if (error) throw error
     response.render('index', {'chirps':results })
  });
})
app.post('/',(request,response) =>
{
  const content = request.body.content
  connection.query(`INSERT INTO Chirps Set ?;`,{'Content':content},(error)=>
   {
       if (error) throw error
       response.writeHead(302,{
        'Location': '/'
      })
       response.end();
   });
});
app.listen(port, () => console.log(`The Chirper server listening on port ${port}.`))