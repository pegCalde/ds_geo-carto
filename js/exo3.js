/* récupération de la position en longitude et latitude*/
function getMyPosition(position) {
    var infoPos = "<strong>Ma position actuelle: </strong><br><br>";
    infoPos += "<strong>Latitude: </strong>" + position.coords.latitude + "<br>";
    infoPos += "<strong>Longitude: </strong>" + position.coords.longitude + "<br>";
    infoPos += "<strong>Date: </strong>" + new Date(position.timestamp);
    document.getElementById("infoPos").innerHTML = infoPos;
}

function watchMyPosition(position) {
    var infoPos = "Ma position actuelle: <br>";
    infoPos += "Latitude: " + position.coords.latitude + "<br>";
    infoPos += "Longitude: " + position.coords.longitude + "<br>";
    document.getElementById("infoPos").innerHTML = infoPos;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getMyPosition);
} else {
    "<h2>La géolocalisation n'est pas possible</h2>";
}

var watchId = navigator.geolocation.watchPosition(watchMyPosition);

/* mettre un marqueur à notre position sur une carte avec leaflet
var lat = 43.6877383;
var lon = 7.211371;
var maCarte = null;

function initMap() {
    maCarte = L.map('map').setView([lat, lon], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(maCarte);
        var marker = L.marker([lat, lon]).addTo(maCarte);
    }
    window.onload = function(){
    initMap(); 
*/

/* scène three.js -> terre*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0,0,15);

var ambiantLight = new THREE.AmbientLight(0x888888);
scene.add(ambiantLight);

var directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
directionalLight.position.set(20,10,20);
scene.add(directionalLight);

var earthTextureGeometry = new THREE.SphereGeometry( 5, 50, 50 );
var earthTextureMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/earthTexture.jpg"),
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 25
});

var cloudsNBGeometry = new THREE.SphereGeometry(5.05,  50, 50);
var cloudsNBMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/cloudsNB.png"),
    transparent: true,
    opacity: 0.8
});

var earthTextureNBGeometry = new THREE.SphereGeometry(5,  50, 50);
var earthTextureNBMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/earthTextureNB.jpg"),
    transparent: true,
    opacity: 0.2,
});

var starsGeometry = new THREE.SphereGeometry(200, 50, 50);
var starsMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/stars.png"),
    side: THREE.DoubleSide,
    shininess: 0
});

var stars = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(stars);

var earth = new THREE.Mesh(earthTextureGeometry, earthTextureMaterial);
scene.add(earth);

var clouds = new THREE.Mesh(cloudsNBGeometry, cloudsNBMaterial);
scene.add(clouds);

var earthNB = new THREE.Mesh(earthTextureNBGeometry, earthTextureNBMaterial);
scene.add(earthNB);

var render = function() {
    earth.rotation.y += .0015;
    clouds.rotation.y += .0025;
    clouds.rotation.z += .00125;
    earthNB.rotation.y += .0015;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render();