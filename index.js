// xây nhà
const express=require("express");
const Process=require("process");
const app=express();
// cấp cổng
const PORT=Process.env.PORT||5001;
//
app.listen(PORT,function(){
    console.log("Server is running...");
});
// tao route
app.get("demo",function(reg,res){
    res.send("Hello world!");
});
// route get-data
app.get("/get-data",function (reg,res){
    var data={
        name: "Nguyễn Văn An",
        age: 18,
        mark: 9
    }
    res.send(data);
});

//config to connect mysql
const configDB={
    host:"139.180.186.20",
    port:3306,
    database:"t2207e",
    user:"t2207e",
    password: "t2207e123", //dùng mamp: "root" ; dùng xampp: "" -để trống
    multipleStatements:true //cho phép sử dụng nhiều câu SQL 1 lần gửi yêu cầu

};
//connect to mysql
const mysql=require("mysql");
const conn=mysql.createConnection(configDB);
// api list all class
app.get("/get-classes",function (req,res){
    const sql="select * from classes";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//get all students
app.get("/get-students",function (req,res){
    const sql="select * from students";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//bài toán lọc theo cid
app.get("/get-students-by-class",function (req,res){
    const cid=req.query.cid;
    const sql="select * from students where cid="+cid;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//seach sinh viên theo tên
app.get("/search-students-by-name",function (req,res){
    const q=req.query.q;
    const sql=`select * from students where name like '%${q}'`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
// tìm sinh viên theo tên lớp
app.get("/search-students-by-classname",function (req,res){
    const q=req.query.q;
    const sql=`select * from students where cid in (select cid from classes where name like '%${q}')`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//get 1 sinh viên theo sid
app.get("/detail-students",function (req,res){
    const sid=req.query.sid;
    const sql=`select * from students where sid= ${sid}`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else if(data.length>0){
            res.send(data[0]);
        } else {
            res.status(404).send("404 not found");
        }
    })
});
// về làm thêm chức năng thêm sửa xoá
app.get("/student",function(req,res){
    //Liet ke sinh vien
    res.send("Student with GET");
});
app.post("/student",function(req,res){
    //them 1 sinh vien
    res.send("Student with POST");
});
app.put("/student",function(req,res){
    //update sinh vien
    res.send("Student with PUT");
});
app.delete("/student",function(req,res){
    //delete sinh vien
    res.send("Student with DELETE");
});
