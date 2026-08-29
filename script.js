/* =========================================================
   CANVAS — ESTRELLAS
========================================================= */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let stars = [];


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createStars();
}


function createStars() {

    stars = [];

    const amount =
        window.innerWidth < 600 ? 100 : 170;

    for (let i = 0; i < amount; i++) {

        stars.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size:
                Math.random() * 1.5 + 0.3,

            speed:
                Math.random() * 0.25 + 0.05,

            opacity:
                Math.random(),

            twinkle:
                Math.random() * 0.02 + 0.005

        });

    }
}


function animateStars() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(star => {

        star.y += star.speed;

        if (star.y > canvas.height) {

            star.y = -5;

            star.x =
                Math.random() * canvas.width;

        }


        star.opacity += star.twinkle;


        if (
            star.opacity >= 1 ||
            star.opacity <= 0.2
        ) {

            star.twinkle *= -1;

        }


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;

        ctx.fill();

    });


    requestAnimationFrame(
        animateStars
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

animateStars();



/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const welcome =
    document.getElementById("welcome");

const letter =
    document.getElementById("letter");

const transition =
    document.getElementById("transition");

const universe =
    document.getElementById("universe");

const galaxy =
    document.getElementById("galaxy");


const startButton =
    document.getElementById("startButton");

const nextButton =
    document.getElementById("nextButton");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const enterUniverse =
    document.getElementById("enterUniverse");


const music =
    document.getElementById("music");


const scenes =
    document.querySelectorAll(".scene");

const progressBar =
    document.querySelector(".progress-bar");


const universeLines =
    document.querySelectorAll(
        ".universe-line"
    );

const universeTitle =
    document.querySelector(
        ".universe-title"
    );



/* =========================================================
   GALAXIA
========================================================= */

const galaxySpace =
    document.getElementById("galaxySpace");

const planets =
    document.querySelectorAll(
        ".main-planet"
    );


const planetModal =
    document.getElementById("planetModal");

const closePlanet =
    document.getElementById("closePlanet");

const planetNumber =
    document.getElementById("planetNumber");

const planetTitle =
    document.getElementById("planetTitle");

const planetText =
    document.getElementById("planetText");

const planetContinue =
    document.getElementById(
        "planetContinue"
    );


const rabbitCharacter =
    document.getElementById(
        "rabbitCharacter"
    );

const rabbitFront =
    document.getElementById(
        "rabbitFront"
    );



/* =========================================================
   VARIABLES
========================================================= */

let currentScene = 0;

let noClicks = 0;

let galaxyStarted = false;



/* =========================================================
   CAMBIAR PANTALLA
========================================================= */

function showScreen(screen) {

    if (!screen) return;


    document
        .querySelectorAll(".screen")
        .forEach(element => {

            element.classList.remove(
                "active"
            );

        });


    screen.classList.add(
        "active"
    );
}



/* =========================================================
   COMENZAR
========================================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            if (music) {

                music.volume = 0.25;

                music.play().catch(() => {

                    console.log(
                        "El navegador bloqueó el audio."
                    );

                });

            }


            showScreen(letter);

            currentScene = 0;

            updateScene();

        }
    );

}



/* =========================================================
   ESCENAS
========================================================= */

function updateScene() {

    scenes.forEach(
        (scene, index) => {

            scene.classList.toggle(
                "active",
                index === currentScene
            );

        }
    );


    const progress =
        ((currentScene + 1) /
        scenes.length) * 100;


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }


    if (!nextButton) return;


    if (
        currentScene ===
        scenes.length - 1
    ) {

        nextButton.style.display =
            "none";

    } else {

        nextButton.style.display =
            "block";

    }

}



/* =========================================================
   CONTINUAR
========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            if (
                currentScene <
                scenes.length - 1
            ) {

                currentScene++;

                updateScene();

            }

        }
    );

}



/* =========================================================
   SÍ ❤️
========================================================= */

if (yesButton) {

    yesButton.addEventListener(
        "click",
        () => {

            if (navigator.vibrate) {

                navigator.vibrate([
                    80,
                    50,
                    120
                ]);

            }


            showScreen(transition);


            setTimeout(
                () => {

                    showScreen(universe);

                    startUniverseIntro();

                },
                3500
            );

        }
    );

}



/* =========================================================
   NO 💔
========================================================= */

