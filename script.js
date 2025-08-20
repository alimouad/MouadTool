
// spinner on loading page////
$(window).on('load', function () {
    $('sk-cube-grid').css("display", "none")
    $('.loader').fadeOut('5000')
})



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

// Register them in proj4
proj4.defs("EPSG:4326", spl);
proj4.defs("BN:1", bnprojct1);
proj4.defs("BN:2", bnprojct2);
proj4.defs("BN:3", bnprjct3);
proj4.defs("BN:4", bnprjct4);

let proArrs = ["BN:1", "BN:2", "BN:3", "BN:4"]; // use registered names

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
    position: 'topleft'
}).addTo(myMap);

// Distance and area measurement
L.control.measure({
    // collapsed: false,
    title : "Surface Measurement"
}).addTo(myMap);


L.Measure = {
    linearMeasurement: "mesurer la Distance ",
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



// down image
L.control.bigImage({ position: 'topleft', inputTitle: 'Obtenir image' }).addTo(myMap);



// Job functions****************************************************************

// Get elements
const labels = document.querySelectorAll('.option-label'); // If your labels have this class
const modal = document.getElementById('projModal');
const projBtnn = document.getElementById('projBtn');

// Restore the selected projection when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedProjection = localStorage.getItem('selectedProjection');
  if (savedProjection) {
    const input = document.getElementById(savedProjection);
    if (input) {
      input.checked = true; // Check the radio button
      input.parentElement.classList.add('selected-option'); // Add highlight
    }
  }
});

// Add click event to labels to update selection visually
labels.forEach(label => {
  label.addEventListener('click', () => {
    labels.forEach(l => l.classList.remove('selected-option'));
    label.classList.add('selected-option');
  });
});

// Save the selected projection when clicking the button
projBtnn.addEventListener('click', () => {
  const selectedInput = document.querySelector('input[name="select"]:checked');
  if (selectedInput) {
    localStorage.setItem('selectedProjection', selectedInput.id);
  }
  modal.style.display = 'none'; // Close modal
});

  

  // Get elements
  const searchTabsModal = document.getElementById("searchTabsModal");
  const closeSearchTabsModal = document.getElementById("closeSearchTabsModal");
  const overlay = searchTabsModal.querySelector(".absolute.inset-0");

  
  // Close modal
  function closeModal() {
    searchTabsModal.classList.add("hidden");
  }

  // Event listeners
  closeSearchTabsModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Optional: Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !searchTabsModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const tabIndicator = document.querySelector(".tab-indicator");

  tabBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      document.querySelector(".tab-btn.active")?.classList.remove("active", "text-indigo-600");
      btn.classList.add("active", "text-indigo-600");
      btn.classList.remove("text-gray-600");

      document.querySelector(".tab-content.active")?.classList.remove("active");
      document.querySelector(".tab-content:not(.hidden)")?.classList.add("hidden");
      tabContents[idx].classList.remove("hidden");
      tabContents[idx].classList.add("active");

      tabIndicator.style.left = `${idx * 50}%`;
    });
  });

  // Search button → open Search Tabs popup
  document.getElementById("openSearchTab").addEventListener("click", () => {
    searchTabsModal.classList.remove("hidden");

    // Reset tabs to first tab
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
    document.querySelector(".tab-btn:first-child").classList.add("active");
    document.querySelector(".tab-content:first-child").classList.remove("hidden");
  });





const fileModal = document.getElementById("fileManagementModal");
const closeModalBtn = document.getElementById("closeFileManagementModal");
const importSection = document.getElementById("importSection");
const exportSection = document.getElementById("exportSection");

// Open modal helper
function openModal(highlight) {
  // Clear any previous highlights
  importSection.classList.remove("ring-2", "ring-indigo-500");
  exportSection.classList.remove("ring-2", "ring-indigo-500");

  // Highlight section if requested
  if (highlight === "import") {
    importSection.classList.add("ring-2", "ring-indigo-500", 'p-3', 'rounded-lg');
  } else if (highlight === "export") {
    exportSection.classList.add("ring-2", "ring-indigo-500", 'p-3', 'rounded-lg');
  }

  fileModal.classList.remove("hidden");
}

