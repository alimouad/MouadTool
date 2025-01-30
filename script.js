// const { geojson } = require("shp-write/src/fields");

// spinner on loading page////
$(window).on('load', function () {
    $('sk-cube-grid').css("display", "none")
    $('.loader').fadeOut('5000')
})

window.onload = function () {
    var container = document.querySelector('.containr');
    container.style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
};

// adding map view/////
const myMap = L.map("map", {
    measureControl: true,
    // click on the map ////
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [
    {
        text: 'start here',
        callback: startHere
    }, {
        text: "go here",
        callback: goHere
    }
    ,{
        text: 'hide routing',
        callback: hiedRouting
    }
    ],
    // pmIgnore: false,
    // crs: L.CRS.EPSG4326,
    crs: L.CRS.EPSG3857
    // crs: crs,
}).setView([30.386, -3.319], 5);



// define morocco projection/////
var popup = L.popup({
    offset: [0, -10]
});
var marker;
var spl = "+proj=longlat +datum=WGS84 +no_defs"
var bnprojct1 = "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs "
var bnprojct2 = "+proj=lcc +lat_1=29.7 + lat_0=29.7 + lon_0=-5.4 + k_0=0.9996155960000001 + x_0=500000 + y_0=300000 + a=6378249.2 + b=6356515 + towgs84=31, 146, 47, 0, 0, 0, 0 + units=m + no_defs"
var bnprjct3 = "+proj=lcc +lat_1=26.1 +lat_0=26.1 +lon_0=-5.4 +k_0=0.999616304 +x_0=1200000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs "
var bnprjct4 = "+proj=lcc +lat_1=22.5 +lat_0=22.5 +lon_0=-5.4 +k_0=0.999616437 +x_0=1500000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs ";
let proArr = [bnprojct1, bnprojct2, bnprjct3, bnprjct4]

// projection for mouse hover/////
var resolutions = [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
    1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1];
const crs = new L.Proj.CRS(
    "EPSG:26191",
    "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2+b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs", {
    // // "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs", {
    origin: [336537.75, 137000.85],
    // resolutions: resolutions,
});
const crs2 = new L.Proj.CRS(
    "EPSG:26192",
    "+proj=lcc +lat_1=29.7 + lat_0=29.7 + lon_0=-5.4 + k_0=0.9996155960000001 + x_0=500000 + y_0=300000 + a=6378249.2 + b=6356515 + towgs84=31, 146, 47, 0, 0, 0, 0 + units=m + no_defs", {
    // // "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs", {
    origin: [336537.75, 137000.85],
    resolutions: resolutions,
});
const crs3 = new L.Proj.CRS(
    "EPSG:26194",
    "+proj=lcc +lat_1=26.1 +lat_0=26.1 +lon_0=-5.4 +k_0=0.999616304 +x_0=1200000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs ", {
    // // "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs", {
    origin: [336537.75, 137000.85],
    resolutions: resolutions,

});
const crs4 = new L.Proj.CRS(
    "EPSG:26195",
    "+proj=lcc +lat_1=22.5 +lat_0=22.5 +lon_0=-5.4 +k_0=0.999616437 +x_0=1500000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs ", {
    // // "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs", {
    origin: [336537.75, 137000.85],
    resolutions: resolutions,
});
var myCRS = new L.Proj.CRS("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs +type=crs");


// variables////
var baseMaps;
var overlays;
// var drawControl;
// var drawnFeatures;
var mycrlocation;
var mouseCoord;
var polyMesure;
var easyBtn;
var curreLocation;
var ctlStyle;
var moroccoBou;
var lyrGoogleMap;
var lyrGoogleHybrid;
var googleStreets; 
var osmMap;
var imageryMap;
var googleSat;
var geoData;
var selected;
var layerControl;
var drawnFeatures
var layerKml
var shapefile
var geoSearch
var items = [];
var data





// define tileLayer/////
osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
imageryMap = L.tileLayer.provider('Esri.WorldImagery');

googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
lyrGoogleMap = L.tileLayer('http://mts3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    maxNativeZoom: 20
})
lyrGoogleHybrid = L.tileLayer('http://mts2.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 25,
    maxNativeZoom: 20
})
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(myMap);


// Esri map////
const apiKey = "AAPKbb4968d70d7242ea8952170a417c2c79m1C8xvuIpsv9iLAVd66RXaUZet3HWYwgcC42-UUVejxrd540jO3Qz7OJho114pJL";

var EsriMap = L.esri.Vector.vectorBasemapLayer("ArcGIS:Navigation", {
    apikey: apiKey
});

// join all layer in layerControl/////
baseMaps = {
    "Esri Map": EsriMap,
    'OSM': osmMap,
    // 'Google Street': googleStreets,
    // 'Open Topo': openTopo,
    "Google-sat": googleSat,
    'World Imagery': imageryMap,
    "Google-Map": lyrGoogleMap,
    "Google-Hybrid": lyrGoogleHybrid
};





overlays = L.layerGroup()
drawnFeatures = new L.FeatureGroup();
// overlays.addLayer(moroccoBou,'morocc - boundaries');
layerControl = L.control.layers(baseMaps).setPosition('topright').addTo(myMap);
// layerControl.addOverlay(moroccoBou,"maroc");
layerControl.addOverlay(drawnFeatures, "drawn");

// Leaflet Pluguins////////////
// **********************************

// geocoder////////////
L.Control.geocoder({
    position: 'topright'
}).addTo(myMap);
// Distance mesure//////
polyMesure = L.control.polylineMeasure({
    position: 'topleft',
    unit: 'meter',
    bearingTextIn: 'In',            // language dependend label for inbound bearings
    bearingTextOut: 'Out',
    measureControlTitle: "Measure Length",         // language dependend label for outbound bearings
    showUnitControl: true,         // Show a control to change the units of measurements
    // unitControlUnits: ["kilometres", "landmiles", "nauticalmiles"],
}).addTo(myMap)

// Distance and area measurement
L.control.measure({
    // collapsed: false,
    title : "mesurer la surface"
}).addTo(myMap);


