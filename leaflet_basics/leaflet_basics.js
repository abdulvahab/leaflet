
window.onload = function () {
// initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// load a tile layer
var baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWtoYXJhZGkiLCJhIjoiY2s1NXk5aTdiMDFsMjNtbzFtZTZ0ZWdhOSJ9.yzU4BiBWWuTuw4gSHrw1tg'
});


var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 400
});

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
],{
    fillColor:"red",
    fillOpacity : 0.5
});

var marker = L.marker([51.5, -0.09]);



baseLayer.addTo(map);
circle.addTo(map);
marker.addTo(map);
polygon.addTo(map) 

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");


};