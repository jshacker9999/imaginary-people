
if (!Detector.webgl) Detector.addGetWebGLMessage();

var SCALE = 1 / window.devicePixelRatio;
var MARGIN = 100;
var SIDE_MARGIN = 0;

var BRIGHTNESS = 1;

var SCREEN_WIDTH = window.innerWidth - 2 * SIDE_MARGIN;
var SCREEN_HEIGHT = window.innerHeight - 2 * MARGIN;


var backend = "webgl1";

var isMobile = Detector.isMobile;


var useDeferred = true;
var useDebugMaterial = false;

if (!Detector.deferredCapable || isMobile) useDeferred = false;



var container, camera, scene, renderer, innerRenderer;

var mesh;
var meshRoot;

var planeMaterial;
var planeMesh;

var overlayMaterial;
var overlayMesh;

var borderMeshRight, borderMeshLeft;
var borderMeshTop, borderMeshBottom;

var effectSharpen, effectLens;



var characterIndex = 0;

var characterList = [

    {
        "baseUrl": "textures/eyes/im3/",

        "rollSpritesUrl": "00098000_roll_sprites.png",
        "scrollSpritesUrl": "00098000_scroll_sprites.png",
        "shiftSpritesUrl": "00098000_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [184, 280, 568, 360],

        "depthUrl": "im3_depth2.jpg",

        "highUrl": "00098000-g.jpg",
        "highMaskUrl": "00098000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.7,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im2/",

        "rollSpritesUrl": "00360000_roll_sprites.png",
        "scrollSpritesUrl": "00360000_scroll_sprites.png",
        "shiftSpritesUrl": "00360000_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [200, 256, 592, 390],

        "depthUrl": "im2_depth2.jpg",

        "highUrl": "00360000-g.jpg",
        "highMaskUrl": "00360000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },


    {
        "baseUrl": "textures/eyes/im7/",

        "rollSpritesUrl": "im7_roll_sprites.png",
        "scrollSpritesUrl": "im7_scroll_sprites.png",
        "shiftSpritesUrl": "im7_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [177, 257, 568, 352],

        "depthUrl": "im7_depth2.jpg",

        "highUrl": "s.000001.047-g.jpg",
        "highMaskUrl": "s.000001.047_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im6/",

        "rollSpritesUrl": "im6_roll_sprites.png",
        "scrollSpritesUrl": "im6_scroll_sprites.png",
        "shiftSpritesUrl": "im6_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [192, 272, 582, 384],

        "depthUrl": "im6_depth2.jpg",

        "highUrl": "00128000-g.jpg",
        "highMaskUrl": "00128000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im4/",

        "rollSpritesUrl": "im4_roll_sprites.png",
        "scrollSpritesUrl": "im4_scroll_sprites.png",
        "shiftSpritesUrl": "im4_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [192, 280, 568, 376],

        "depthUrl": "im4_depth2.jpg",

        "highUrl": "00734000-g.jpg",
        "highMaskUrl": "00734000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im1/",

        "rollSpritesUrl": "im1_roll_sprites.png",
        "scrollSpritesUrl": "im1_scroll_sprites.png",
        "shiftSpritesUrl": "im1_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [200, 288, 576, 376],

        "depthUrl": "im1_depth2.jpg",

        "highUrl": "00266000-g.jpg",
        "highMaskUrl": "00266000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im12/",

        "rollSpritesUrl": "im12_roll_sprites.png",
        "scrollSpritesUrl": "im12_scroll_sprites.png",
        "shiftSpritesUrl": "im12_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [208, 296, 552, 384],

        "depthUrl": "im12_depth2.jpg",

        "highUrl": "00706000-g.jpg",
        "highMaskUrl": "00706000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.65,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im5/",

        "rollSpritesUrl": "im5_roll_sprites.png",
        "scrollSpritesUrl": "im5_scroll_sprites.png",
        "shiftSpritesUrl": "im5_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [208, 288, 568, 368],

        "depthUrl": "im5_depth2.jpg",

        "highUrl": "00236000-g.jpg",
        "highMaskUrl": "00236000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im13/",

        "rollSpritesUrl": "im13_roll_sprites.png",
        "scrollSpritesUrl": "im13_scroll_sprites.png",
        "shiftSpritesUrl": "im13_shift_sprites.png",

        "maskSize": [2048, 2048],
        "maskBoundingBox": [552, 768, 1480, 976],

        "depthUrl": "im13_depth2.jpg",

        "highUrl": "00738000.2k-g.jpg",
        "highMaskUrl": "00738000.2k_mask.png",

        "imgWidth": 2048,
        "imgHeight": 2048,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im9/",

        "rollSpritesUrl": "im9_roll_sprites.png",
        "scrollSpritesUrl": "im9_scroll_sprites.png",
        "shiftSpritesUrl": "im9_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [200, 288, 576, 368],

        "depthUrl": "im9_depth2.jpg",

        "highUrl": "00304000-g.jpg",
        "highMaskUrl": "00304000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.65,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im8/",

        "rollSpritesUrl": "im8_roll_sprites.png",
        "scrollSpritesUrl": "im8_scroll_sprites.png",
        "shiftSpritesUrl": "im8_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [184, 288, 559, 376],

        "depthUrl": "im8_depth2.jpg",

        "highUrl": "00212000-g.jpg",
        "highMaskUrl": "00212000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.7,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im10/",

        "rollSpritesUrl": "im10_roll_sprites.png",
        "scrollSpritesUrl": "im10_scroll_sprites.png",
        "shiftSpritesUrl": "im10_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [206, 303, 574, 380],

        "depthUrl": "im10_depth2.jpg",

        "highUrl": "00436000-g.jpg",
        "highMaskUrl": "00436000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.65,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

    {
        "baseUrl": "textures/eyes/im11/",

        "rollSpritesUrl": "im11_roll_sprites.png",
        "scrollSpritesUrl": "im11_scroll_sprites.png",
        "shiftSpritesUrl": "im11_shift_sprites.png",

        "maskSize": [768, 768],
        "maskBoundingBox": [216, 272, 568, 384],

        "depthUrl": "im11_depth2.jpg",

        "highUrl": "00569000-g.jpg",
        "highMaskUrl": "00569000_mask.png",

        "imgWidth": 768,
        "imgHeight": 768,

        "borderSide": 114,
        "borderTop": 118,
        "borderBottom": 110,

        "gamma": 1.0,
        "brightness": 1.0,
        "sharpen": true,

        "scale": 0.75,
        "positionY": 0.1,

        "displacementScale": 0.75,
        "displacementMap": null,

        "loadCounter": 0,

        "author": "Mike Tyka",
        
    },

];

// ui

var loadingElement = document.getElementById("loading");
var loadingVisible = true;

var authorElement = document.getElementById("author");

var infoElement = document.getElementById("info");
var hudVisible = true;

// camera controls

var mouseX = 0;
var mouseY = 0;

var targetX = 0.0;
var targetY = 0.0;
var angle = 0.0;
var height = 0.0;
var target = new XG.Vector3();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//

var clock = new XG.Clock();
var elapsed = 0;

var diffuseComposer;
var diffuseUniforms;

var dummyBlackMap = XG.ImageUtils.generateDataTexture(4, 4, new XG.Color(0x000000));
var dummyWhiteMap = XG.ImageUtils.generateDataTexture(4, 4, new XG.Color(0xffffff));

//

init();
animate();

function init() {

    container = document.createElement('div');
    container.className = "container";
    document.body.appendChild(container);

    // renderer

    var pars = {

        "width": SCREEN_WIDTH,
        "height": SCREEN_HEIGHT,
        "scale": SCALE,
        "antialias": true,
        "tonemapping": XG.SimpleOperator,
        "brightness": BRIGHTNESS,
        "clearColor": 0x000000,
        "clearAlpha": 1.0,
        "devicePixelRatio": 1,
        "backend": backend,
        //"dither"	: true

    };

    if (isMobile) {

        pars.antialias = false;

    }

    if (useDeferred) {

        renderer = new XG.DeferredRenderer(pars);
        innerRenderer = renderer.renderer;

    } else {

        renderer = new XG.ForwardRenderer(pars);
        innerRenderer = renderer;

    }

    container.appendChild(renderer.domElement);

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = MARGIN + "px";
    renderer.domElement.style.left = SIDE_MARGIN + "px";

    //

    renderer.shadowMapEnabled = false;

    //

    if (useDeferred) {

        effectSharpen = new XG.ShaderPass(XG.SharpenShader);
        effectSharpen.uniforms.resolution.value.set(SCREEN_WIDTH * SCALE, SCREEN_HEIGHT * SCALE);

        effectLens = new XG.ShaderPass(XG.ChromaticAberrationShader);
        effectLens.material.uniforms.amount.value = 0.0025;

        renderer.addEffect(effectSharpen);
        renderer.addEffect(effectLens);

        //effectLens.enabled = false;

    }


    // stats

    stats = new Stats();
    container.appendChild(stats.domElement);

    // events

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('touchmove', onTouchMove, false);
    renderer.domElement.addEventListener('click', onClick, false);
    document.addEventListener('keydown', onKeyDown, false);


    // camera

    camera = new XG.PerspectiveCamera(27.5, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1500);
    camera.position.set(0, 0, 200);

    // scene

    scene = new XG.Scene();
    scene.add(camera);

    addBorders();

    if (useDebugMaterial) {

        light = new XG.PointLight(0xffffff, 4, 1000);
        light.position.z = 100;
        light.position.y = 20;
        scene.add(light);

        light = new XG.PointLight(0xffaa00, 4, 1000);
        light.position.z = 100;
        light.position.x = 100;
        scene.add(light);

        light = new XG.PointLight(0x00aaff, 4, 1000);
        light.position.z = 100;
        light.position.x = -100;
        scene.add(light);

    }

    addCharacter();
    setTextures(0);
    loadTextures(1);
    loadTextures(2);

    setupDynamicTexture();

    //

    onWindowResize();

}

function addBorders() {

    var geo = new XG.PlaneGeometry(200, 200);
    var mat = new XG.EmissiveMaterial({
        color: 0x000000
    });

    var d = 118;

    borderMeshRight = new XG.Mesh(geo, mat);
    borderMeshRight.position.z = 100;
    borderMeshRight.position.x = d;

    scene.add(borderMeshRight);

    borderMeshLeft = new XG.Mesh(geo, mat);
    borderMeshLeft.position.z = 100;
    borderMeshLeft.position.x = -d;

    scene.add(borderMeshLeft);

    var geo = new XG.PlaneGeometry(200, 100);

    var d = 118;

    borderMeshTop = new XG.Mesh(geo, mat);
    borderMeshTop.position.z = 100;
    borderMeshTop.position.y = d;

    scene.add(borderMeshTop);

    var d = 115;

    borderMeshBottom = new XG.Mesh(geo, mat);
    borderMeshBottom.position.z = 100;
    borderMeshBottom.position.y = -d;

    scene.add(borderMeshBottom);

}

// -----------------------------------------------------------------------------------

function generateLoadChecker(index) {

    return function checkLoaded() {

        var pars = characterList[index];

        pars.loadCounter += 1;

        if (pars.loadCounter >= 6) {

            pars.loaded = true;
            if (characterIndex === index) loadingElement.style.display = "none";

        }

    }

}

// -----------------------------------------------------------------------------------

function onWindowResize(event) {

    if (isMobile) {

        if (window.innerWidth > window.innerHeight) {

            // landscape

            MARGIN = 25;

        } else {

            // portrait

            MARGIN = 100;

        }

    }

    SCREEN_WIDTH = window.innerWidth - 2 * SIDE_MARGIN;
    SCREEN_HEIGHT = window.innerHeight - 2 * MARGIN;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    renderer.domElement.style.top = MARGIN + "px";
    renderer.domElement.style.left = SIDE_MARGIN + "px";

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();

    if (useDeferred) {

        effectSharpen.uniforms.resolution.value.set(SCREEN_WIDTH * SCALE, SCREEN_HEIGHT * SCALE);

    }

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

}

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) * 1;
    mouseY = (event.clientY - windowHalfY) * 1;

    //mouseY = mouseY * 2 - 1;

}