L.Measure = {
    linearMeasurement: "masurer la Distance ",
    areaMeasurement: "mesurer la surface",
    start: "Start",
    meter: "m",
    kilometer: "km",
    squareMeter: "m²",
    squareKilometers: "km²",
};


// Routing///////////
var control = L.Routing.control({
    position: "topright",
    // waypoints: [
    //     L.latLng(30.77172, -7.232),
    //     L.latLng(32.77172, -6.232),
    // ],
    // showAlternatives: true,
    altineOptions: {
        styles: [
            { color: "black", opacity: 0.15, weight: 9 },
            { color: "white", opacity: 0.15, weight: 9 },
            { color: "blue", opacity: 0.15, weight: 6 }
        ]
    },
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(myMap)




// R functinons//
var spiner = true;
function showSpiner() {
    if (spiner) {
        document.querySelector(".sk-cube-grid").style.display = 'block'
        // $('.sk-cube-grid').fadeOut('2000')
    }
}
function hideSpiner() {
    document.querySelector(".sk-cube-grid").style.display = 'none'
}

function startHere(e) {
    control.spliceWaypoints(0, 1, e.latlng)
    document.querySelector('.leaflet-routing-container').style.display = 'block'
}
function goHere(e) {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng)
}
function hiedRouting(e) {
    document.querySelector('.leaflet-routing-container').style.display = 'none'
}


// current Locations////
curreLocation = L.control.locate({
    // position: "topright",
    flyTo: true,  /// smouth action
    circleStyle: {
        radius: 19
    },
    strings: {
        title: "localiser"
    },
    showPopup: true
}).addTo(myMap);


// Easy button to show coordinate when map be clicked/////
var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

easyBtn = L.easyButton({
    states: [{
        stateName: 'show-coordinates',        // name the state
        icon: 'fa-solid fa-map-location-dot',     // and define its properties
        title: 'show coordinates',      // like its title
        onClick: function (btn, map) {
            var labels = document.querySelectorAll(".box >input:checked")

            labels.forEach((label) => {
                console.log(label);
                var idLabel = label.id;
                var idInput = document.getElementById(idLabel).labels[0];
                var contPro = idInput.querySelector('.text span').innerText
                // var labelContent = labelItem.innerText
                // console.log(labelContent);
                map.on('click', (e) => {

                    var latlon = e.latlng;
                    if (marker != null) {
                        marker.remove();
                        marker = null;
                    }
                    marker = L.marker(latlon, { icon: greenIcon }).addTo(myMap)
                var bngcoords = proj4(spl, pro).forward([latlon.lng, latlon.lat], true);
                var lng = bngcoords[0].toFixed(2).toString();
                var lat = bngcoords[1].toFixed(2).toString();
                popup
                    .setLatLng(e.latlng)
                    .setContent(`<p> <span> X :</span>   ${lng} | <span> Y :</span>  ${lat} </p>
                    <p>Zone: ${contPro}</p>`)
                    .openOn(myMap)
            })
            if (idLabel == "option-1") {
                map.on('click', (e) => {
                         
                    //   marker.setLatLng(e.latlng)
                        var latlon = e.latlng;
                        var bngcoords = proj4(spl, pro).forward([latlon.lng, latlon.lat], true);
                        var lng = bngcoords[0].toFixed(5).toString();
                        var lat = bngcoords[1].toFixed(5).toString();
                        popup
                            .setLatLng(e.latlng)
                            .setContent(`<p> <span> Lat:</span>   ${lat} | <span> Long:</span>  ${lng}</p>`)
                            .openOn(myMap)
                    })
                }
                if (idLabel == "option-2") {
                    var pro = proArr[0];
                }
                else if (idLabel == "option-3") {
                    var pro = proArr[1];
                }
                else if (idLabel == "option-4") {
                    var pro = proArr[2];
                }
                else if (idLabel == "option-5") {
                    var pro = proArr[3];
                }
          
            });
            // / // and its callback
           
            btn.state('hide-coordinates');
            // change state on click!
        }
    }, {
        stateName: 'hide-coordinates',
        icon: 'fa-solid fa-map',
        title: 'hide coordinates',
        onClick: function (btn, map) {
            myMap.removeLayer(marker);
            myMap.removeLayer(popup);
            if (marker != null) {
                marker.remove();
                marker = null;
            }

            map.on('click', function () {
                myMap.removeLayer(popup);
                myMap.removeLayer(marker);
               
                })      
            btn.state('show-coordinates')
            }
        }]
}).addTo(myMap)



// print pluguins////
var customActionToPrint = function (context, mode) {
    return function () {
        window.alert("We are printing the MAP. Let's do Custom print here!");
        context._printMode(mode);
    }
};
// Print //////
var options = {
    documentTitle: 'Map printed using leaflet.browser.print plugin',
    closePopupsOnPrint: false,
    printModes: [
        // L.BrowserPrint.Mode.Landscape("Tabloid", { title: "Tabloid VIEW" }),
        // L.browserPrint.mode("Alert", { title: "User specified print action", pageSize: "A6", action: customActionToPrint, invalidateBounds: false }),
        L.BrowserPrint.Mode.Landscape(),
        "Portrait",
        L.BrowserPrint.Mode.Auto("B4", { title: "Auto" }),
        L.BrowserPrint.Mode.Custom("B5", { title: "Select area" })
    ],
    manualMode: false,
    customPrintStyle: { color: "gray", dashArray: "5, 10", pane: "customPrintPane" }
};
// var browserPrint = L.browserPrint(myMap, options).addTo(myMap);
var browserControl = L.control.browserPrint(options).addTo(myMap);



// Draw control/////////////

myMap.pm.addControls({
    positions: {
    draw: 'topright',
    edit: 'topright',
     },
        editControls: true,
        drawMarker: true,
        drawPolyline: false,
        drawCircle: false,
        drawText: true,
        drawCircleMarker: false,
        removalMode: true,
        rotateMode: false,
        layerGroup: drawnFeatures
});
// myMap.pm.setGlobalOptions({
//     layerGroup: drawnFeatures
// })
myMap.on('pm:create', (workingLayer) => {
    drawnFeatures.addLayer(workingLayer.layer);

    // var projGeoJSON = workingLayer.layer.toGeoJSON();
    // var point;
    // for (var i = 0; i < projGeoJSON.geometry.coordinates.length; i++) {
    //     for (var j = 0; j < projGeoJSON.geometry.coordinates[i].length; j++) {
    //         point = L.CRS.EPSG26191.project(L.latLng(projGeoJSON.geometry.coordinates[i][j]));
    //         projGeoJSON.geometry.coordinates[i][j] = [point.y, point.x];
    //     }
    // }

//     layer.bindPopup(`<p>${JSON.stringify(layer.toGeoJSON())}</p>`)
})
myMap.on('pm:edit', (workingLayer) => {
//     layer.bindPopup(`<p>${JSON.stringify(layer.toGeoJSON())}</p>`)
    drawnFeatures.addLayer(workingLayer.layer);
    // var projGeoJSON = workingLayer.layer.toGeoJSON();
    // var point;
    // for (var i = 0; i < projGeoJSON.geometry.coordinates.length; i++) {
    //     for (var j = 0; j < projGeoJSON.geometry.coordinates[i].length; j++) {
    //         point = L.CRS.EPSG26191.project(L.latLng(projGeoJSON.geometry.coordinates[i][j]));
    //         projGeoJSON.geometry.coordinates[i][j] = [point.y, point.x];
    //     }
    // }
})

// down image
L.control.bigImage({ position: 'topleft', inputTitle: 'Obtenir image' }).addTo(myMap);


// $.getJSON('./italy.geojson', function (json) {

//     var geoLayer = L.geoJson(json).addTo(myMap);

    


// Job functions****************************************************************



// click on links to show menu************

function openTabs() {
    let tabs = document.querySelector('.tabs')
        var xValue = document.querySelector('#xCar');
        var yValue = document.querySelector('#yCar');
        xValue.value = "",
        yValue.value = "";
        tabs.classList.toggle("active");
}

function openExportMenu() {
     let expo = document.querySelector('.imxp') 
        expo.classList.toggle("active");
}

// close menu****************
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.tabs').classList.remove("active")
})