// Close modal helper
function closeModalSearch() {
  fileModal.classList.add("hidden");
}

// Event bindings
document.getElementById("openImportModal").addEventListener("click", () => {
  openModal("import");
});

document.getElementById("openExportModal").addEventListener("click", () => {
  openModal("export");
});



closeModalBtn.addEventListener("click", closeModalSearch);

// Optional: close if clicking outside modal content
fileModal.addEventListener("click", (e) => {
  if (e.target === fileModal) {
    closeModalSearch();
  }
});







// Search buttons
const btnCo = document.querySelector('#searchbbtn');
const btnWgs = document.querySelector('#searchbttn');

// Search by projected coordinates
function searchCoord(pro) {
    const xValue = document.querySelector('#xCar');
    const yValue = document.querySelector('#yCar');

    const coords = [parseFloat(xValue.value), parseFloat(yValue.value)];
    console.log("Input coords (X,Y):", coords);

    // Transform from selected projection to WGS84
    const [lng, lat] = proj4(pro, "EPSG:4326", coords);

    myMap.setView([lat, lng], 12);
    L.marker([lat, lng])
        .bindPopup(`X: ${coords[0]} , Y: ${coords[1]}`)
        .openPopup()
        .addTo(myMap);

    xValue.value = "";
    yValue.value = "";
}

// Search by WGS84 coordinates
function searchWgs() {
    const lonInput = document.querySelector('#xLon');
    const latInput = document.querySelector('#yLat');

    const lng = parseFloat(lonInput.value);
    const lat = parseFloat(latInput.value);

    myMap.setView([lat, lng], 12);
    L.marker([lat, lng])
        .bindPopup(`Lat: ${lat} , Long: ${lng}`)
        .openPopup()
        .addTo(myMap);

    lonInput.value = "";
    latInput.value = "";
}

// Main projection selection handler
const projBtn = document.querySelector('#projBtn');
let selectedProj;

projBtn.addEventListener('click', () => {
    const checkedInput = document.querySelector("input[name='select']:checked");
    if (!checkedInput) {
        console.log("No projection selected");
        return;
    }

    const idLabel = checkedInput.id;
    
        // contPro comes from your modal selection

    const selectedId = checkedInput.id; // option-1, option-2, ...
   


    // Set dropdown directly by value
    const projectionSelect = document.getElementById('projectionSelect');
    const warningDiv = document.querySelector('.warningDiv');
    projectionSelect.value = selectedId;



    

    let pro = null;

    switch (idLabel) {
        case "option-1":
            warningDiv.classList.remove("hidden");
            btnCo.style.cursor = "not-allowed";
            btnCo.onclick = null;
            btnWgs.onclick = () => searchWgs();
            L.control.coordProjection({
                crs: 'EPSG4326',
                separator: " | Long : ",
                prefix: "Lat :",
                numDigits: 6
            }).addTo(myMap);
            break;

        case "option-2":
            pro = proArr[0];
            selectedProj = proArrs[0];
            btnCo.onclick = () => searchCoord(pro);
            btnWgs.onclick = () => searchWgs();
            L.control.coordProjection({
                crs: crs2,
                separator: " | Y : ",
                prefix: "X :",
                numDigits: 2
            }).addTo(myMap);
            break;

        case "option-3":
            pro = proArr[1];
            selectedProj = proArrs[1];

            btnCo.onclick = () => searchCoord(pro);
            btnWgs.onclick = () => searchWgs();
            L.control.coordProjection({
                crs: crs3,
                separator: " | Y : ",
                prefix: "X :",
                numDigits: 2
            }).addTo(myMap);
            break;

        case "option-4":
            pro = proArr[2];
              selectedProj = proArrs[2];
            btnCo.onclick = () => searchCoord(pro);
            btnWgs.onclick = () => searchWgs();
            L.control.coordProjection({
                crs: crs4,
                separator: " | Y : ",
                prefix: "X :",
                numDigits: 2
            }).addTo(myMap);
            break;

        case "option-5":
            pro = proArr[3];
              selectedProj = proArrs[3];
            btnCo.onclick = () => searchCoord(pro);
            btnWgs.onclick = () => searchWgs();
            L.control.coordProjection({
                crs: crs5,
                separator: " | Y : ",
                prefix: "X :",
                numDigits: 2
            }).addTo(myMap);
            break;

        default:
            console.log("Unknown projection");
    }
});




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







