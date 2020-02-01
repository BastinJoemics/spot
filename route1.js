var firebase=require("firebase");
var express=require("express");
var app=express();
var admin=require("firebase-admin");
var bodyparser=require("body-parser");
app.set("view engine","ejs");

app.use(bodyparser.urlencoded({extended:true}));
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// --------------------------------------------------------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAYCgY0Opfie_55ZhXasLlXAkqCzBiAk4k",
  authDomain: "pothole-34841.firebaseapp.com",
  databaseURL: "https://pothole-34841.firebaseio.com",
  projectId: "pothole-34841",
  storageBucket: "pothole-34841.appspot.com",
  messagingSenderId: "782731755908",
  appId: "1:782731755908:web:ec9eac59b673b1ef6addd1",
  measurementId: "G-QVQ3GNNHXP"
};
const app1=firebase.initializeApp(firebaseConfig);
var db=firebase.database(app1);
var ref = db.ref("/");

// ---------------------------------------------------------------------------------------------------------------------------
// const firebaseConfig = {
//   apiKey: "AIzaSyCqxh7Sk4lV6jqaJ8nt59SuXsa1JG2Xp08",
//   authDomain: "poth-d635d.firebaseapp.com",
//   databaseURL: "https://poth-d635d.firebaseio.com",
//   projectId: "poth-d635d",
//   storageBucket: "poth-d635d.appspot.com",
//   messagingSenderId: "93088417238",
//   appId: "1:93088417238:web:835a6b55c26dedd1e81077",
//   measurementId: "G-TZQWSHR1LP"
// };

// const app1=firebase.initializeApp(firebaseConfig);
// var db=firebase.database(app1);
// var ref = db.ref("/");



app.get("/",function(req,res){
    // console.log("-------------");
     var coo=ref.once("child_added",function(snapshot,prev) {
      var newpost=snapshot.val();
      // console.log(newpost);
    res.render("map",{new1:newpost});
    });   
});

app.get("/redzone",function(req,res){
  // console.log("-------------");
   var coo=ref.once("child_added",function(snapshot,prev) {
    var newpost=snapshot.val();
    // console.log(newpost);
  res.render("aaa",{new1:newpost});
  });   
});
app.get("/complaints",function(req,res){
  res.render("co");
});

app.get("/expenses",function(req,res){
  res.render("exp");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/index",function(req,res){
  var coo=ref.once("child_added",function(snapshot,prev) {
    var newpost=snapshot.val();
    var count=0;
    for(var id in newpost)
    {
      count=count+1;
    }
    // console.log(count);
    res.render("index",{count:count});
  });
});

app.post("/complaints/com",function(req,res)
{
var city=req.body.city;
var area=req.body.area;
var depth=req.body.depth;
// console.log(city,area,depth,"CA");
var coo=ref.once("child_added",function(snapshot,prev) {
  var newpost=snapshot.val();
  // console.log(newpost);
if((city=="All")&&(area=="All")&&(depth=="All"))
{
  res.render("comp",{new1:newpost});
}
else if((city!="All")&&(area=="All")&&(depth=="All"))
{
for(var id in newpost)
{
  var data=false;
  var id1=newpost[id];
  for(var props in id1)
  {
     if(props.toUpperCase()=="CITY")
    {
       if ((id1[props].toUpperCase())!="\""+(city.toUpperCase())+"\"")
      {
        data=true;
      }
    }
  }
  if(data)
  {
   delete newpost[id]; 
  }
}
res.render("comp",{new1:newpost});
}
else if((city=="All")&&(area!="All")&&(depth=="All"))
{
for(var id in newpost)
{
  // console.log(newpost[id]);
  var data=false,data1=false;
  var id1=newpost[id];
  for(var props in id1)
  {
    // console.log(props.toUpperCase());
    // console.log(id1[props]);
    if(props.toUpperCase()=="CITY")
    {
      // console.log((id1[props]).toUpperCase());
      if ((id1[props].toUpperCase())!="\""+(city.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(city.toUpperCase()),"1");   
        data=true;
      }
    }
    if(props.toUpperCase()=="AREA")
    {
      
      if ((id1[props].toUpperCase())!="\""+(area.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(area.toUpperCase()),"2");
        data1=true;
      }
    }
  }
  if(data||data1)
  {
   delete newpost[id]; 
  }
}
// console.log(newpost,"dataaa");
res.render("comp",{new1:newpost});
}

else if((city=="All")&&(area=="All")&&(depth!="All"))
{
for(var id in newpost)
{
  var data=false;
  var id1=newpost[id];
  for(var props in id1)
  {
     if(props.toUpperCase()=="DEPTH")
    {
       if ((id1[props].toUpperCase())!="\""+(depth.toUpperCase())+"\"")
      {
        data=true;
      }
    }
  }
  if(data)
  {
   delete newpost[id]; 
  }
}
res.render("comp",{new1:newpost});
}

else if((city=="All")&&(area!="All")&&(depth!="All"))
{
for(var id in newpost)
{
  // console.log(newpost[id]);
  var data=false,data1=false;
  var id1=newpost[id];
  for(var props in id1)
  {
    // console.log(props.toUpperCase());
    // console.log(id1[props]);
    if(props.toUpperCase()=="DEPTH")
    {
      // console.log((id1[props]).toUpperCase());
      if ((id1[props].toUpperCase())!="\""+(depth.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(city.toUpperCase()),"1");   
        data=true;
      }
    }
    if(props.toUpperCase()=="AREA")
    {
      
      if ((id1[props].toUpperCase())!="\""+(area.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(area.toUpperCase()),"2");
        data1=true;
      }
    }
  }
  if(data||data1)
  {
   delete newpost[id]; 
  }
}
// console.log(newpost,"dataaa");
res.render("comp",{new1:newpost});
}

else if((city!="All")&&(area=="All")&&(depth!="All"))
{
for(var id in newpost)
{
  // console.log(newpost[id]);
  var data=false,data1=false;
  var id1=newpost[id];
  for(var props in id1)
  {
    // console.log(props.toUpperCase());
    // console.log(id1[props]);
    if(props.toUpperCase()=="DEPTH")
    {
      // console.log((id1[props]).toUpperCase());
      if ((id1[props].toUpperCase())!="\""+(depth.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(city.toUpperCase()),"1");   
        data=true;
      }
    }
    if(props.toUpperCase()=="CITY")
    {
      
      if ((id1[props].toUpperCase())!="\""+(city.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(area.toUpperCase()),"2");
        data1=true;
      }
    }
  }
  if(data||data1)
  {
   delete newpost[id]; 
  }
}
// console.log(newpost,"dataaa");
res.render("comp",{new1:newpost});
}

else if((city!="All")&&(area!="All")&&(depth=="All"))
{
for(var id in newpost)
{
  // console.log(newpost[id]);
  var data=false,data1=false;
  var id1=newpost[id];
  for(var props in id1)
  {
    // console.log(props.toUpperCase());
    // console.log(id1[props]);
    if(props.toUpperCase()=="CITY")
    {
      // console.log((id1[props]).toUpperCase());
      if ((id1[props].toUpperCase())!="\""+(city.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(city.toUpperCase()),"1");   
        data=true;
      }
    }
    if(props.toUpperCase()=="AREA")
    {
      
      if ((id1[props].toUpperCase())!="\""+(area.toUpperCase())+"\"")
      {
        // console.log((id1[props].toUpperCase()),(area.toUpperCase()),"2");
        data1=true;
      }
    }
  }
  if(data||data1)
  {
   delete newpost[id]; 
  }
}
// console.log(newpost,"dataaa");
res.render("comp",{new1:newpost});
}

});
});

