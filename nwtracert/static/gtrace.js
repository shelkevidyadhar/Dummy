
function trace() {
    domain = document.getElementById("domain").value;
    if(domain == ""){
        document.getElementById("domain").focus();
        return;
    }

    document.getElementById("iplist").innerHTML = "Tracing " + domain + "<br> Please wait for few seconds..";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ips = this.responseText;
            ips = ips.split(",");
            ips[ips.length - 1] = ips[0];
            len = ips.length;
            res = "<strong>  " + domain + ": " + ips[0] + "<br> </strong> Traceroute is : <br>";
            res += "<ol>";
            for( var i = 1; i < len; i++){
                res += "<li>" + ips[i] + "</li>";
            }
            res +="</ol>";
            document.getElementById("iplist").innerHTML = res;
        }
    };
    xhttp.open("GET", "/tracedomain?ip=" + domain, true);
    xhttp.send();
}

var marker = [];
var dict = {};
function plot() {
    for(var i = 1; i < marker.length; i++){
        marker[i].setMap(null);
    }
    marker.length = 0;
    for(var i = 1; i < ips.length; i++) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                loc = this.responseText;
                //console.log(loc);
                loc = loc.split(",");
                lat = loc[1];
                longi = loc[2];
                
                for(var j = 1; j < ips.length; j++) {
                    if(ips[j] == loc[0]){
                        if (parseFloat(lat) == 0 && parseFloat(longi) == 0) {
                            lat = "12.9141";
                            longi = "74.8560"
                        }
                        marker[j] = new google.maps.Marker({
                            position: {lat: parseFloat(lat), lng: parseFloat(longi)}, 
                            label: "-" + j + "-", map: map
                        });       
                        dict[loc[0]] = lat + "," + longi;
                        console.log("#" + j + ": IP Address: " + loc[0] + "Lattitute: " + lat + "Longitude: " + longi);
                        break;
                    }
                }
            }
        };
        xhttp.open("GET", "/location?ip=" + ips[i], true);
        xhttp.send();
    }
    //console.log("Total Markers added: " + marker.length);
}

//var pathdata = [];
function makepath(){
    var pathdata = [];
    if (!(typeof flightPath === 'undefined')){
        flightPath.setMap(null);
    }

    var temp, k;
    for(var i = 1; i < marker.length; i++){
        temp = dict[ips[i]];
        value = temp.split(",");
        pathdata.push({lat: parseFloat(value[0]), lng: parseFloat(value[1])});
    }
    var flightPath = new google.maps.Polyline({
          path: pathdata,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
    flightPath.setMap(map);
}
/*

74.117.114.119
192.168.43.1
10.71.164.2
192.168.4.150
192.168.4.187
172.26.8.11
103.198.140.182
103.198.140.39
206.82.104.185
69.85.197.225
170.249.185.86
69.85.197.198
69.85.197.241
170.249.185.198
170.249.185.142
69.85.197.170
69.85.248.254
72.20.178.67

*/