// menu switch
let tabs = document.querySelector(".tabs");
let tabHeader = tabs.querySelector(".tab-header");
let tabBody = tabs.querySelector(".tab-body");
let tabIndicator = tabs.querySelector(".tab-indicator");
let tabHeaderNodes = tabs.querySelectorAll(".tab-header > div");
let tabBodyNodes = tabs.querySelectorAll(".tab-body > div");

for (let i = 0; i < tabHeaderNodes.length; i++) {
    tabHeaderNodes[i].addEventListener("click", function () {
        tabHeader.querySelector(".active").classList.remove("active");
        tabHeaderNodes[i].classList.add("active");
        tabBody.querySelector(".active").classList.remove("active");
        tabBodyNodes[i].classList.add("active");
        tabIndicator.style.left = `calc(calc(calc(25% - 5px) * ${i}) + 10px)`;
    });
}

let draggableElem = document.querySelector(".items")

let initialX = 0,
    initialY = 0;
let moveElement = false;

//Events Object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

//Detech touch device
const isTouchDevice = () => {
    try {
        //We try to create TouchEvent (it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

//Start (mouse down / touch start)
draggableElem.addEventListener(events[deviceType].down, (e) => {
    e.preventDefault();
    //initial x and y points
    initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    //Start movement
    moveElement = true;
});

//Move
draggableElem.addEventListener(events[deviceType].move, (e) => {
    //if movement == true then set top and left to new X andY while removing any offset
    if (moveElement) {
        e.preventDefault();
        let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
        let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
        draggableElem.style.top =
            draggableElem.offsetTop - (initialY - newY) + "px";
        draggableElem.style.left =
            draggableElem.offsetLeft - (initialX - newX) + "px";
        initialX = newX;
        initialY = newY;
    }
});

//mouse up / touch end
draggableElem.addEventListener(
    events[deviceType].up,
    (stopMovement = (e) => {
        moveElement = false;
    })
);

draggableElem.addEventListener("mouseleave", stopMovement);
draggableElem.addEventListener(events[deviceType].up, (e) => {
    moveElement = false;
});






// search by coordinates*****************
var btnCo = document.querySelector('#searchbbtn')
var btnWgs = document.querySelector('#searchbttn')
// serach by coordinates function////

function searchCoord(pro) {
    var xValue = document.querySelector('#xCar');
    var yValue = document.querySelector('#yCar');
    // console.log(xValue)
    // console.log(yValue)
    var ltlgArr = [xValue.value, yValue.value];
    console.log(ltlgArr)
    var bngcoords = proj4(spl, pro).inverse([ltlgArr[0], ltlgArr[1]], true);
    var lng = bngcoords[0];
    var lat = bngcoords[1];
    myMap.setView([lat, lng], 12);
    var marker = L.marker([lat, lng]).bindPopup(`X :${ltlgArr[0]} , Y :${ltlgArr[1]}`).openPopup().addTo(myMap);
    xValue.value = "",
    yValue.value = ""
}
function searchWgs() {
    var long = document.querySelector('#xLon');
    var lat = document.querySelector('#yLat');
    var latlngArr = [long.value, lat.value];
    // console.log(latlngArr)
    var lng = latlngArr[0];
    var latt = latlngArr[1];
    myMap.setView([lng, latt], 12);
    var marker = L.marker([lng, latt]).bindPopup(`Lat :${latlngArr[0]} , Long :${latlngArr[1]}`).openPopup().addTo(myMap);
    long.value = "",
    lat.value = ""
}

function showExit() {
    var quit = document.querySelector(".exit")
    quit.classList.toggle("xhow")
}

// exit function
function exit(){
    location.reload()
}

// main function Project all job///////////
var srs
var projBtn = document.querySelector('#projBtn')

projBtn.addEventListener('click', () => {
    var container = document.querySelector('.containr');
    var displayPro = document.querySelector('#showproj')

    var labels = document.querySelectorAll(".box >input:checked")
    labels.forEach((label) => {
        let idLabel = label.id;
        var idInput = document.getElementById(idLabel).labels[0];
        var contPro = idInput.querySelector('.text span').innerText
        displayPro.textContent = contPro;
        switch (idLabel) {
            case "option-1":
                
                document.querySelector('.alert').style.display = 'block'
                btnCo.style.cursor = "not-allowed";
                document.querySelector('.tabs').classList.add('height-300')
                // document.querySelectorAll('.tabs .first').forEach((fir) => {
                //     fir.style.display = 'none'
                // })
                btnWgs.onclick = () => {
                    searchWgs()
                }
                var projC = L.control.coordProjection({
                    crs: 'EPSG4326',
                    separator: " | Long : ",
                    prefix: "Lat :",
                    numDigits: 6,
                }).addTo(myMap);

                break;
            case "option-2":
                srs = crs2
                var pro = proArr[0];
                btnCo.onclick = () => {
                    searchCoord(pro)
                }
                btnWgs.onclick = () => {
                    searchWgs()
                }
                var projC = L.control.coordProjection({
                    crs: crs,
                    separator: " | Y : ",
                    prefix: "X :",
                    numDigits: 2,
                }).addTo(myMap);
                break;
            case "option-3":
                var pro = proArr[1];
                srs = crs3
                btnCo.onclick = () => {
                    searchCoord(pro)
                }
                btnWgs.onclick = () => {
                    searchWgs()
                }
                var projC = L.control.coordProjection({
                    crs: crs2,
                    separator: " | Y : ",
                    prefix: "X :",
                    numDigits: 2,
                }).addTo(myMap);
                break;
            case "option-4":
                var pro = proArr[2];
                btnCo.onclick = () => {
                    searchCoord(pro)
                }
                btnWgs.onclick = () => {
                    searchWgs()
                }
                var projC = L.control.coordProjection({
                    crs: crs3,
                    separator: " | Y : ",
                    prefix: "X :",
                    numDigits: 2,
                }).addTo(myMap);

                break;
            case "option-5":
                srs = crs4
                var pro = proArr[3];
                btnCo.onclick = () => {
                    searchCoord(pro)
                }
                btnWgs.onclick = () => {
                    searchWgs()
                }
                var projC = L.control.coordProjection({
                    crs: crs4,
                    separator: " | Y : ",
                    prefix: "X :",
                    numDigits: 2,
                }).addTo(myMap);
                break;
            default:
                console.log("No value found");
        }
    })
    container.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
})




// export data //////
document.getElementById('exportgeo').onclick = function (e) {
    // Extract GeoJson from featureGroup
    var data = drawnFeatures.toGeoJSON();
    // var projGeoJSON = event.layer.toGeoJSON();
    // Stringify the GeoJson
    var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    // Create export
    document.getElementById('exportgeo').setAttribute('href', 'data:' + convertedData);
    document.getElementById('exportgeo').setAttribute('download', 'mouad.geojson');
}


function showTable() {
    document.getElementById('map').style.height = "calc(74vh - 70px)";
    document.getElementById('table_data').style.height = '25vh';
}
function hideTable() {
    document.getElementById('map').classList.remove("map_active");
    document.getElementById('table_data').classList.remove("table_active");
}
function showhideTable() {
    document.getElementById('map').classList.toggle('map_active')
    document.getElementById('table_data').classList.toggle('table_active')
}
function show_hide_legende() {
    document.querySelector(".items").classList.toggle("afficher")
}


function findRowNumber(cn1, v1) {
    var table = document.querySelector('#table');
    var rows = table.querySelectorAll("tr");
    var msg = "No such row exist"
    for (i = 1; i < rows.length; i++) {
        var tableData = rows[i].querySelectorAll("td");
        if (tableData[cn1 - 1].textContent == v1) {
            msg = i;
            break;
        }
    }
    return msg;
}

// 
// Import files based on Selected Crs//////////////////////////////////// 
function coordsToLatLng(coords) {
    var labels = document.querySelectorAll(".box >input:checked")
    labels.forEach((label) => {
        let idLabel = label.id;
        switch (idLabel) {
            case "option-1":
                srs = myCRS

                break;

            case "option-2":
                srs = crs
               
                break;
            case "option-3":
               
                srs = crs2
                
                break;
            case "option-4":
               srs = crs3
                break;
            case "option-5":
                srs = crs4
                break;
            default:
                console.log("No value found");
        }
    })
    var latLng = srs.unproject(L.point(coords[0], coords[1]));
    return latLng;
};

var itemGeo = document.querySelector('.items .geojson')
var itemShp = document.querySelector('.items .shape')
var itemKml = document.querySelector('.items .kml')
var fileNameGeo = itemGeo.querySelector(".file-name")
var fileNameShp = itemShp.querySelector(".file-name")
var fileNameKml = itemKml.querySelector(".file-name")
var deleteItems = document.querySelectorAll('.delete-item')
var fileNames = document.querySelectorAll('.item .file-name')

fileNames.forEach((file) => {
    file.addEventListener('click', (e) => {
        var itemParent = e.currentTarget.parentElement
        if (itemParent.classList.contains('geojson')) {
            myMap.flyToBounds(geoData.getBounds())
        }
        if (itemParent.classList.contains('kml')) {
            myMap.flyToBounds(layerKml.getBounds())
        }
        if (itemParent.classList.contains('shape')) {
            myMap.flyToBounds(shapefile.getBounds())
        }
    })
})
deleteItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        var itemParent = e.currentTarget.parentElement
        itemParent.classList.remove('showe')
        if (itemParent.classList.contains('geojson')) {
             myMap.removeLayer(geoData);
            layerControl.removeLayer(geoData)
            clear_all()
    //         if (layerKml || shapefile) {
    //             hideTable()
    //             myMap.invalidateSize();
    //             // $('#table').empty();
    //             //$('#table1').empty();
    //             if (layerKml) {
    //                 myMap.flyToBounds(layerKml.getBounds());
    //             }
    //             if (shapefile) {
    //                 myMap.flyToBounds(shapefile.getBounds());
    //             }
    //             else {
    //                 return null
    //             }
                
    // // overlays.clearLayers();
    //         }
    //         else {
    //             clear_all()
    //         }
           
            
        }
        if (itemParent.classList.contains('shape')) {
            myMap.removeLayer(shapefile);
            layerControl.removeLayer(shapefile)
            clear_all()
            // if (layerKml || geoData) {
            //     hideTable()
            //     myMap.invalidateSize();
            //     // $('#table').empty();
            //     //$('#table1').empty();
            //     if (layerKml) {
            //         myMap.flyToBounds(layerKml.getBounds());
            //     }
            //     if (geoData) {
            //         myMap.flyToBounds(geoData.getBounds());
            //     }
            //     else {
            //         return null
            //     }

            //     // overlays.clearLayers();
            // }
            // else {
            //     clear_all()
            // }
        }
        if (itemParent.classList.contains('kml')) {
            myMap.removeLayer(layerKml);
            layerControl.removeLayer(layerKml)
            clear_all()
            // if (geoData || shapefile) {
            //     hideTable()
            //     myMap.invalidateSize();
            //     // $('#table').empty();
            //     //$('#table1').empty();
            //     if (geoData) {
            //         myMap.flyToBounds(geoData.getBounds());
            //     }
            //     if (shapefile) {
            //         myMap.flyToBounds(shapefile.getBounds());
            //     }
            //     else {
            //         return null
            //     }

            //     // overlays.clearLayers();
            // }
            // else {
            //     clear_all()
            // }
        }
    })
    
})
document.getElementById('geojson-file').addEventListener('change', handleFileSelect);

