
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
            len = ips.length;
            res = "<strong>  " + domain + ": " + ips[0] + "<br> </strong> Traceroute is : <br>";
            res += "<ol>";
            for( var i = 1; i < len - 1; i++){
                res += "<li>" + ips[i] + "</li>";
            }
            res +="</ol>";
            document.getElementById("iplist").innerHTML = res;
        }
    };
    xhttp.open("GET", "/tracedomain?ip=" + domain, true);
    xhttp.send();
}

function plot() {
    for(var i = 1; i < ips.length - 1; i++) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                loc = this.responseText;
                console.log(loc);
                loc = loc.split(",");
                lat = loc[1];
                longi = loc[2];
                console.log("#" + i + "IP Address: " + loc[0] + "Lattitute: " + lat + "Longitude: " + longi);
                var marker = tomtom.L.marker([lat, longi]).addTo(map);
                marker.bindPopup(i);
            }
        };
        xhttp.open("GET", "/location?ip=" + ips[i], true);
        xhttp.send();
    }
}