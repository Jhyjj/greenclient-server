const express = require ("express")
const cors = require("cors")
const app = express();
const port = 3001;
const mysql = require("mysql");
const fs = require("fs");

const dbinfo = fs.readFileSync('./database.json');
//받아온 JSON데이터를 객체형태로 변경 JSON.parse
const conf = JSON.parse(dbinfo)

//connection mysql연결 createConnection()
//connection.connect() 연결하기
//connection.end() 연결종료
//connection.query('쿼리문',callback함수)
//callback함수(error,result,result의 필드정보)
//field정보에는 테이블 속 컬럼정보가 담긴다.

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

app.use(express.json());
app.use(cors());

//메인페이지 리스트 출력
app.get('/customers', async (req,res)=>{
    // connection.connect();
    connection.query(
        "select * from customer_table",
        (err,rows,fields)=>{
            res.send(rows)
            console.log(fields);
        }
    )
    // connection.end();
    
})

//클릭했을때 아이디 받아서 상세페이지
app.get('/detailview/:id', async (req,res)=>{
    const params = req.params;
    const {id} = params;
    connection.query(
        `select * from customer_table where no=${id}`,
        (err,rows,fields)=>{
            res.send(rows)
        }
    )
})

//고객 등록
app.post("/write", async (req,res)=>{
    
})

//서버실행
app.listen(port, ()=>{
    console.log('고객 서버가 돌아가고 있습니다.')
})