document.querySelector('.imxp .close-btn').addEventListener('click', () => {
    document.querySelector('.imxp').classList.remove("active")
})
//import geoJSON file
function handleFileSelect(event) {
    $('#table').empty();
    if (geoData) {
        overlays.clearLayers();
        layerControl.removeLayer(geoData)
        myMap.removeLayer(geoData);
        fileNameGeo.textContent = ''
    }
    var file = event.target.files[0];
    // console.log(file.name.slice(-7)); // Debugging statement
    if (file &&  file.name.slice(-8) === '.geojson') {
         var reader = new FileReader();
        reader.onload = function (event) {
            // Parse the GeoJSON data
            data = JSON.parse(event.target.result);
            // Add the GeoJSON layer to the map
            geoData = L.geoJson(data, {
             
              coordsToLatLng: coordsToLatLng,
              onEachFeature: onEachFeature,
                // filter: function (feature, layer) {
                //     if (layer === filterMunicipality) return true
                // }
                // style: Ethnic3Style,
            }).addTo(myMap);    
            itemGeo.classList.add('showe')
            fileNameGeo.textContent = file.name
            myMap.flyToBounds(geoData.getBounds(), { padding: [12, 12] })
            layerControl.addOverlay(geoData, file.name);
            setTimeout(showLegend, 1000)
            hundle(data)
            // myMap.on('click', function () {
               
            //         geoData.setStyle({
            //             fillOpacity: 0.2,
            //             'color': '#3388ff'
            //         })
            //     })
           
            // $(document).ready(function () {
            //     var select = $('#layer');
            //     select.append("<option class='ddindent' value='" + file.name + "'>" + file.name + "</option>");
            // })
        //
        };
        reader.readAsText(file);
        alert('the file ulpoaded successfully')
        // checked()

        var hideData = document.querySelector('.hide-table-attribute')
        hideData.style.display = 'flex';
      
        document.querySelector('.imxp').classList.remove("active")
        
} 
    else {
        alert('Please select a valid GeoJSON file.');
    }
}  
 