if (noButton) {

    noButton.addEventListener(
        "click",
        () => {

            noClicks++;


            if (noClicks === 1) {

                noButton.textContent =
                    "¿Segura? 🥺";

            }

            else if (noClicks === 2) {

                noButton.textContent =
                    "Piénsalo otra vez... 😭";

            }

            else if (noClicks === 3) {

                noButton.textContent =
                    "Por favor... 🥺";

            }

            else {

                noButton.textContent =
                    "Está bien... 💔";

            }

        }
    );

}



/* =========================================================
   INTRO UNIVERSO
========================================================= */

function startUniverseIntro() {

    universeLines.forEach(
        line => {

            line.classList.remove(
                "visible"
            );

        }
    );


    universeTitle.classList.remove(
        "visible"
    );


    enterUniverse.classList.remove(
        "visible"
    );


    setTimeout(
        () => {

            if (universeLines[0]) {

                universeLines[0]
                    .classList.add(
                        "visible"
                    );

            }

        },
        700
    );


    setTimeout(
        () => {

            if (universeLines[1]) {

                universeLines[1]
                    .classList.add(
                        "visible"
                    );

            }

        },
        3200
    );


    setTimeout(
        () => {

            if (universeLines[2]) {

                universeLines[2]
                    .classList.add(
                        "visible"
                    );

            }

        },
        5700
    );


    setTimeout(
        () => {

            if (universeLines[3]) {

                universeLines[3]
                    .classList.add(
                        "visible"
                    );

            }

        },
        7600
    );


    setTimeout(
        () => {

            universeTitle
                .classList.add(
                    "visible"
                );

        },
        9000
    );


    setTimeout(
        () => {

            enterUniverse
                .classList.add(
                    "visible"
                );

        },
        10500
    );

}



/* =========================================================
   ENTRAR A LA GALAXIA
========================================================= */

if (enterUniverse) {

    enterUniverse.addEventListener(
        "click",
        () => {

            if (navigator.vibrate) {

                navigator.vibrate(70);

            }


            showScreen(galaxy);


            startGalaxy();

        }
    );

}



/* =========================================================
   DATOS DE LOS 3 PLANETAS
========================================================= */

const planetData = {

    history: {

        number: "01",

        title:
            "Nuestra historia",

        text:
            "Todo comenzó de una forma que ninguno de los dos imaginaba Un día, en una partida de Free Fire, tú me mataste. 😂 Al salir al lobby te envié una solicitud… y tú la aceptaste. Pasó un tiempo antes de que me atreviera a invitarte a jugar. Al principio casi no hablaba, mientras tú llenabas el silencio con tu forma de ser, tus ocurrencias y esa manera tan divertida que tienes de hacer que todo sea diferente. Y creo que fue ahí cuando empezaste a interesarme… porque descubrí que detrás de una jugadora había alguien divertida, alguien que a veces se enoja, pero que incluso enojada sigue siendo increíblemente tierna. ❤️ Hasta que un día dijiste: Si no hablas, no inicio. Y no sé si tú lo sabías, pero esas palabras hicieron que todo comenzara. Después llegó tu número, nuestras conversaciones durante todo el día, las llamadas que se alargaban hasta quedarnos dormidos… y esas son, quizás, mis favoritas. Me gusta escucharte contarme cómo te fue en el trabajo, qué hiciste durante el día, lo que te pasó, incluso las cosas más pequeñas. Porque aunque estemos lejos, siento que de alguna manera me dejas acompañarte. Y así, entre partidas, llamadas, risas y noches juntos a la distancia, comenzó nuestra historia. Una historia que nunca empezó con un encuentro… sino con una partida que terminó llevándome hasta ti. ❤️"

    },


    promise: {

        number: "02",

        title:
            "Mi promesa",

        text:
            "¿Recuerdas aquella llamada, justo antes de que te durmieras, cuando te dije: «Prometo ir a verte»? No lo dije por decirlo. Lo dije porque realmente quiero hacerlo. Quiero recorrer todos esos kilómetros que nos separan y algún día estar frente a ti. Claro... si tú me dejas. ❤️🇪🇨✈️🇲🇽"

    },


    happy: {

        number: "03",

        title:
            "Lo feliz que me hizo conocerte",

        text:
            "Conocerte fue una de esas cosas bonitas que llegan sin avisar. Me hiciste conocer una felicidad diferente, una que aparece simplemente por hablar contigo, escucharte, conocerte un poquito más y saber que existes. Y por eso, entre tantas estrellas, siempre voy a agradecer haber encontrado la tuya. ✨❤️"

    }

};



