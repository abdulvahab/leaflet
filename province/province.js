window.onload = function () {

var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

//L.mapbox.accessToken = 'pk.eyJ1IjoiYWtoYXJhZGkiLCJhIjoiY2s1NXk5aTdiMDFsMjNtbzFtZTZ0ZWdhOSJ9.yzU4BiBWWuTuw4gSHrw1tg';

// EDIT HERE: add the new baselayer style, replace 'YOURLINKHERE' with something like "kimpham54.au2i6bt9"
/*var basemap = L.tileLayer('https://api.mapbox.com/v4/kimpham54.au2i6bt9/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: '<a href="https://www.mapbox.com/tos/">Mapbox</a>'
    });*/
function style_color(d){
    return  d < 80015 ? '#800026' :
            d < 80030  ? '#BD0026' :
            d < 80045   ? '#E31A1C' :
            d < 80060  ? '#FC4E2A' :
                    '#FFEDA0';
    };

var geojsonLayer;

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Arename in English:</h4>' +  (props ?
        '<b>' + props.areanameenglish + '</b><br />' + props.areanamelocallanguage + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};



function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
};


function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
    info.update();
};

function areaPage(e) {
    url = 'https://test34.d-moss.org/' + 'dengue/' + fd.lang + '/province/' + e.target.feature.properties.areaid;
    window.location.href = url;
};



$.getJSON("province.geojson", function(data) {

        geojsonLayer = L.geoJson(data,{
        onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.areanameenglish);
        layer.on({
            mouseover:highlightFeature,
            mouseout: resetHighlight,
            click: areaPage
        });
      },

        style: function(feature){
        return {
            fillColor: style_color(feature.properties.areaid), // Default color of countries.
            fillOpacity: 1,
            stroke: true,
            color: "grey", // Lines in between countries.
            weight: 2
            }; 
        }
    });

// initialize the map
var map = L.map('map')
.fitBounds(geojsonLayer.getBounds());


basemap.addTo(map);  
geojsonLayer.addTo(map);
info.addTo(map);

});
};