// hundle data////////////////////////
function hundle(data) {

    var col = [];
    col.push('id');
    for (var i = 0; i < data.features.length; i++) {
        for (var key in data.features[i].properties) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }


    //  Create table to add Element//////
    var table = document.createElement("table");
    table.setAttribute("class", "table table-hover table-striped");
    table.setAttribute("id", "table");

    var caption = document.createElement("caption");
    caption.setAttribute("id", "caption");
    caption.style.captionSide = 'top';
    caption.innerHTML = " (Number of Features : " + data.features.length + " )";
    table.appendChild(caption);
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1); // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.features.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (j == 0) {
                // for f in data["features"]:
                //     f["id"] = f["properties"]["id"]
                tabCell.innerHTML = data.features[i]['id'];
            } else {
                //alert(data.features[i]['id']);
                tabCell.innerHTML = data.features[i].properties[col[j]];
                //alert(tabCell.innerHTML);
            }
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER /////
    var divContainer = document.getElementById("table_data");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    addRowHandlers();
    // showTable()
    myMap.invalidateSize();
}


// load file from Geoserver//////////////////
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/geoserver/wfs?request=getCapabilities",
        dataType: "xml",
        success: function (xml) {
            var select = $('#layer');
            $(xml).find('FeatureType').each(function () {
                //var title = $(this).find('ows:Operation').attr('name');
                //alert(title);
                var name = $(this).find('Name').text();
                //select.append("<option/><option class='ddheader' value='"+ name +"'>"+title+"</option>");
                $(this).find('Name').each(function () {
                    var value = $(this).text();
                    select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                });
            });
            //select.children(":first").text("please make a selection").attr("selected",true);
        }
    });
});
$(function () {
    $("#layer").change(function () {

        var attributes = document.getElementById("attributes");
        var length = attributes.options.length;
        for (i = length - 1; i >= 0; i--) {
            attributes.options[i] = null;
        }

        var value_layer = $(this).val();


        attributes.options[0] = new Option('Select attributes', "");
        //  alert(url);

        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                dataType: "xml",
                success: function (xml) {

                    var select = $('#attributes');
                    //var title = $(xml).find('xsd\\:complexType').attr('name');
                    //	alert(title);
                    $(xml).find('xsd\\:sequence').each(function () {

                        $(this).find('xsd\\:element').each(function () {
                            var value = $(this).attr('name');
                            //alert(value);
                            var type = $(this).attr('type');
                            //alert(type);
                            if (value != 'geom' && value != 'the_geom') {
                                select.append("<option class='ddindent' value='" + type + "'>" + value + "</option>");
                            }
                        });

                    });
                }
            });
        });


    });
});