/* =========================================================
   ABRIR PLANETAS
========================================================= */

planets.forEach(
    planet => {

        planet.addEventListener(
            "click",
            () => {

                const type =
                    planet.dataset.planet;


                const data =
                    planetData[type];


                if (!data) return;


                planetNumber.textContent =
                    data.number;


                planetTitle.textContent =
                    data.title;


                planetText.textContent =
                    data.text;


                planetModal.classList.add(
                    "show"
                );


                if (navigator.vibrate) {

                    navigator.vibrate(50);

                }

            }
        );

    }
);



/* =========================================================
   CERRAR PLANETA
========================================================= */

function closePlanetModal() {

    planetModal.classList.remove(
        "show"
    );

}


if (closePlanet) {

    closePlanet.addEventListener(
        "click",
        closePlanetModal
    );

}


if (planetModal) {

    planetModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                planetModal
            ) {

                closePlanetModal();

            }

        }
    );

}



/* =========================================================
   BOTÓN DEL MODAL
========================================================= */

if (planetContinue) {

    planetContinue.addEventListener(
        "click",
        () => {

            closePlanetModal();

        }
    );

}



/* =========================================================
   INICIAR GALAXIA
========================================================= */

function startGalaxy() {

    if (galaxyStarted) return;

    galaxyStarted = true;


    /*
        Esperamos un momento para que
        la galaxia aparezca primero.
    */

    setTimeout(
        () => {

            startRabbitJourney();

        },
        1800
    );

}



/* =========================================================
   VIAJE DEL CONEJITO
========================================================= */

function startRabbitJourney() {

    if (!rabbitCharacter) return;


    rabbitCharacter.classList.remove(
        "rabbit-active"
    );


    void rabbitCharacter.offsetWidth;


    rabbitCharacter.classList.add(
        "rabbit-active"
    );


    /*
        Cuando termina de saltar entre
        los planetas, aparece frente
        a la pantalla.
    */

    setTimeout(
        () => {

            showRabbitFront();

        },
        7800
    );

}



/* =========================================================
   CONEJITO FRENTE A LA PANTALLA
========================================================= */

function showRabbitFront() {

    if (!rabbitFront) return;


    rabbitFront.classList.remove(
        "show"
    );


    void rabbitFront.offsetWidth;


    rabbitFront.classList.add(
        "show"
    );

}



/* =========================================================
   ARRASTRAR GALAXIA
========================================================= */

let isDragging = false;

let startX = 0;
let startY = 0;

let galaxyX = 0;
let galaxyY = 0;

let targetX = 0;
let targetY = 0;


function updateGalaxyPosition() {

    galaxyX +=
        (targetX - galaxyX) * 0.08;

    galaxyY +=
        (targetY - galaxyY) * 0.08;


    if (galaxySpace) {

        galaxySpace.style.transform =
            `
            translate3d(
                ${galaxyX}px,
                ${galaxyY}px,
                0
            )
            scale(1)
            `;

    }


    requestAnimationFrame(
        updateGalaxyPosition
    );

}


updateGalaxyPosition();



/* =========================================================
   TOUCH START
========================================================= */

if (galaxySpace) {

    galaxySpace.addEventListener(
        "touchstart",
        event => {

            if (
                event.target.closest(
                    ".main-planet"
                )
            ) {

                return;

            }


            isDragging = true;

            galaxySpace.classList.add(
                "dragging"
            );


            const touch =
                event.touches[0];


            startX =
                touch.clientX;

            startY =
                touch.clientY;

        },
        {
            passive: true
        }
    );



    /* =====================================================
       TOUCH MOVE
    ===================================================== */

    galaxySpace.addEventListener(
        "touchmove",
        event => {

            if (!isDragging) return;


            const touch =
                event.touches[0];


            const deltaX =
                touch.clientX - startX;

            const deltaY =
                touch.clientY - startY;


            targetX =
                galaxyX +
                deltaX * 0.35;


            targetY =
                galaxyY +
                deltaY * 0.35;

        },
        {
            passive: true
        }
    );



    /* =====================================================
       TOUCH END
    ===================================================== */

    galaxySpace.addEventListener(
        "touchend",
        () => {

            isDragging = false;

            galaxySpace.classList.remove(
                "dragging"
            );

        }
    );

}