function onTouchMove(event) {

    event.preventDefault();

    var touches = event.touches;
    var touch = touches[0];

    mouseX = (touch.clientX - windowHalfX) * 1;
    mouseY = (touch.clientY - windowHalfY) * 1;

}

function onClick(event) {

    switchToNextCharacter();

}

function onKeyDown(event) {

    switch (event.keyCode) {

        case 37:
            /*left*/
        case 65:
            /*A*/ switchToPreviousCharacter();
            break;

        case 39:
            /*right*/
        case 68:
            /*D*/ switchToNextCharacter();
            break;

        case 32:
            /*space*/ switchToNextCharacter();
            break;

        case 72:
            /*H*/ toggleHUD();
            break;
        case 83:
            /*S*/ toggleSharpen();
            break
        case 76:
            /*L*/ toggleLens();
            break

    }

}

// -----------------------------------------------------------------------------------

function toggleSharpen() {

    if (!useDeferred) return;

    var pars = characterList[characterIndex];

    pars.sharpen = !pars.sharpen;

}

function toggleLens() {

    if (!useDeferred) return;

    effectLens.enabled = !effectLens.enabled;

}

// -----------------------------------------------------------------------------------

function toggleHUD() {

    if (hudVisible) {

        stats.domElement.style.display = "none";
        infoElement.style.display = "none";

        hudVisible = false;

    } else {

        stats.domElement.style.display = "block";
        infoElement.style.display = "block";

        hudVisible = true;

    }

}

