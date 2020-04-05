$.getJSON(
  "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
  null,
  function (data) {
    resp = data.data.total;
    var j = "<tbody>";
    j += "<tr>";
    j += "<td>" + resp.confirmed + "</td>";
    j += "<td>" + resp.active + "</td>";
    j += "<td>" + resp.deaths + "</td>";
    j += "<td>" + resp.recovered + "</td>";
    j += "</tr>";
    j += "</tbody>";
    // j += "<p>" + resp2.total + "</p>";
    document.getElementById("india_data").innerHTML = j;

    var mainD = document.getElementById("india_data");
    mainD.getElementsByTagName('td')[0].style.color = "red";
    mainD.getElementsByTagName('td')[1].style.color = "green";
    mainD.getElementsByTagName('td')[2].style.color = "blue";
    mainD.getElementsByTagName('td')[3].style.color = "#8A2BE2";
    mainD.getElementsByTagName('td').style.fontSize = "24px";
    
  }
);

$.getJSON(
  "https://coronavirus-worlddata.herokuapp.com/total",
  null,
  function (data) {
    resp = data;
    var j = "<tbody>";
    j += "<tr>";
    j += "<td>" + resp.total + "</td>";
    j += "<td>" + resp.active + "</td>";
    j += "<td>" + resp.deaths + "</td>";
    j += "<td>" + resp.cured + "</td>";
    j += "</tr>";
    j += "</tbody>";
    // j += "<p>" + resp2.total + "</p>";
    document.getElementById("worlds_data").innerHTML = j;

    var mainD = document.getElementById("worlds_data");
    mainD.getElementsByTagName('td')[0].style.color = "red";
    mainD.getElementsByTagName('td')[1].style.color = "green";
    mainD.getElementsByTagName('td')[2].style.color = "blue";
    mainD.getElementsByTagName('td')[3].style.color = "#8A2BE2";
    mainD.getElementsByTagName('td').style.fontSize = "24px";
  }
);


$(document).ready(function () {
  $.getJSON(
    "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
    null,
    function (data) {
      Obj = data.data.statewise;
      mainObj = data.data.statewise.sort(function (a, b) {
        return b.confirmed - a.confirmed;
      });
      var loca = [];
      var cases = [];
      var curedcases = [];
      var death = [];
      for (var i = 0; i < mainObj.length - 9; i++) {
        loca.push(mainObj[i].state);
        cases.push(mainObj[i].confirmed);
        curedcases.push(mainObj[i].recovered);
        death.push(mainObj[i].deaths);
      }

      var ctx = document.getElementById("canvas").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: loca,
          datasets: [{
              label: "Infected",
              data: cases,
              backgroundColor: "yellow",
              borderColor: "yellow",
              fill: false
            },
            {
              label: "Cured",
              fill: false,
              backgroundColor: "green",
              borderColor: "green",
              data: curedcases
            },
            {
              label: "Deaths",
              fill: false,
              backgroundColor: "red",
              borderColor: "red",
              data: death
            }
          ]
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: "black",
              fontSize: 16
            }
          },
          responsive: true,
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: "States",
                fontColor: "black",
                fontSize: 16
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "No. of people",
                fontColor: "black",
                fontSize: 16
              }
            }]
          }
        }
      });
    }
  );
});