// operator combo
$(function () {
    $("#attributes").change(function () {

        var operator = document.getElementById("operator");
        var length = operator.options.length;
        for (i = length - 1; i >= 0; i--) {
            operator.options[i] = null;
        }

        var value_type = $(this).val();
        // alert(value_type);
        var value_attribute = $('#attributes option:selected').text();
        operator.options[0] = new Option('Select operator', "");

        if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double' || value_type == 'xsd:long') {
            var operator1 = document.getElementById("operator");
            operator1.options[1] = new Option('Greater than', '>');
            operator1.options[2] = new Option('Less than', '<');
            operator1.options[3] = new Option('Equal to', '=');
            operator1.options[4] = new Option('Between', 'BETWEEN');
        } else if (value_type == 'xsd:string') {
            var operator1 = document.getElementById("operator");
            operator1.options[1] = new Option('Like', 'ILike');

        }

    });
});



// click on button to upload geojson////


function onEachFeature(feature, layer) {
    
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name, { closeButton: false, offset: L.point(0, 0) });
            layer.on('mouseover', function () { layer.openPopup(); });
            layer.on('mouseout', function () { layer.closePopup(); });
    }
    if (feature.properties && feature.properties.type) {
        layer.bindPopup(feature.properties.type,{ closeButton: false, offset: L.point(0, 0) });
            layer.on('mouseover', function () { layer.openPopup(); });
            layer.on('mouseout', function () { layer.closePopup(); });
    }
    layer.on('mouseover', function (e) {
        e.target.setStyle({
            fillOpacity: 0.8
        });
    });
   
    layer.on('mouseout', function (e) {
        e.target.setStyle({
            fillOpacity: 0.2
        });
    });
    // layer.on('click', function (e) {
    //     geoData.resetStyle(e.target);
    //     e.target.setStyle({
    //         fillOpacity: 0.2,
    //         'color': 'blue'
    //     });
    // });


       layer.on('click', function (e) {
        
        // e = event
        // Reset selected to default style
        if (selected) {
            // Reset selected to default style
            geoData.resetStyle(selected);
        }
        selected = e.target;
        selected.setStyle({
            'color': 'red'
        });

        if (feature) {
            let tablee = document.querySelector('#table_data')
            if (!tablee.classList.contains('table_active')) {

                tablee.classList.add('table_active')
                document.querySelector('#map').classList.add('map_active')
            }
            // console.log(feature);
            $(function () {
                $("#table td").each(function () {
                    $(this).parent("tr").css("background-color", "#fcfcfc");
                });
            });
        }

        var table = document.getElementById('table');
        var cells = table.getElementsByTagName('td');
        var rows = document.getElementById("table").rows;
        var heads = table.getElementsByTagName('th');
        var col_no;
        for (var i = 0; i < heads.length; i++) {
            // Take each cell
            var head = heads[i];
            //alert(head.innerHTML);
            if (head.innerHTML == 'id') {
                col_no = i + 1;
                // alert(col_no);
            }
        }
        var row_no = findRowNumber(col_no, feature.id);
        //alert(row_no);
        var rows = document.querySelectorAll('#table tr');
        rows[row_no].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        $(document).ready(function () {
            $("#table td:nth-child(" + col_no + ")").each(function () {

                if ($(this).text() == feature.id) {
                    $(this).parent("tr").css("background-color", "grey");

                }
            });
        });
    });
    var att = feature.properties;
    // return layer.bindTooltip(att[2], { permanent: false, direction: "center" }).openTooltip();
};

function show_hide_querypanel() {
    document.querySelector('#map').classList.toggle('map_inactive')
    document.querySelector('#query_tab').classList.toggle('query_active')
}

// function for loading query

function query() {

    myMap.removeLayer(geoData);
    $('#table').empty();
    if (geoSearch) {
        myMap.removeLayer(geoSearch);
    }
    


    var layer = document.getElementById("layer");
    var value_layer = layer.options[layer.selectedIndex].value;
    //alert(value_layer);

    var attribute = document.getElementById("attributes");
    var value_attribute = attribute.options[attribute.selectedIndex].text;
    //alert(value_attribute);

    var operator = document.getElementById("operator");
    var value_operator = operator.options[operator.selectedIndex].value;
    //alert(value_operator);

    var txt = document.getElementById("value");
    var value_txt = txt.value;

    if (value_operator == 'ILike') {
        value_txt = "'" + value_txt + "%25'";
        //alert(value_txt);
        //value_attribute = 'strToLowerCase('+value_attribute+')';
    } else {
        value_txt = value_txt;
        //value_attribute = value_attribute;
    }
    //alert(value_txt);




    var url = "http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "%20" + value_operator + "%20" + value_txt + "&outputFormat=application/json"
    //console.log(url);
    $.getJSON(url, function (data) {

        geoSearch = L.geoJson(data, {
            coordsToLatLng: coordsToLatLng,
             onEachFeature: onEachFeature,
             style: Ethnic1Style,
        });
        geoSearch.addTo(myMap);
        // itemGeo.classList.add('showe')
        // fileNameGeo.textContent = value_layer
        myMap.flyToBounds(geoSearch.getBounds(), { padding: [12, 12] })
        // layerControl.addOverlay(geoData, file.name);
        // setTimeout(showLegend, 1000)

        var col = [];
        col.push('id');
        for (var i = 0; i < data.features.length; i++) {

            for (var key in data.features[i].properties) {

                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }



        var table = document.createElement("table");


        //table.setAttribute("class", "table table-bordered");
        table.setAttribute("class", "table table-hover table-striped");
        table.setAttribute("id", "table");

        var caption = document.createElement("caption");
        caption.setAttribute("id", "caption");
        caption.style.captionSide = 'top';
        caption.innerHTML = value_layer + " (Number of Features : " + data.features.length + " )";
        table.appendChild(caption);
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1); // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.features.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (j == 0) {
                    tabCell.innerHTML = data.features[i]['id'];
                    console.log(data.features[i])
                } else {
                    //alert(data.features[i]['id']);
                    tabCell.innerHTML = data.features[i].properties[col[j]];
                    //alert(tabCell.innerHTML);
                }
            }
        }



        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("table_data");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        addRowHandlers();
        var hideData = document.querySelector('.hide-table-attribute')
        hideData.style.display = 'flex';
        document.getElementById('map').classList.add('map_active');
        document.getElementById('map').classList.remove('map_inactive');

        document.getElementById('table_data').classList.add('table_active');
        document.querySelector('#query_tab').classList.remove('query_active')

        myMap.invalidateSize();
    });


}


