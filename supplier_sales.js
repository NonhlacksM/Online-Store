// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
    authDomain: "online-store-b90ca.firebaseapp.com",
    databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
    projectId: "online-store-b90ca",
    storageBucket: "online-store-b90ca.appspot.com",
    messagingSenderId: "160581372978",
    appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
    measurementId: "G-PH4QNCPP2J"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  var contactFormDB = firebase.database().ref("Shipping");

  const months = 
  ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
  var position;
  var email;

  var xsales;
  var ysales;
  var total;
  var units;
  var purchase;

  function start(){
    email = localStorage.getItem('supplier_email');
    //email = "irene@gmail.com";
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();

    orderMonth(month, year);
    monthDays(month+1, year);

    document.getElementById("headd").innerHTML = "Details of the Sales made in "+months[month]+" "+year;
    
    getDetails(email, month+1, year);
  }

  function selected(){
    var select = document.querySelector('select');
    var pos = select.value;

    month = position[pos][0];
    year = position[pos][1];

    document.getElementById("headd").innerHTML = "Details of the Sales made in "+months[month]+" "+year;

    monthDays(month+1, year);
    getDetails(email, month+1, year);
  }

  function orderMonth(month, year){
    var pos;
    position = [];
    var j = 0;

    for (let i=month; i>=0; i--){
      pos = "position" + String(j);
      document.getElementById(pos).innerHTML = months[i]+" "+year;
      position[j] = [i, year];
      j++;
    }

    for (let i=11; i>month; i--){
      pos = "position" + String(j);
      document.getElementById(pos).innerHTML = months[i]+" "+(year-1);
      position[j] = [i, year-1];
      j++;
    }
  }

  function monthDays(month, year){
    const days = new Date(year, month, 0).getDate();

    xsales = [];
    ysales = [];
    total = 0;
    units = 0;
    purchase = 0;

    for (let i=0; i<days; i++){
      xsales[i] = i+1;
      ysales[i] = 0;
    }
  }

  function getDetails(email, month, year){
    console.log("getDetails");
    // attach a listener to the Firebase database reference
    // this listener will be called whenever the value of the database changes
    // it will iterate over all the child snapshots of the "onlinestore" node
    contactFormDB.orderByChild("supplier_email").equalTo(email).once("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            var date = childSnapshot.val().date;
            var dat = date.split("/");

            if (month==parseInt(dat[1]) && year==parseInt(dat[2])){
              ysales[parseInt(dat[0])-1] = ysales[parseInt(dat[0])-1] + parseInt(childSnapshot.val().price);
              total = total + parseInt(childSnapshot.val().price);
              units = units + parseInt(childSnapshot.val().quantity);
              purchase = purchase + 1;
            }
        });
        makeLine(month, year);

        document.getElementById("total").innerHTML = "Total Revenue:  R" + total;
        document.getElementById("units").innerHTML = "Units Sold:  " + units+" units";
        document.getElementById("purchase").innerHTML = "Total Orders:  " + purchase;
    });
  } 

  function makeLine(month, year){
    new Chart("myLine", {
      type: "line",
      data: {
        labels: xsales,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.5)",
          data: ysales
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 0}, 
          scaleLabel:{display: true, labelString:"Revenue"}}],
          xAxes: [{scaleLabel:{display: true, labelString:"Days"}}],
        },
        title: {
          display: true,
          text: "Sales in "+months[month-1]+" "+year,
          fontSize: 30
        }
      }
    });
  }





