const express = require('express');
const ejs = require('ejs');
const path = require('path');
const addRouter = require('./routes/add');
const showRouter = require('./routes/show');
const db = require('./db/db')
const app =  express();
const bodyParser = require('body-parser');
const { query } = require('express');
const { resolve } = require('path');
const math = require('mathjs')


app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/add',addRouter)
// app.use('/show',showRouter)
app.get('/',(req,res)=>{
    res.render('index',{
        
    })
})

app.get('/add',(req,res)=>{
    console.log('add req.query' , req.query)
    const {username,password,email,birthday,adress} = req.query
    let addSql = 'insert into userinfo(username,password,email,birthday,address) values(?,?,?,?,?)'
    let addParams = [username,password,email,birthday,adress]
    db.query(addSql,addParams,(results,fields)=>{
      console.log('add results' , results)
    });
    res.render('add',{
        
    })
})
app.get('/show',async(req,res)=>{
    console.log('req.query' , req.query)
    // query all data
    let all_sql = 'select * from userinfo'
    let total_data =await db.query(all_sql,[],(results,fields)=>{
      // console.log('query results' , results)
    })
    // console.log('total_data' , total_data)
    let total_page = math.ceil(total_data.length / 5);
    // query each page
    let page_data = []
    page_sql = db.handleSql(req.query.pageNum)
    page_data =await db.query(page_sql,[],(results,fields)=>{
      // console.log('query results' , results)
    })
    console.log('page_data' , page_data)
    res.render('show',{
        data:page_data,
        total_page
    })
})

app.listen(8080,(err)=>{
  if(err){
    throw err
  }
  console.log('server is running' )
});