const fileItems = document.querySelectorAll('.item');
const deleteItems = document.querySelectorAll('.delete-item');

fileItems.forEach(item => {
    const fileNameEl = item.querySelector('.file-name');

    // Click on file name → fly to bounds
    fileNameEl.addEventListener('click', () => {
        if (item.classList.contains('geojson') && geoData) {
            myMap.flyToBounds(geoData.getBounds());
        } else if (item.classList.contains('shape') && shapefile) {
            myMap.flyToBounds(shapefile.getBounds());
        } else if (item.classList.contains('kml') && layerKml) {
            myMap.flyToBounds(layerKml.getBounds());
        }
    });
});

// Click delete → confirm → remove layer & hide item
deleteItems.forEach(delBtn => {
    delBtn.addEventListener('click', e => {
        e.preventDefault(); // prevent link navigation
        const item = delBtn.closest('.item');
        if (!item) return;

        // Ask the user
        const confirmDelete = confirm("Do you really want to remove this layer?");
        if (!confirmDelete) return;

        // Hide UI element
        item.classList.add('hidden');

        // Remove from map & control
        if (item.classList.contains('geojson') && geoData) {
            myMap.removeLayer(geoData);
            layerControl.removeLayer(geoData);
            geoData = null;
        } 
        else if (item.classList.contains('shape') && shapefile) {
            myMap.removeLayer(shapefile);
            layerControl.removeLayer(shapefile);
            shapefile = null;
        } 
        else if (item.classList.contains('kml') && layerKml) {
            myMap.removeLayer(layerKml);
            layerControl.removeLayer(layerKml);
            layerKml = null;
        }

        // Clear table and reset map
        clear_all();

        // Optionally fly to another layer if exists
        if (geoData) myMap.flyToBounds(geoData.getBounds());
        else if (shapefile) myMap.flyToBounds(shapefile.getBounds());
        else if (layerKml) myMap.flyToBounds(layerKml.getBounds());
    });
});




// Attribute Table **********

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

// files functions********
function coordsToLatLng(coords) {
    let srs;

    const checkedInput = document.querySelector("#projModal input[name='select']:checked");


    if (!checkedInput) {
        console.warn("No projection selected, defaulting to WGS84");
        srs = myCRS; // default CRS
    } else {
        switch (checkedInput.id) {
            case "option-1":
                srs = myCRS;
                break;
            case "option-2":
                srs = crs; // make sure crs is defined
                break;
            case "option-3":
                srs = crs2;
                break;
            case "option-4":
                srs = crs3;
                break;
            case "option-5":
                srs = crs4;
                break;
            default:
                console.warn("Unknown projection, defaulting to WGS84");
                srs = myCRS;
        }
    }

    if (!srs) {
        throw new Error("CRS is not defined. Check your crs variables.");
    }

    return srs.unproject(L.point(coords[0], coords[1]));
}