// -----------------------------------------------------------------------------------

function checkLoadStatus(index) {

    var pars = characterList[index];

    if (pars.loaded) {

        loadingElement.style.display = "none";

    } else {

        loadingElement.style.display = "block";

    }

}

// -----------------------------------------------------------------------------------

function switchToNextCharacter() {

    characterIndex = (characterIndex + 1) % (characterList.length);
    setTextures(characterIndex);

    var nextCharacterIndex = (characterIndex + 1) % (characterList.length);
    var nextCharacterIndex2 = (characterIndex + 2) % (characterList.length);
    loadTextures(nextCharacterIndex);
    loadTextures(nextCharacterIndex2);

    checkLoadStatus(characterIndex);

}

function switchToPreviousCharacter() {

    characterIndex = (characterIndex - 1) % (characterList.length);
    if (characterIndex < 0) characterIndex += characterList.length;

    setTextures(characterIndex);

    checkLoadStatus(characterIndex);

}

// -----------------------------------------------------------------------------------

function addCharacter() {

    var d = 4.75;
    var nSegments = 100;
    var aspectRatio = 1;

    var geometry = new XG.HeightfieldGeometry(d * aspectRatio, d, nSegments * 2, nSegments);

    var uvs = geometry.attributes.uv.array;
    for (var i = 0, il = uvs.length; i < il; i += 2) {

        uvs[i + 1] = 1.0 - uvs[i + 1];

    }

    // material

    if (useDebugMaterial) {

        planeMaterial = new XG.PhongMaterial({

            color: 0xffffff,
            map: dummyBlackMap

        });

        planeMaterial.bumpMap = dummyBlackMap;
        planeMaterial.bumpScale = 4;

    } else {

        planeMaterial = new XG.EmissiveMaterial({

            color: 0xffffff,
            map: dummyBlackMap

        });

    }

    planeMaterial.displacementMap = dummyBlackMap;
    planeMaterial.displacementScale = 0.5;

    meshRoot = new XG.Node();
    meshRoot.scale.multiplyScalar(50);

    planeMesh = new XG.Mesh(geometry, planeMaterial);
    planeMesh.rotation.x = Math.PI * 0.5;
    planeMesh.position.y = 0.0;
    meshRoot.add(planeMesh);

    scene.add(meshRoot);

    // overlay

    overlayMaterial = new XG.EmissiveMaterial({

        color: 0xffffff,
        map: dummyBlackMap

    });

    overlayMaterial.displacementMap = dummyBlackMap;
    overlayMaterial.displacementScale = 0.5;

    overlayMaterial.transparent = true;

    overlayMesh = new XG.Mesh(geometry, overlayMaterial);
    overlayMesh.rotation.x = Math.PI * 0.5;
    overlayMesh.position.y = 0.25 - 0.15;
    overlayMesh.position.z = 1.25;
    meshRoot.add(overlayMesh);

    overlayMesh.visible = false;

}

