/* récupération de la position en longitude et latitude*/
function getMyLatitude(position){
    lat = position.coords.latitude;
    document.getElementById("lat").innerHTML = lat;
}
function watchMyLatitude(position){
    lat = position.coords.latitude;
}

function getMyLongitude(position){
    long = position.coords.longitude;
    document.getElementById("long").innerHTML = long;
}
function watchMyLongitude(position){
    long = position.coords.longitude;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getMyLatitude);
    navigator.geolocation.getCurrentPosition(getMyLongitude);
}else {
    "<h2>La géolocalisation n'est pas possible</h2>";
}

var watchIdLat = navigator.geolocation.watchPosition(watchMyLatitude);
var watchIdLong = navigator.geolocation.watchPosition(watchMyLongitude);


/*to Cartesien*/
var latitude = Math.PI * latitude / 180;
var longitude = Math.PI * longitude / 180;

// adjust position by radians
latitude -= 1.570795765134; // subtract 90 degrees (in radians)

// and switch z and y NE FONCTIONNE PAS
//xPos = (app.radius) * Math.sin(latitude) * Math.cos(longitude);
//zPos = (app.radius) * Math.sin(latitude) * Math.sin(longitude);
//yPos = (app.radius) * Math.cos(latitude);


/* scène three.js*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0, 0, 25);

/* marqueurs */
marqueursPos = [];

var marqueurPosGeometry = new THREE.IcosahedronBufferGeometry(7);
var marqueurPosMaterial = new THREE.MeshPhongMaterial({
    color: "green",
    specular: 0x333333
}); 

/* terre */
var ambiantLight = new THREE.AmbientLight(0x888888);
scene.add(ambiantLight);

var directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
directionalLight.position.set(20, 10, 20);
scene.add(directionalLight);

var earthTextureGeometry = new THREE.SphereGeometry(5, 50, 50);
var earthTextureMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/earthTexture.jpg"),
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 25
});

var cloudsNBGeometry = new THREE.SphereGeometry(5.05, 50, 50);
var cloudsNBMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/cloudsNB.png"),
    transparent: true,
    opacity: 0.7
});

var earthTextureNBGeometry = new THREE.SphereGeometry(5, 50, 50);
var earthTextureNBMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/earthTextureNB.jpg"),
    transparent: true,
    opacity: 0.2
});
earthTextureNBMaterial.bumpScale = 1.0;


var starsGeometry = new THREE.SphereGeometry(200, 50, 50);
var starsMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/wallpaperUnivers.jpg"),
    side: THREE.BackSide,
    shininess: 0,
    transparent: true,
    opacity: 0.5
});

var stars = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(stars);

var earth = new THREE.Mesh(earthTextureGeometry, earthTextureMaterial);
scene.add(earth);

var clouds = new THREE.Mesh(cloudsNBGeometry, cloudsNBMaterial);
scene.add(clouds);

var earthNB = new THREE.Mesh(earthTextureNBGeometry, earthTextureNBMaterial);
scene.add(earthNB);

/* ajout plusieurs marqueurs */
for (let i = 0; i < 5; i++) {
    const markP = new THREE.Mesh(marqueurPosGeometry, marqueurPosMaterial);
    markP.scale.x = markP.scale.y = markP.scale.z = 0.05;
    scene.add(markP);
    marqueursPos.push(markP);
}


var render = function () {
    earth.rotation.y += .0010;
    clouds.rotation.y += .0005;
    clouds.rotation.z += .0005;
    earthNB.rotation.y += .0010;

    let angle = 0;
    for (let i = 0; i < this.marqueursPos.length; i++) {
        const marqueurPos = this.marqueursPos[i];
        if (i > 0) {
            marqueurPos.position.y = Math.sin(angle);
            marqueurPos.position.x = Math.cos(angle) * 10;
            marqueurPos.position.z = Math.sin(angle) * 10;
        } 
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render();