function onEachFeature(feature, layer) {
    // --- Popup binding (Consolidated) ---
    if (feature.properties) {
        const popupContent = feature.properties.name || feature.properties.type;
        if (popupContent) {
            layer.bindPopup(popupContent, {
                closeButton: false,
                offset: L.point(0, -10)
            });
        }
    }

    // --- Unified Event Listeners for Hover and Click ---
    layer.on({
        // Handle mouseover events for both popup and style changes
        mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.8 });
            if (e.target.getPopup()) {
                e.target.openPopup();
            }
        },

        // Handle mouseout events for both popup and style changes
        mouseout: (e) => {
            if (e.target !== selected) {
                e.target.setStyle({ fillOpacity: 0.2 });
            }
            if (e.target.getPopup()) {
                e.target.closePopup();
            }
        },

        // Handle click events
        click: (e) => {
            // Reset the style of the previously selected layer, if it exists
            if (selected) {
                selected.setStyle({
                    fillOpacity: 0.2,
                    color: '#3388ff' // Revert to default Leaflet blue
                });
            }

            // Set the new selected layer and apply click style
            selected = e.target;
            selected.setStyle({
                color: 'red',
                fillOpacity: 0.6 // Make it more distinct on click
            });

            // Update UI elements based on the click
            updateUI(feature.properties);
        }
    });
}
function updateUI(properties) {
    try {
        const tableContainer = document.querySelector("#table_data");
        const mapContainer = document.querySelector("#map");

        if (!tableContainer || !mapContainer) {
            console.warn("Missing table or map container");
            return;
        }

        // Show the table and adjust map layout
        if (!tableContainer.classList.contains("table_active")) {
            tableContainer.classList.add("table_active");
            mapContainer.classList.add("map_active");
        }

        // ✅ Always use our internal fid
        const featureId = properties.__fid || properties.id || properties.ID || properties.name;
        if (!featureId) {
            console.warn("No valid feature ID found in properties");
            return;
        }

        // Reset all highlights
        document.querySelectorAll("#table_data tr").forEach(row => {
            row.classList.remove("highlight", "bg-gray-300", "font-bold");
        });

        // Highlight the corresponding row
        const rowToHighlight = document.querySelector(`[data-feature-id="${featureId}"]`);
        if (rowToHighlight) {
            rowToHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
            rowToHighlight.classList.add("highlight", "bg-gray-300", "font-bold");
        } else {
            console.warn(`No row found for feature ID: ${featureId}`);
        }
    } catch (err) {
        console.error("Error updating UI:", err);
    }
}