// -----------------------------------------------------------------------------------

function loadTextures(index) {

    var pars = characterList[index];

    if (pars.displacementMap === null) {

        console.log("Loading textures for character:", index);

        var baseUrl = pars.baseUrl;
        var frameUrlRoll = pars.frameUrlRoll;
        var frameUrlScroll = pars.frameUrlScroll;
        var frameUrlShift = pars.frameUrlShift;

        var depthUrl = pars.depthUrl;
        var overlayUrl = pars.overlayUrl;
        var overlayDepthUrl = pars.overlayDepthUrl;

        var highUrl = pars.highUrl;
        var highMaskUrl = pars.highMaskUrl;

        var rollSpritesUrl = pars.rollSpritesUrl;
        var scrollSpritesUrl = pars.scrollSpritesUrl;
        var shiftSpritesUrl = pars.shiftSpritesUrl;

        // -----------------------------------------------------------

        var checkLoaded = generateLoadChecker(index);

        var displacementMap = XG.ImageUtils.loadTexture(baseUrl + depthUrl, checkLoaded);
        //displacementMap.anisotropy = 8;

        pars.displacementMap = displacementMap;

        if (highUrl && highMaskUrl) {

            var highMap = XG.ImageUtils.loadTexture(baseUrl + highUrl, checkLoaded);
            highMap.anisotropy = 8;

            pars.highMap = highMap;

            var highMaskMap = XG.ImageUtils.loadTexture(baseUrl + highMaskUrl, checkLoaded);
            highMaskMap.anisotropy = 8;

            pars.highMaskMap = highMaskMap;

        } else {

            pars.highMaskMap = dummyWhiteMap;

        }

        // -----------------------------------------------------------

        var diffuseMapRollSprites = XG.ImageUtils.loadTexture(baseUrl + rollSpritesUrl, checkLoaded);
        var diffuseMapScrollSprites = XG.ImageUtils.loadTexture(baseUrl + scrollSpritesUrl, checkLoaded);
        var diffuseMapShiftSprites = XG.ImageUtils.loadTexture(baseUrl + shiftSpritesUrl, checkLoaded);

        diffuseMapRollSprites.anisotropy = 8;
        diffuseMapScrollSprites.anisotropy = 8;
        diffuseMapShiftSprites.anisotropy = 8;

        //diffuseMapRollSprites.wrapS = diffuseMapRollSprites.wrapT = XG.RepeatWrapping;
        //diffuseMapScrollSprites.wrapS = diffuseMapScrollSprites.wrapT = XG.RepeatWrapping;
        //diffuseMapShiftSprites.wrapS = diffuseMapShiftSprites.wrapT = XG.RepeatWrapping;

        pars.rollSpritesMap = diffuseMapRollSprites;
        pars.scrollSpritesMap = diffuseMapScrollSprites;
        pars.shiftSpritesMap = diffuseMapShiftSprites;

        // -----------------------------------------------------------

        if (overlayUrl) {

            var overlayMap = XG.ImageUtils.loadTexture(baseUrl + overlayUrl, checkLoaded);
            overlayMap.anisotropy = 8;
            overlayMap.premultiplyAlpha = true;

            pars.overlayMap = overlayMap;

            if (overlayDepthUrl) {

                var overlayDisplacementMap = XG.ImageUtils.loadTexture(baseUrl + overlayDepthUrl, checkLoaded);
                //overlayDisplacementMap.anisotropy = 8;

                pars.overlayDisplacementMap = overlayDisplacementMap;

            }

        }

    }

}

