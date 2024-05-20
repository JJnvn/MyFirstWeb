// import http to run server
const http = require('http')

// set default host, port
// this equal to localhost:8000 (localhost is a network interface that allows communication between processes running on the same device)
// network interface == bridge that connect device to internet
const host = '127.0.0.1' 
const port = 8000

// กำหนดค่าเริ่มต้นของ server เมื่อเปิดหน้าเว็บที่ localhost:8000 ขึ้นมา
const requestListener = function (req, res) {
  res.writeHead(200)
  res.end("My first server!")
}

// run server
const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})