function removeQuery() {
    if (geoSearch) {
        myMap.removeLayer(geoSearch)
        // if (geoData) {
        myMap.removeLayer(geoData)
        overlays.clearLayers();
        layerControl.removeLayer(geoData)
        // }
        // else {
        //     return null
        // }
        
        geoData = L.geoJson(data, {

            coordsToLatLng: coordsToLatLng,
            onEachFeature: onEachFeature,
            // style: Ethnic3Style,
        }).addTo(myMap);  
        myMap.flyToBounds(geoData.getBounds())
        hundle(data)
    }
}

// highlight the feature on map and table on row select in table


function addRowHandlers() {
    var rows = document.getElementById("table").rows;
    var heads = table.getElementsByTagName('th');
    var col_no;
    for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
        //alert(head.innerHTML);
        if (head.innerHTML == 'id') {
            col_no = i + 1;
            //alert(col_no);
        }
    }
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function () {
            return function () {
                //featureOverlay.getSource().clear();
                if (geoData) {
                    geoData.resetStyle();
                }
                $(function () {
                    $("#table td").each(function () {
                        $(this).parent("tr").css("background-color", "white");
                    });
                });
                var cell = this.cells[col_no - 1];
                var id = cell.innerHTML;
                // console.log(id)


                $(document).ready(function () {
                    $("#table td:nth-child(" + col_no + ")").each(function () {
                        if ($(this).text() == id) {
                            $(this).parent("tr").css("background-color", "grey");
                        }
                    });
                });

                features = geoData.getLayers();

                for (i = 0; i < features.length; i++) {
                    if (features[i].feature.id == id) {
                        // alert(features[i].feature.id);
                        //featureOverlay.getSource().addFeature(features[i]);
                        selected = features[i];
                        selected.setStyle({
                            'color': 'red'
                        });
                        // myMap.flyTo([selected.getBounds()],7);
                        myMap.flyToBounds(selected.getBounds());
                        
                    }
                }
                // alert("id:" + id);
            };
        }(rows[i]);
    }
}



function clear_all() {
    hideTable()
    myMap.invalidateSize();
    $('#table').empty();
    //$('#table1').empty();
    
    myMap.flyTo([30.386, -3.319], 6);
    // overlays.clearLayers();
    var hideData = document.querySelector('.hide-table-attribute')
    hideData.style.display = 'none';
}




// import csv///////

// / / / Add event listener to the file input element
// document.getElementById('csv-file').addEventListener('change', function (e) {
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     // Read the CSV file
//     reader.onload = function () {
//         var csvData = reader.result;
//         // Parse the CSV data using PapaParse library
//         var parsedData = Papa.parse(csvData, { header: true, dynamicTyping: true });
//         // Loop through the parsed data and add markers to the map
//         parsedData.data.forEach(function (row) {
//             var lat = row['latitude'];
//             console.log(lat)
//             var lon = row['longitude'];
//             console.log(lon)
//             var title = row['title'];
//             // console.log(title)
//             var marker = crs.unproject(L.marker([lat, lon])).addTo(myMap).bindPopup(title);
//             // crs.unproject(L.point(coords[0], coords[1]));
//             markers.push(marker);
//         // marker.on('click', function () {
//         //     // Center the map on the clicked marker's location
//         //     myMap.setView([lat, lon], 10);
//         // });
//         // myMap.fitBounds(marker.getBounds())
//     });
//         var csvLayer = new L.featureGroup(markers);
//         layerControl.addOverlay(csvLayer, file.name);
//         myMap.flyToBounds(csvLayer.getBounds())
// };
//     reader.readAsText(file);
//     alert("the file uploaded successfully")
// });


// export KML data //////
document.getElementById('exportkml').onclick = function (e) {
    // Extract GeoJson from featureGroup
    var data = drawnFeatures.toGeoJSON();
    // Stringify the GeoJson
    var kml = tokml(data);
    var convertedData = 'application/xml;charset=utf-8,' + encodeURIComponent(kml);
    // if you want to use the official MIME type for KML
    // var convertedData = 'application/vnd.google-earth.kml+xml;charset=utf-8,' + 
    // encodeURIComponent(kml);

    document.getElementById('exportkml').setAttribute('href', 'data:' + convertedData);
    document.getElementById('exportkml').setAttribute('download', 'data.kml');
}


// import kml========================>>>>>>>>>>>>>////////
document.getElementById('kml-file').addEventListener('change', (e) => {
        if (layerKml) {
        overlays.clearLayers();
        layerControl.removeLayer(layerKml)
        myMap.removeLayer(layerKml);
        fileNameKml.textContent = ''
    }
    let file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var kmlStr = e.target.result;
        var parser = new DOMParser();
        var kmlDoc = parser.parseFromString(kmlStr, 'text/xml');

        var geojson = toGeoJSON.kml(kmlDoc);
        layerKml = L.geoJson(geojson, {
            onEachFeature: onEachFeature,
            coordsToLatLng: coordsToLatLng,
            
            style: Ethnic2Style,
        }).addTo(myMap); // Add the KML data as a GeoJSON layer to the map 
        myMap.flyToBounds(layerKml.getBounds())
        layerControl.addOverlay(layerKml, file.name);
        setTimeout(showLegend, 1000)
        itemKml.classList.add('showe')
        fileNameKml.textContent = file.name
    };

    reader.readAsText(file);
    alert('the file ulpoaded successfully')
    // checked()

});



// import csv=================================>>>>>>>>>>>>//////////////////
var markers = [];




function clearMarkers() {
    markers.forEach(function (marker) {
        myMap.removeLayer(marker);
    });
    markers = [];
}