// -----------------------------------------------------------------------------------

function setTextures(index) {

    var pars = characterList[index];

    loadTextures(index);

    planeMaterial.displacementMap = pars.displacementMap;
    planeMaterial.displacementScale = (pars.displacementScale !== undefined) ? pars.displacementScale : 1.0;

    planeMaterial.bumpMap = pars.displacementMap;

    var aspectRatio = pars.imgWidth / pars.imgHeight;
    var scale = (pars.scale !== undefined) ? pars.scale : 1.0;
    var positionY = (pars.positionY !== undefined) ? pars.positionY : 0.25;

    planeMesh.scale.x = aspectRatio * scale;
    planeMesh.scale.z = scale;
    planeMesh.position.y = positionY;

    if (pars.overlayMap) {

        overlayMaterial.map = pars.overlayMap;
        overlayMaterial.displacementMap = pars.overlayDisplacementMap;
        overlayMaterial.displacementScale = (pars.overlayDisplacementScale !== undefined) ? pars.overlayDisplacementScale : 1.0;

        overlayMesh.scale.x = aspectRatio * scale;
        overlayMesh.scale.z = scale;

        overlayMesh.position.z = pars.overlayPositionZ;

        if (pars.overlayPositionY !== undefined) overlayMesh.position.y = pars.overlayPositionY;
        if (pars.overlayPositionX !== undefined) overlayMesh.position.x = pars.overlayPositionX;

        overlayMesh.visible = true;

    } else {

        overlayMesh.visible = false;

    }



    planeMesh.properties.deferredNeedsUpdate = true;

    var borderSide = (pars.borderSide !== undefined) ? pars.borderSide : 200;
    var borderTop = (pars.borderTop !== undefined) ? pars.borderTop : 200;
    var borderBottom = (pars.borderBottom !== undefined) ? pars.borderBottom : 200;

    borderSide += 50;

    borderMeshRight.position.x = borderSide;
    borderMeshLeft.position.x = -borderSide;

    borderMeshTop.position.y = borderTop;
    borderMeshBottom.position.y = -borderBottom;

}

