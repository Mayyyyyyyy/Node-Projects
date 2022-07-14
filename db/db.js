const mysql = require('mysql')
const dbConfig = {
    host:'localhost',
    user:'root',
    password:'*****',
    // port:'8080',
    database: 'user',
}

const db={
    query:function(sql,params,callback){
        return new Promise((resolve,reject)=>{
            const connection = mysql.createConnection(dbConfig);
            // console.log('connection' , connection)
            console.log('sql query' , sql)
            connection.connect((err)=>{
                if(err){
                    console.log('connect err' , err)
                }
            })
            connection.query(sql,params,(err,results,fields)=>{
                if(err){
                    console.log('query err' , err)
                }
                let reformedResults = JSON.parse(JSON.stringify(results))
                callback && callback(reformedResults,fields)
                // console.log('results' ,results)
                resolve(reformedResults)
                connection.end()
            })
        })
    },
    handleSql: function(pageNum){
        if(pageNum == 1 || pageNum == ''){
            return `select * from userinfo limit 0,5`
        }else{
            let start = (pageNum-1)*5
            let step = 5
            console.log('start' , start)
            let sql = "select * from userinfo limit "+start+','+step
            return sql
        }
    }
}

module.exports = db;