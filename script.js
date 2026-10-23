import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";


/* =========================================
   FULL BODY 3D
========================================= */

let bodyScene;
let bodyCamera;
let bodyRenderer;
let bodyControls;


function createBodyViewer() {

    const container = document.getElementById("body3D");

    if (!container) return;

    // Remove placeholder
    container.innerHTML = "";

    bodyScene = new THREE.Scene();

    bodyScene.background = new THREE.Color(0x020617);


    // CAMERA

    bodyCamera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    bodyCamera.position.set(0, 1.5, 5);


    // RENDERER

    bodyRenderer = new THREE.WebGLRenderer({
        antialias: true
    });

    bodyRenderer.setPixelRatio(window.devicePixelRatio);

    bodyRenderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(bodyRenderer.domElement);


    // LIGHT

    const ambientLight =
        new THREE.AmbientLight(0xffffff, 2);

    bodyScene.add(ambientLight);


    const directionalLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    directionalLight.position.set(
        5,
        10,
        5
    );

    bodyScene.add(directionalLight);


    // CONTROLS

    bodyControls = new OrbitControls(
        bodyCamera,
        bodyRenderer.domElement
    );

    bodyControls.enableDamping = true;

    bodyControls.minDistance = 1;

    bodyControls.maxDistance = 20;


    // LOAD HUMAN MODEL

    const loader = new GLTFLoader();

    loader.load(

        "models/human-body.glb",

        function (gltf) {

            const model = gltf.scene;

            model.position.set(
                0,
                -1,
                0
            );

            model.scale.set(
                1,
                1,
                1
            );

            bodyScene.add(model);

            console.log(
                "Human body loaded successfully."
            );

        },

        function (progress) {

            console.log(
                "Loading body:",
                (progress.loaded /
                    progress.total * 100)
                    .toFixed(0) + "%"
            );

        },

        function (error) {

            console.error(
                "Could not load human-body.glb",
                error
            );

        }

    );


    // ANIMATION

    function animateBody() {

        requestAnimationFrame(
            animateBody
        );

        bodyControls.update();

        bodyRenderer.render(
            bodyScene,
            bodyCamera
        );

    }

    animateBody();


    // RESIZE

    window.addEventListener(
        "resize",
        function () {

            if (!bodyRenderer) return;

            bodyCamera.aspect =
                container.clientWidth /
                container.clientHeight;

            bodyCamera.updateProjectionMatrix();

            bodyRenderer.setSize(
                container.clientWidth,
                container.clientHeight
            );

        }
    );

}


/* =========================================
   TOOTH 3D
========================================= */

let toothScene;
let toothCamera;
let toothRenderer;
let toothControls;


function createToothViewer() {

    const container =
        document.getElementById("tooth3D");

    if (!container) return;

    container.innerHTML = "";


    toothScene = new THREE.Scene();

    toothScene.background =
        new THREE.Color(0x020617);


    // CAMERA

    toothCamera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
            container.clientHeight,
            0.1,
            1000
        );

    toothCamera.position.set(
        0,
        0,
        4
    );


    // RENDERER

    toothRenderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    toothRenderer.setPixelRatio(
        window.devicePixelRatio
    );

    toothRenderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(
        toothRenderer.domElement
    );


    // LIGHTS

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2
        );

    toothScene.add(
        ambientLight
    );


    const light =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    light.position.set(
        4,
        5,
        5
    );

    toothScene.add(light);


    // CONTROLS

    toothControls =
        new OrbitControls(
            toothCamera,
            toothRenderer.domElement
        );

    toothControls.enableDamping = true;

    toothControls.minDistance = 0.5;

    toothControls.maxDistance = 10;


    // LOAD TOOTH

    const loader =
        new GLTFLoader();

    loader.load(

        "models/tooth.glb",

        function (gltf) {

            const tooth =
                gltf.scene;

            tooth.position.set(
                0,
                0,
                0
            );

            tooth.scale.set(
                1,
                1,
                1
            );

            toothScene.add(
                tooth
            );

            console.log(
                "Tooth loaded successfully."
            );

        },

        undefined,

        function (error) {

            console.error(
                "Could not load tooth.glb",
                error
            );

        }

    );


    // ANIMATION

    function animateTooth() {

        requestAnimationFrame(
            animateTooth
        );

        toothControls.update();

        toothRenderer.render(
            toothScene,
            toothCamera
        );

    }

    animateTooth();

}


/* =========================================
   START VIEWERS
========================================= */

window.addEventListener(
    "load",
    function () {

        createBodyViewer();

        createToothViewer();

    }
);