// -----------------------------------------------------------------------------------

function setupDynamicTexture() {

    var nx = isMobile ? 1 : 2;
    var ny = isMobile ? 1 : 2;

    var rtWidth = 512 * nx;
    var rtHeight = 512 * ny;

    var rtParamsUByte = {

        "minFilter": XG.LinearMipMapLinearFilter,
        "magFilter": XG.LinearFilter,
        "stencilBuffer": false,
        "format": XG.RGBAFormat,
        "type": XG.UnsignedByteType

    };

    var rtDiffuse = new XG.RenderTarget(rtWidth, rtHeight, rtParamsUByte);
    rtDiffuse.generateMipmaps = true;
    rtDiffuse.depthBuffer = false;
    rtDiffuse.stencilBuffer = false;
    rtDiffuse.anisotropy = 16;

    var vertexShader = XG.ShaderChunk["vertexShaderFullscreenTriangleUV"];

    var uniformsDiffuse = {

        "diffuseSourceA": {
            type: "t",
            value: null
        },
        "diffuseSourceB": {
            type: "t",
            value: null
        },
        "diffuseSourceC": {
            type: "t",
            value: null
        },

        "highDiffuse": {
            type: "t",
            value: null
        },
        "highMask": {
            type: "t",
            value: null
        },

        "maskSize": {
            type: "v2",
            value: new XG.Vector2(0.0, 0.0)
        },
        "maskBoundingBox": {
            type: "v4",
            value: new XG.Vector4(0.0, 0.0, 0.0, 0.0)
        },

        "indexA": {
            type: "v2",
            value: new XG.Vector2(0.0, 0.0)
        },
        "indexB": {
            type: "v2",
            value: new XG.Vector2(0.0, 0.0)
        },
        "indexC": {
            type: "v2",
            value: new XG.Vector2(0.0, 0.0)
        },

        "ratioA": {
            type: "f",
            value: 0.0
        },
        "ratioB": {
            type: "f",
            value: 0.0
        },
        "ratioC": {
            type: "f",
            value: 0.0
        },

        "strengthA": {
            type: "f",
            value: 0.0
        },
        "strengthB": {
            type: "f",
            value: 0.0
        },
        "strengthC": {
            type: "f",
            value: 0.0
        },

        "gamma": {
            type: "f",
            value: 1.0
        },
        "brightness": {
            type: "f",
            value: 1.0
        },

    };

    var fragmentShaderDiffuse = [

        "uniform sampler2D diffuseSourceA;",
        "uniform sampler2D diffuseSourceB;",
        "uniform sampler2D diffuseSourceC;",

        "uniform sampler2D highDiffuse;",
        "uniform sampler2D highMask;",

        "uniform vec2 maskSize;",
        "uniform vec4 maskBoundingBox;",

        "uniform vec2 indexA;",
        "uniform vec2 indexB;",
        "uniform vec2 indexC;",

        "uniform float ratioA;",
        "uniform float ratioB;",
        "uniform float ratioC;",

        "uniform float strengthA;",
        "uniform float strengthB;",
        "uniform float strengthC;",

        "uniform float gamma;",
        "uniform float brightness;",

        "varying vec2 vUv;",

        "void main() {",

        "const float nSprites = 20.0;",

        "vec2 uvScale = vec2( maskSize.x / ( maskBoundingBox.z - maskBoundingBox.x ), maskSize.y / ( maskBoundingBox.w - maskBoundingBox.y ) );",
        "vec2 uvOffset = vec2( -maskBoundingBox.x / maskSize.x, -(1.0 - maskBoundingBox.w / maskSize.y) );",

        "vec2 uvBase = ( vUv + uvOffset ) * uvScale * vec2( 1.0, 1.0/nSprites );",

        "vec4 texelA1 = texture2D( diffuseSourceA, uvBase + vec2( 0.0, ( nSprites - 1.0 - indexA.x ) / nSprites ) );",
        "vec4 texelA2 = texture2D( diffuseSourceA, uvBase + vec2( 0.0, ( nSprites - 1.0 - indexA.y ) / nSprites ) );",

        "vec4 texelB1 = texture2D( diffuseSourceB, uvBase + vec2( 0.0, ( nSprites - 1.0 - indexB.x ) / nSprites ) );",
        "vec4 texelB2 = texture2D( diffuseSourceB, uvBase + vec2( 0.0, ( nSprites - 1.0 - indexB.y ) / nSprites ) );",

        "vec4 texelC1 = texture2D( diffuseSourceC, uvBase + vec2( 0.0, ( nSprites - 1.0 - indexC.x ) / nSprites ) );",
        "vec4 texelC2 = texture2D( diffuseSourceC, uvBase + vec2( 0.0, ( nSprites - 1.0 - indexC.y ) / nSprites ) );",

        "vec4 texelH = texture2D( highDiffuse, vUv );",
        "vec4 texelHM = texture2D( highMask, vUv );",

        "vec4 colorA = mix( texelA1, texelA2, ratioA );",
        "vec4 colorB = mix( texelB1, texelB2, ratioB );",
        "vec4 colorC = mix( texelC1, texelC2, ratioC );",

        "vec4 colorMixed = colorA * strengthA + colorB * strengthB + colorC * strengthC;",

        "gl_FragColor.rgb = mix( texelH.rgb, colorMixed.rgb, texelHM.r );",

        "gl_FragColor.rgb = pow( gl_FragColor.rgb, vec3( gamma ) ) * brightness;",

        "}"

    ].join("\n");

    var diffuseShader = {

        "fragmentShader": fragmentShaderDiffuse,
        "vertexShader": vertexShader,
        "uniforms": uniformsDiffuse

    };

    var passDiffuse = new XG.ShaderPass(diffuseShader);

    diffuseComposer = new XG.EffectComposer(innerRenderer, rtDiffuse);
    diffuseComposer.addPass(passDiffuse);

    diffuseUniforms = passDiffuse.uniforms;

    if (!useDebugMaterial) {

        planeMaterial.map = diffuseComposer.renderTarget1;

    }

    diffuseUniforms["diffuseSourceA"].value = dummyBlackMap;
    diffuseUniforms["diffuseSourceB"].value = dummyBlackMap;
    diffuseUniforms["diffuseSourceC"].value = dummyBlackMap;

}