// export to CSV/////////////////


// import shapefile///////////
document.getElementById('shape-file').addEventListener('change', function (event) {
    if (shapefile) {
        overlays.clearLayers();
        layerControl.removeLayer(shapefile)
        myMap.removeLayer(shapefile);
        fileNameShp.textContent = ''
    }

    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        // shapefile = L.geoJSON(null, {
        //    
        // }).addTo()
        // Convert the shapefile to GeoJSON using shpjs library
        shp(data).then(function (geojson) {
            shapefile = L.geoJson(geojson, {
                style: Ethnic1Style,
                coordsToLatLng: coordsToLatLng,
                onEachFeature: onEachFeature,
            }).addTo(myMap)
            console.log(geojson)
            // Load the converted GeoJSON data into the Leaflet map
            shapefile.clearLayers();
            shapefile.addData(geojson);
            layerControl.addOverlay(shapefile, file.name);
            itemShp.classList.add('showe')
            fileNameShp.textContent = file.name,
                setTimeout(showLegend, 1000)
            // showLegend
            myMap.flyToBounds(shapefile.getBounds())
            var col = [];
            col.push('id');
            for (var i = 0; i < geojson.features.length; i++) {

                for (var key in geojson.features[i].properties) {

                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }


            //  Create table to add Element//////
            var table = document.createElement("table");
            table.setAttribute("class", "table table-hover table-striped");
            table.setAttribute("id", "table");

            var caption = document.createElement("caption");
            caption.setAttribute("id", "caption");
            caption.style.captionSide = 'top';
            caption.innerHTML = " (Number of Features : " + geojson.features.length + " )";
            table.appendChild(caption);
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
            var tr = table.insertRow(-1); // TABLE ROW.
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th"); // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < geojson.features.length; i++) {
                tr = table.insertRow(-1);
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    if (j == 0) {
                        // for f in data["features"]:
                        //     f["id"] = f["properties"]["id"]
                        tabCell.innerHTML = geojson.features[i]['id'];

                    } else {
                        //alert(data.features[i]['id']);
                        tabCell.innerHTML = geojson.features[i].properties[col[j]];
                        //alert(tabCell.innerHTML);
                    }
                }
            }
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER /////
            var divContainer = document.getElementById("table_data");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            addRowHandlers();
            // showTable()
            myMap.invalidateSize();
            reader.readAsText(file);
            alert('the file ulpoaded successfully')
        // checked()

        var hideData = document.querySelector('.hide-table-attribute')
        hideData.style.display = 'flex';

        document.querySelector('.imxp').classList.remove("active")

        }).catch(function (error) {
            console.error(error);
        });  
       
    };
    reader.readAsArrayBuffer(file);
   
    // checked()


})


// export  shapefile///////////////
function exportShapefile() {
    var geojson = drawnFeatures.toGeoJSON(); // Convert Leaflet layers to GeoJSON
    var shapefileContent = shp.write(
        // Convert GeoJSON to shapefile
        shp.combine(geojson.features),
        {
            type: "FeatureCollection",
            features: geojson.features,
        }
    );
    var blob = new Blob([shapefileContent], {
        type: "application/zip",
    });
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "exported_shapefile.zip";
    downloadLink.click();
}



// file imported styling/////////////////////
function Ethnic1Style() {
    return {
        fillColor: 'rgb(145, 228, 0)',
        weight: 3,
        opacity: 1,
        color: 'rgb(145, 228, 0)',
        dashArray: '1',
        fillOpacity: 0.2
    };
}
function Ethnic2Style() {
    return {
        fillColor: '#753a88',
        weight: 3,
        opacity: 1,
        color: '#753a88',
        dashArray: '1',
        fillOpacity: 0.2
    };
}
function Ethnic3Style() {
    return {
        fillColor: '#ffa751',
        weight: 3,
        opacity: 1,
        color: '#ffa751',
        dashArray: '1',
        fillOpacity: 0.2
    };
}
function Ethnic4Style() {
    return {
        fillColor: 'rgb(145, 128, 0)',
        weight: 3,
        opacity: 1,
        color: 'rgb(145, 128, 0)',
        dashArray: '1',
        fillOpacity: 0.2
    };
}


// choose styling to inporetd file//////////////
var colors = document.querySelectorAll('.cont>div')
colors.forEach((color) => {
    color.addEventListener('click', (event) => {
        var target = event.target.id
        // if (geoData || layerKml || shapefile) {
        //     document.querySelector(".styling").style.display = 'block'
        // }
        if (geoData) {
            geoData.setStyle(Ethnic1Style(target));
            
        }
        if (layerKml) {
            layerKml.setStyle(Ethnic1Style(target));
        }
        if (shapefile) {
            shapefile.setStyle(Ethnic1Style(target));
        }
        else {
            return null
        }
        
    })
})

function showLegend() {
    document.querySelector(".items").classList.add('afficher')
}




// $.ajax({
//     url: './data/DXF-17-05-2023 (1).dxf',
//     dataType: 'text',
//     success: function (data) {
//         // Parse the DXF data
//         var parser = new window.DxfParser();
//         var dxf = parser.parseSync(data);

//         // Convert DXF entities to Leaflet layers
//         var entities = dxf.entities;
//         var layers = Object.keys(entities);
//         layers.forEach(function (layer) {
//             var entitiesInLayer = entities[layer];
//             entitiesInLayer.forEach(function (entity) {
//                 // Convert entity to Leaflet layer and add it to the map
//                 var layer = convertEntityToLayer(entity);
//                 if (layer) {
//                     layer.addTo(myMap);
//                 }
//             });
//         });
//     }
// });

// function convertEntityToLayer(entity) {
//     // Implement conversion logic for each entity type
//     // For example, you can convert a LINE entity to a Leaflet Polyline layer

//     if (entity.type === 'LINE') {
//         var start = entity.start;
//         var end = entity.end;

//         var latlngs = [
//             [start.y, start.x],
//             [end.y, end.x]
//         ];

//         return L.polyline(latlngs);
//     }

//     // Return null for unsupported entity types
//     return null;
// }






