app.get("/newlocation/lat/:latitude/long/:longitude",function(req,res){
  var a=req.params.latitude;
  var b=req.params.longitude;
  // console.log(a,b);
  res.render("newmap",{latt:a,long:b});
});

app.post("/status",function(req,res){
  var coo=ref.once("child_added",function(snapshot,prev) {
    var ids=req.body.uid;
    var ids2=req.body.uid2;
    // console.log(id,id2,"aaaaaa");
    var newpost=snapshot.val();
    for(var id in newpost)
    {var a1,a2,uids;
      var aa=newpost[id];
      for(var props in aa)
      {var mn=aa[props];
        // console.log(mn);
      if(mn=='"lat"')
      {
       a1=props;
      //  console.log(a1,"uidssss");

      }
      if(mn=='"lng"')
      {
       a2=props;
      //  console.log(a2,"uids");
      }
      if(props.toUpperCase()=="UID")
      {
       uids=id;
      //  console.log(uids);
      }
      // console.log(a1,ids,a2,ids2,"innnn")

      if((a1==ids)&&(a2==ids2))
      {
        console.log("innnn")
          var hopperRef = ref.child("map/"+uids);
          hopperRef.update({
          "paint": "true"
          });        
      }
      
      }
    }
  });
  // console.log(id);
//   var hopperRef = ref.child("map/"+id);
// hopperRef.update({
//   "paint": "true"
// });
res.redirect("/complaints")
});

app.post("/status/white",function(req,res){
  var coo=ref.once("child_added",function(snapshot,prev) {
    var ids=req.body.uid;
    var ids2=req.body.uid2;
    // console.log(id,id2,"aaaaaa");
    var newpost=snapshot.val();
    for(var id in newpost)
    {var a1,a2,uids;
      var aa=newpost[id];
      for(var props in aa)
      {var mn=aa[props];
        // console.log(mn);
      if(mn=='"lat"')
      {
       a1=props;
      //  console.log(a1,"uidssss");

      }
      if(mn=='"lng"')
      {
       a2=props;
      //  console.log(a2,"uids");
      }
      if(props.toUpperCase()=="UID")
      {
       uids=id;
      //  console.log(uids);
      }
      // console.log(a1,ids,a2,ids2,"innnn")
      }
      if((a1==ids)&&(a2==ids2))
      {
        // console.log("innnn");
        // console.log(a1,ids,a2,ids2,"innnn");

          var hopperRef = ref.child("map/"+uids);
          hopperRef.update({
          "paint": "true1"
          });        
      }
    }
  });
  // console.log(id);
//   var hopperRef = ref.child("map/"+id);
// hopperRef.update({
//   "paint": "true"
// });
res.redirect("/complaints")
});

var server=app.listen(3000);
console.log("server connected ...");
  