$(document).ready(function () {
  $.getJSON(
    "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
    null,
    function (data) {
      mainObj = data.data.statewise.sort(function (a, b) {
        return b.confirmed - a.confirmed;
      });
      var k = "<tbody>";
      for (i = 0; i < mainObj.length; i++) {
        k += "<tr>";
        k += "<td>" + mainObj[i].state + "</td>";
        k += "<td>" + mainObj[i].confirmed + "</td>";
        k += "<td>" + mainObj[i].active + "</td>";
        k += "<td>" + mainObj[i].deaths + "</td>";
        k += "<td>" + mainObj[i].recovered + "</td>";
        k += "</tr>";
      }
      k += "</tbody> ";
      document.getElementById("tableData").innerHTML = k;
    }
  );
});
$(document).ready(function () {
  fetch('helpline.json')
    .then(res => {
      res.json().then(
        data => {
          // console.log(data);
          if (data.length > 0) {
            var temp = "";

            data.forEach((u) => {
              temp += "<tr>";
              temp += "<td>" + u.loc + "</td>";
              temp += "<td>" + u.number + "</td>";
              temp += "</tr>";
            })
            document.getElementById("helpline").innerHTML = temp;
          }
        }
      )
    });
});
$(document).ready(function () {
  fetch('https://api.coronastatistics.live/countries')
    .then(res => {
      res.json()
        .then(
          data => {
            console.log(data);
            if (data.length > 0) {
              // u.cases.sort()
              var world = "";
              data.sort((a, b) => b.cases - a.cases);

              data.forEach((u) => {
                world += "<tr>";
                world += "<td>" + u.country + "</td>";
                world += "<td>" + u.cases + "</td>";
                // world += "<td>" + u.todayCases + "</td>";
                world += "<td>" + u.recovered + "</td>";
                world += "<td>" + u.deaths + "</td>";
                world += "<td>" + u.active + "</td>";

                // world += "<td>" + u.todayDeaths + "</td>";
                // world += "<td>" + u.critical + "</td>";
                world += "</tr>";
              })
              document.getElementById("world_data").innerHTML = world;
            }
          }
        )
    });
});





$(document).ready(function () {
  $.getJSON("https://cryptic-ravine-96718.herokuapp.com/", null, function (
    data
  ) {
    var news = document.getElementById("news");
    var newcol = document.createElement("ul");
    newcol.setAttribute("class", "list-inline");
    news.appendChild(newcol);
    for (var i = 0; i < 8; i++) {
      var li = document.createElement("li");
      li.setAttribute("class", "list-inline-item");
      var card = document.createElement("div");
      card.setAttribute("class", "card");
      card.style.width = "15rem";
      card.style.marginRight = "1rem";
      card.style.marginBottom = "2rem";
      // card.style.border="2px solid black";
      card.style.boxShadow = "none";
      var card_title = document.createElement("h6");
      card_title.innerHTML = data.news[i].title;
      card_title.setAttribute("classs", "card-title");
      card_title.style.color = "#000000"
      var news_img = document.createElement("img");
      news_img.style.height = "250px";
      news_img.style.width = "250px";
      news_img.setAttribute("src", data.news[i].img);
      news_img.setAttribute("class", "card-img-top");
      var btntoart = document.createElement("a");
      btntoart.setAttribute("class", "btn btn-main");
      btntoart.style.color = "#fff";
      btntoart.style.width = "100%";
      btntoart.style.marginTop = "10px";
      btntoart.style.background = "#343A40";
      btntoart.setAttribute("href", data.news[i].link);
      btntoart.innerHTML = "Read More";
      var card_body = document.createElement("div");
      card_body.setAttribute("class", "card-body");
      card_body.appendChild(card_title);
      card_body.appendChild(btntoart);
      card_body.style.background = "linear-gradient(to right, #8e2de2, #4a00e0) !important";

      card.appendChild(news_img);
      card.appendChild(card_body);
      li.appendChild(card);
      newcol.appendChild(li);
    }
  });
});

// let resp = null;
// let resp2 = null;

$(document).ready(function () {
  $("#btn-graph").on("click", function () {
    var graph = document.getElementById("graph-data");
    var map = document.getElementById("map-data");
    graph.style.display = "block";
    map.style.display = "none";
  });

  $("#btn-map").on("click", function () {
    var graph = document.getElementById("graph-data");
    var map = document.getElementById("map-data");
    graph.style.display = "none";
    map.style.display = "block";
  });
});

$(document).ready(function () {
  $("#btn-offical").on("click", function () {
    var offical = document.getElementById("offical-data");
    var fast = document.getElementById("fast-data");
    offical.style.display = "block";
    fast.style.display = "none";
  });

  $("#btn-fast").on("click", function () {
    var offical = document.getElementById("offical-data");
    var fast = document.getElementById("fast-data");
    offical.style.display = "none";
    fast.style.display = "block";
  });
});