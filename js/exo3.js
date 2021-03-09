//Initialisation//
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.set(0,0,15);


//Création de la lumière
//Ambiante
var light = new THREE.AmbientLight( 0x888888 );
scene.add( light );

//Directionelle
var light = new THREE.DirectionalLight( 0xfdfcf0, 1 );
light.position.set(20,10,20);
scene.add( light );


//Genèse
//Création geometry and material Terre
var earthGeometry = new THREE.SphereGeometry( 5, 50, 50 );
var earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/terre.jpg"),
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 25
});


//Création geometry and material Nuages
var cloudGeometry = new THREE.SphereGeometry(5.05,  50, 50);
var cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/nuagesNB.png"),
    transparent: true,
    opacity: 0.8
});

//Création geometry and material Bump
var bumpGeometry = new THREE.SphereGeometry(5,  50, 50);
var bumpMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/bump.jpg"),
    transparent: true,
    opacity: 0.2,
});

//Création geometry and material Etoiles
var starGeometry = new THREE.SphereGeometry(200, 50, 50);
var starMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("/img/etoiles.png"),
    side: THREE.DoubleSide,
    shininess: 0
});


//Construction & Ajout du mesh Terre Nuages Bump Etoiles (le mix entre la structure géométrique et la texture) à la scène
var star = new THREE.Mesh(starGeometry, starMaterial);
scene.add(star);

var earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

var clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

var bump = new THREE.Mesh(bumpGeometry, bumpMaterial);
scene.add(bump);

//Render loop
var render = function() {
    earth.rotation.y += .0015;
    clouds.rotation.y += .0025;
    clouds.rotation.z += .00125;
    bump.rotation.y += .0015;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render();