// -----------------------------------------------------------------------------------

function animate() {

    requestAnimationFrame(animate);
    render();

    stats.update();

}

function render() {

    var delta = clock.getDelta();

    // update texture

    var pars = characterList[characterIndex];

    var zn = 20;

    var fi, fiNorm;
    var indexFloat_roll, indexN0_roll, indexN1_roll;
    var indexFloat_shift, indexN0_shift, indexN1_shift;
    var indexFloat_scroll, indexN0_scroll, indexN1_scroll;
    var ratioA, ratioB, ratioC;
    var strengthA, strengthB, strengthC, strengthABC;

    var diffuseMapsRoll = pars.diffuseMapsRoll;
    var diffuseMapsShift = pars.diffuseMapsShift;
    var diffuseMapsScroll = pars.diffuseMapsScroll;

    var dx = mouseX / SCREEN_WIDTH;
    var dy = mouseY / SCREEN_HEIGHT;

    var dd = Math.sqrt(dx * dx + dy * dy);

    var dShift = Math.abs(mouseY / window.innerHeight);
    var dScroll = Math.abs(mouseX / window.innerWidth);

    strengthA = dd;
    strengthB = 0.5 - dShift;
    strengthC = 0.5 - dScroll;

    strengthABC = strengthA + strengthB + strengthC;

    strengthA = strengthA / strengthABC;
    strengthB = strengthB / strengthABC;
    strengthC = strengthC / strengthABC;

    // roll

    fi = Math.atan2(mouseX, mouseY);
    fi += Math.PI;

    fiNorm = 0.5 * (fi / Math.PI);
    indexFloat_roll = fiNorm * (zn - 1);

    indexN0_roll = Math.floor(indexFloat_roll);
    ratioA = indexFloat_roll - indexN0_roll;

    indexN0_roll = (indexN0_roll + 5) % (zn - 1);
    indexN1_roll = (indexN0_roll + 1) % (zn - 1);

    // shift

    indexFloat_shift = 11 * mouseX / SCREEN_WIDTH;
    if (indexFloat_shift < 0) indexFloat_shift = -indexFloat_shift + 10;

    indexN0_shift = Math.floor(indexFloat_shift);
    ratioB = indexFloat_shift - indexN0_shift;

    indexN1_shift = indexN0_shift + 1;

    // scroll

    indexFloat_scroll = -9 * mouseY / SCREEN_HEIGHT;
    if (indexFloat_scroll < 0) indexFloat_scroll = -indexFloat_scroll + 10;

    indexN0_scroll = Math.floor(indexFloat_scroll);
    ratioC = indexFloat_scroll - indexN0_scroll;

    indexN1_scroll = indexN0_scroll + 1;

    //console.log( indexN0 );

    diffuseUniforms["diffuseSourceA"].value = pars.rollSpritesMap;
    diffuseUniforms["diffuseSourceB"].value = pars.shiftSpritesMap;
    diffuseUniforms["diffuseSourceC"].value = pars.scrollSpritesMap;

    diffuseUniforms["indexA"].value.set(indexN0_roll, indexN1_roll);
    diffuseUniforms["indexB"].value.set(indexN0_shift, indexN1_shift);
    diffuseUniforms["indexC"].value.set(indexN0_scroll, indexN1_scroll);

    diffuseUniforms["maskSize"].value.set(pars.maskSize[0], pars.maskSize[1]);
    diffuseUniforms["maskBoundingBox"].value.set(pars.maskBoundingBox[0], pars.maskBoundingBox[1], pars.maskBoundingBox[2], pars.maskBoundingBox[3]);

    diffuseUniforms["highDiffuse"].value = pars.highMap;
    diffuseUniforms["highMask"].value = pars.highMaskMap;

    diffuseUniforms["ratioA"].value = XG.Math.clamp(ratioA, 0.0, 1.0);
    diffuseUniforms["ratioB"].value = XG.Math.clamp(ratioB, 0.0, 1.0);
    diffuseUniforms["ratioC"].value = XG.Math.clamp(ratioC, 0.0, 1.0);

    diffuseUniforms["strengthA"].value = XG.Math.clamp(strengthA, 0.0, 1.0);
    diffuseUniforms["strengthB"].value = XG.Math.clamp(strengthB, 0.0, 1.0);
    diffuseUniforms["strengthC"].value = XG.Math.clamp(strengthC, 0.0, 1.0);

    diffuseUniforms["gamma"].value = pars.gamma;
    diffuseUniforms["brightness"].value = pars.brightness;
    diffuseComposer.render(0.1);

    // post-fx

    if (useDeferred) {

        effectSharpen.enabled = pars.sharpen;

    }

    // rotate mesh

    targetX = mouseX * .0002;
    targetY = mouseY * .0002;

    if (meshRoot) {

        meshRoot.rotation.y += 0.05 * (targetX - meshRoot.rotation.y);
        meshRoot.rotation.x += 0.05 * (targetY - meshRoot.rotation.x);

    }

    // update camera

    camera.position.set(0, 0, 400);
    camera.lookAt(target);

    // render scene

    renderer.render(scene, camera);

}