function hundle(data) {
    // Extract columns
    let col = ["id"];
    data.features.forEach(feature => {
        Object.keys(feature.properties).forEach(key => {
            if (!col.includes(key)) col.push(key);
        });
    });

    // Create table container
    const divContainer = document.getElementById("table_data");
    divContainer.innerHTML = "";
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "overflow-x-auto max-h-[400px] border rounded-lg shadow";

    const table = document.createElement("table");
    table.className = "min-w-full divide-y divide-gray-200 text-sm";
    table.id = "table";

    // Caption
    const caption = document.createElement("caption");
    caption.className = "text-gray-700 text-center font-semibold mb-2";
    caption.textContent = `Number of Features: ${data.features.length}`;
    table.appendChild(caption);

    // Header
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    col.forEach(c => {
        const th = document.createElement("th");
        th.textContent = c;
        th.className = "px-4 py-2 text-left bg-gray-100 font-medium sticky top-0";
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement("tbody");
    data.features.forEach((feature, i) => {
        // ✅ Generate a stable fid
        const featureId = feature.id || feature.properties.id || feature.properties.name || `fid-${i+1}`;
        feature.properties.__fid = featureId; // store internally

        const tr = document.createElement("tr");
        tr.setAttribute("data-feature-id", featureId);
        tr.className = "hover:bg-blue-100 cursor-pointer transition-colors";

        col.forEach((c, idx) => {
            const td = document.createElement("td");
            td.className = "px-4 py-2";
            td.textContent = idx === 0 ? featureId : feature.properties[c] ?? "";
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    divContainer.appendChild(tableWrapper);

    addRowHandlers();
    myMap.invalidateSize();
}


function addRowHandlers() {
    const table = document.getElementById("table");
    if (!table) return; 

    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        row.addEventListener("click", () => {
            rows.forEach(r => r.classList.remove("bg-gray-300", "font-bold"));
            row.classList.add("bg-gray-300", "font-bold");

            const fid = row.getAttribute("data-feature-id");

            if (geoData && geoData.resetStyle) geoData.resetStyle();

            if (geoData) {
                const features = geoData.getLayers();
                const match = features.find(f => {
                    const fidCandidate = f.feature.properties?.__fid || f.feature.id;
                    return String(fidCandidate) === fid;
                });

                if (match) {
                    match.setStyle({ color: "red", weight: 3, fillOpacity: 0.6 });
                    myMap.flyToBounds(match.getBounds(), { padding: [50, 50] });
                } else {
                    console.warn(`Feature with fid=${fid} not found in GeoJSON.`);
                }
            }

            row.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
}


function clear_all() {
    const tableContainer = document.getElementById("table_data");
    tableContainer.innerHTML = "";
    myMap.invalidateSize();
    myMap.flyTo([30.386, -3.319], 6);
    document.querySelector('.hide-table-attribute').style.display = 'none';
}


function handleFileUpload(file, data, fileType, layer) {
    // Select the corresponding item dynamically
    const item = document.querySelector(`.item.${fileType}`);
    const filesItems = document.querySelector('.listFiles')
    const fileNameEl = item.querySelector('.file-name');

    // Show the item and update its name
    filesItems.classList.remove('hidden');  // <-- show the item
    item.classList.remove('hidden'); // Show the specific file type item
    fileNameEl.textContent = file.name;

    // Fly to the layer bounds and add overlay
    if (layer) {
        myMap.flyToBounds(layer.getBounds(), { padding: [12, 12] });
        layerControl.addOverlay(layer, file.name);
    }

    // Populate table for GeoJSON files
    if (fileType === 'geojson') {
        hundle(data);
    }
}



//  Import GeoJSON
document.getElementById('geojson-file').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    $('#table').empty();

    // Remove previous GeoJSON layer if exists
    if (geoData) {
        overlays.clearLayers();
        layerControl.removeLayer(geoData);
        myMap.removeLayer(geoData);
    }

    const file = event.target.files[0];
    if (!file || file.name.slice(-8).toLowerCase() !== '.geojson') {
        alert('Please select a valid GeoJSON file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);

        // Add the GeoJSON layer to the map
        geoData = L.geoJson(data, {
            coordsToLatLng: coordsToLatLng,
            onEachFeature: onEachFeature
        }).addTo(myMap);

        // Use the unified handleFileUpload function
        handleFileUpload(file, data, 'geojson', geoData);

        // Show the table container
        document.querySelector('.hide-table-attribute').style.display = 'flex';

        alert('The file was uploaded successfully ✅');
    };
    reader.readAsText(file);
}

// import kml========================>>>>>>>>>>>>>////////
document.getElementById('kml-file').addEventListener('change', (e) => {
    let file = e.target.files[0];
    if (!file) {
        alert("No file selected!");
        return;
    }

    // Remove old KML layer if it exists
    if (layerKml) {
        overlays.clearLayers();
        layerControl.removeLayer(layerKml);
        myMap.removeLayer(layerKml);
        if (fileNameKml) fileNameKml.textContent = '';
    }

    let reader = new FileReader();

    reader.onload = function (event) {
        try {
            let kmlStr = event.target.result;
            let parser = new DOMParser();
            let kmlDoc = parser.parseFromString(kmlStr, 'text/xml');

            let geojson = toGeoJSON.kml(kmlDoc);

            layerKml = L.geoJson(geojson, {
                onEachFeature: onEachFeature,
                coordsToLatLng: coordsToLatLng,
                style: Ethnic2Style,
            }).addTo(myMap);

            myMap.flyToBounds(layerKml.getBounds(), { padding: [12, 12] });
            layerControl.addOverlay(layerKml, file.name);

            

             // Use the unified handleFileUpload function
            handleFileUpload(file, data, 'kml', layerKml);

            alert('The file was uploaded successfully ✅');
        } catch (err) {
            console.error("Error loading KML:", err);
            alert("Invalid KML file!");
        }
    };

    reader.readAsText(file);
});


// import shapefile///////////

// Declare globally
let shapefile = null;

document.getElementById('shape-file').addEventListener('change', function (event) {
    // Clear previous shapefile if exists
    if (shapefile) {
        overlays.clearLayers();
        layerControl.removeLayer(shapefile);
        myMap.removeLayer(shapefile);
        shapefile = null;
    }

    const file = event.target.files[0];
    if (!file) {
        alert("No file selected.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;

        shp(data).then(function (geojson) {
            // Assign internal fid for sync between table & map
            geojson.features.forEach((feature, i) => {
                feature.properties.__fid =
                    feature.id ||
                    feature.properties.id ||
                    feature.properties.name ||
                    `fid-${i + 1}`;
            });

            // Add shapefile to map
            shapefile = L.geoJson(geojson, {
                style: Ethnic1Style,
                coordsToLatLng: coordsToLatLng,
                onEachFeature: function (feature, layer) {
                    // Attach fid to layer
                    layer.feature.properties.__fid = feature.properties.__fid;
                    if (typeof onEachFeature === "function") {
                        onEachFeature(feature, layer); // call your existing handler if defined
                    }
                }
            }).addTo(myMap);

            // Add to layer control
            layerControl.addOverlay(shapefile, file.name);

            // Show file name in UI
            const itemShp = document.querySelector(".item.shape");
            if (itemShp) {
                itemShp.classList.remove("hidden");
                itemShp.querySelector(".file-name").textContent = file.name;
            }

            // Show legend (your custom function)
            handleFileUpload(file, data, 'shape', shapefile);

            // Zoom to shapefile bounds
            myMap.flyToBounds(shapefile.getBounds());

            // ---- Build Enhanced Table ----
            const col = ["__fid"]; // ✅ use fid as first column
            geojson.features.forEach(f => {
                for (const key in f.properties) {
                    if (!col.includes(key)) col.push(key);
                }
            });

            const table = document.createElement("table");
            table.className = "min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-md";
            table.id = "table";

            // Caption
            const caption = document.createElement("caption");
            caption.id = "caption";
            caption.className = "bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-left";
            caption.textContent = `Number of Features: ${geojson.features.length}`;
            table.appendChild(caption);

            // Header
            const thead = document.createElement("thead");
            thead.className = "bg-indigo-600 text-white";
            let tr = document.createElement("tr");

            col.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                th.className = "py-2 px-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-indigo-700";
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);

            // Body
            const tbody = document.createElement("tbody");
            geojson.features.forEach(feature => {
                const fid = feature.properties.__fid; // ✅ always use fid
                const row = document.createElement("tr");
                row.className = "hover:bg-indigo-100 cursor-pointer transition-colors";
                row.setAttribute("data-feature-id", fid);

                col.forEach((key, j) => {
                    const cell = document.createElement("td");
                    cell.className = "py-2 px-3 text-sm text-gray-700 border-b border-gray-200";
                    if (j === 0) {
                        cell.textContent = fid;
                        cell.classList.add("font-semibold");
                    } else {
                        cell.textContent = feature.properties[key] ?? "";
                    }
                    row.appendChild(cell);
                });

                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            // Insert into container
            const divContainer = document.getElementById("table_data");
            divContainer.innerHTML = ""; // clear previous
            divContainer.appendChild(table);

            // Row handlers (map <-> table sync)
            addRowHandlers();
            myMap.invalidateSize();

            alert('The file was uploaded successfully ✅');

            const hideData = document.querySelector(".hide-table-attribute");
            if (hideData) hideData.style.display = "flex";

            document.querySelector(".imxp")?.classList.remove("active");
        })
        .catch(function (error) {
            console.error(error);
            alert("Error loading shapefile. Please check the file format.");
        });
    };

    reader.readAsArrayBuffer(file);
});






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


// choose styling to imported file//////////////
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




/


// --- Event hooks ---
myMap.on("pm:create", (e) => {
   
    drawnFeatures.addLayer(e.layer);
    const geojsonData = drawnFeatures.toGeoJSON();
    const reprojectedGeoJSON = reprojectGeoJSON(geojsonData, "EPSG:4326", selectedProj);
    localStorage.setItem("projectedGeoJSON", JSON.stringify(reprojectedGeoJSON));
    
});

myMap.on("pm:edit", (e) => {
   
    // already in drawnFeatures
});



// --- Robust Reprojection Helper ---
function reprojectGeoJSON(geojson, sourceProj, targetProj) {
    if (!geojson || !proj4.defs(sourceProj) || !proj4.defs(targetProj)) {
        console.error("Invalid GeoJSON or projection definitions.");
        return null;
    }

    const transformCoords = (coords) => proj4(sourceProj, targetProj, coords);

    const reprojectGeometry = (geometry) => {
        if (!geometry || !geometry.coordinates) return;

        switch (geometry.type) {
            case "Point":
                geometry.coordinates = transformCoords(geometry.coordinates);
                break;
            case "LineString":
            case "MultiPoint":
                geometry.coordinates = geometry.coordinates.map(transformCoords);
                break;
            case "Polygon":
            case "MultiLineString":
                geometry.coordinates = geometry.coordinates.map(ring =>
                    ring.map(transformCoords)
                );
                break;
            case "MultiPolygon":
                geometry.coordinates = geometry.coordinates.map(polygon =>
                    polygon.map(ring => ring.map(transformCoords))
                );
                break;
            case "GeometryCollection":
                geometry.geometries.forEach(reprojectGeometry);
                break;
            default:
                console.warn(`Unsupported geometry type for reprojection: ${geometry.type}`);
        }
    };

    if (geojson.type === "FeatureCollection") {
        geojson.features.forEach(f => reprojectGeometry(f.geometry));
    } else if (geojson.type === "Feature") {
        reprojectGeometry(geojson.geometry);
    } else if (geojson.type === "Geometry") {
        reprojectGeometry(geojson);
    }

    return geojson;
}

// --- Utility: Download ---
function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

// --- EXPORT GEOJSON ---
document.getElementById("exportgeo").addEventListener("click", () => {
    if (drawnFeatures.getLayers().length === 0) {
        alert("No features to export!");
        return;
    }

    const geojsonData = drawnFeatures.toGeoJSON();
    const reprojectedGeoJSON = reprojectGeoJSON(geojsonData, "EPSG:4326", selectedProj);
    
    if (reprojectedGeoJSON) {
        downloadFile(
            JSON.stringify(reprojectedGeoJSON, null, 2),
            "drawn_features.geojson",
            "application/json"
        );
    }
});

// --- EXPORT KML ---
document.getElementById("exportkml").addEventListener("click", () => {
    if (drawnFeatures.getLayers().length === 0) {
        alert("No features to export!");
        return;
    }

    const geojsonData = drawnFeatures.toGeoJSON();

    try {
        const kmlData = tokml(geojsonData); // KML always in WGS84
        downloadFile(kmlData, "drawn_features.kml", "application/vnd.google-earth.kml+xml");
    } catch (e) {
        console.error("Error converting to KML:", e);
        alert("Failed to create KML file.");
    }
});



// Restore drawing Data*********
// Show modal
document.addEventListener("DOMContentLoaded", () => {
    const savedGeoJSON = localStorage.getItem("projectedGeoJSON");
    const restoreModal = document.getElementById("restoreModal"); // ✅ consistent naming

    if (savedGeoJSON && restoreModal) {
        restoreModal.classList.remove("hidden");

        // Handle buttons inside modal
        document.getElementById("cancelRestore").addEventListener("click", () => {
            restoreModal.classList.add("hidden");
            localStorage.removeItem("projectedGeoJSON"); // optional clear
        });

        document.getElementById("confirmRestore").addEventListener("click", () => {
            restoreModal.classList.add("hidden");
            restoreDrawnItems(); // 🔹 restore features to map
        });
    }
});

// Hide modal function
function hideRestoreModal() {
    const modal = document.getElementById("restoreModal");
    if (modal) modal.classList.add("hidden");
}

// Restore features from localStorage
function restoreDrawnItems() {
    const savedGeoJSON = localStorage.getItem("projectedGeoJSON");
    if (savedGeoJSON) {
        const geojsonData = JSON.parse(savedGeoJSON);

        // Add it back to map
        L.geoJSON(geojsonData, {
            onEachFeature: (feature, layer) => {
                layer.bindPopup("Restored Feature");
            },
            coordsToLatLng: coordsToLatLng,
            style: Ethnic2Style,
        }).addTo(myMap);

        console.log("Projected GeoJSON restored from localStorage ✅");
    }
}

