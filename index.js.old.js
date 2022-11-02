// xây nhà
const expess=require("express");
const Process=require("process");
const app=express();
// cấp cổng
const PORT=Process.env.PORT||5002;
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



//
var ls=[
    {
        id:1,
        name:"Nguyễn Hoàng Nam",
        age: 18
    },
    {
        id:2,
        name:"Thái Sơn",
        age:16
    },
];
app.get("/get-data2",function (reg,res){
    res.send(ls);
});
// làm vs biến
app.get("/detal",function (reg,res){
    var paramId=reg.query.id;
    var data;
    for(var i=0;i<ls.length;i++){
        if(ls[i].id==paramId){
            data=ls[i];
            break;
        }
    }
    res.send(data);
})
// http://localhost:5000/detal?id=2; http://localhost:5000/detal?id=1
// sửa dữ liệu:
app.get("/edit",function (req,res){
    var paramId=req.query.id;
    var paramName=req.query.name;
    var paramAge=req.query.age;
    for(var i=0;i<ls.length;i++) {
        if (ls[i].id == paramId) {
            ls[i].name = paramName;
            ls[i].age = paramAge;
            break;
        }
    }
    res.send("done");
})
//update dữ liệu
app.get("/create",function (req,res){
    var paramId=req.query.id;
    var paramName=req.query.name;
    var paramAge=req.query.age;
    var check =false;
    for(var i=0;i<ls.length;i++) {
        if (ls[i].id == paramId) {
            check =true;
            break;
        }
    }
    if (check == false){
        ls.push({
            id:paramId,
            name: paramName,
            age: paramAge
        })
    }
    res.send("done");
})
// xóa dữ liệu
app.get("/delete",function (req,res){
    var paramId=req.query.id;
    var p=-1; //gắn
    for(var i=0;i<ls.length;i++){
        if (ls[i].id == paramId){
            p=i;
        }
    }
    if(p!=-1){
        ls.splice(p,1); //splice: xóa từ phần t thứ p, số lượng
    }
    res.send("done");
})
