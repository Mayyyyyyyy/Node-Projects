const http = require('http')
const fs = require('fs')
const socket = require('socket.io')

const server = http.createServer((req,res)=>{
    console.log('server is running' , )
    const html = fs.readFileSync('./static/index.html')
    res.end(html)
}).listen(8080)

const io = socket(server)
let num = 0
let arr =[]
io.on('connection',(socket)=>{
   num++;
   console.log('新来了一个用户，现有'+num+'人' , )
   socket.on('message',(clientMsg)=>{
     console.log('clientMsg' , clientMsg)
     let clientInfo = {}
     clientInfo.id = socket.id
     clientInfo.msg = clientMsg
     arr.push(clientInfo)
     let newArr = []
     newArr = [...new Set(arr)]
     io.emit('message', newArr)
   })
   socket.on('disconnect',()=>{
       num--;
       console.log(socket.id+'已离开，'+'现有'+num+'人' , )
   })
})