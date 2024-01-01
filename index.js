let inputRange = document.querySelector("#inputRange");
let inputColor = document.querySelector("#inputColor");
let container = document.querySelector('.container');
let btnClear = document.querySelector('.btn-clear');
let btnRainbow = document.querySelector('.btn-rainbow');
let confGridSize = document.querySelector('.confGridSize');
let btnEraser = document.querySelector('.btn-eraser');
let btnDarkening = document.querySelector('.btn-darkening');
let btnDarkLight = document.querySelector('.btn-darkLight');
let body = document.querySelector('body');
let gridSize = document.createElement('p');

let rbw = false;
let eraser = false;
let darkening = false;
//let dark = 0;

gridSize.style.fontFamily = 'cursive';
gridSize.style.fontSize = 'medium';

gridSize.textContent = `${inputRange.value} x ${inputRange.value}`;

confGridSize.appendChild(gridSize);

let buildCanva = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < Math.pow(inputRange.value, 2); i++) {
        let div = document.createElement("div");
        div.setAttribute('style', 'background: white; transition: background-color 0.5s');
        container.appendChild(div);
    };
    //con grid
    //container.style.display = 'grid';
    //container.setAttribute('style',`grid-template-columns: repeat(${inputRange.value} , 1fr);`)

    //con Flexbox
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    Array.from(container.children).forEach((child) => {
        child.style.flex = `0 0 calc(100% / ${inputRange.value})`; // para hacer calculos en Css se usa Calc
    });
};

function sombrear() {
    let clicked = false;

    Array.from(container.children).forEach((child) => {
        //con función flecha
        //child.addEventListener('mouseover', (event) => { //quise convertirlo en una función flecha como "()=>" pero 'this' no se vincula al objeto por lo que es necesario "(event)"
        //    event.target.style.backgroundColor = 'grey';
        //})
        let dark = 0;
        const rojo = Math.floor(Math.random() * 256);
        const verde = Math.floor(Math.random() * 256);
        const azul = Math.floor(Math.random() * 256);

        child.addEventListener('mousedown', (event) => {
            clicked = true;
            dark+=0.1;
            if (rbw) {
                event.target.style.backgroundColor = `rgb(${rojo},${verde},${azul})`
            } else if (eraser) {
                event.target.style.backgroundColor = 'white';
            } else if (darkening){
                event.target.style.backgroundColor = `rgb(0, 0, 0,${dark})`;
            }else {
                event.target.style.backgroundColor = inputColor.value;
            }
        });

        child.addEventListener('mouseenter', function () {//con function
            if (clicked) {
                dark+=0.1;
                if (rbw) {
                    this.style.backgroundColor = `rgb(${rojo},${verde},${azul})`
                } else if (eraser) {
                    this.style.backgroundColor = 'white';
                }   else if (darkening){
                    this.style.backgroundColor = `rgb(0, 0, 0,${dark})`;
                } else {
                    this.style.backgroundColor = inputColor.value;
                }
            }
        });

        child.addEventListener('mouseup', () => {
            clicked = false;
        });

    });
}

btnDarkening.addEventListener('click',()=>{
    rbw = false;
    eraser = false;
    darkening = true;
})

btnRainbow.addEventListener('click', () => {
    rbw = true;
})

inputColor.addEventListener('click', () => {
    rbw = false;
    eraser = false;
    darkening = false;
})

btnEraser.addEventListener('click', () => {
    rbw = false;
    eraser = true;
})

buildCanva();
sombrear();

inputRange.addEventListener("input", function () {
    gridSize.textContent = `${inputRange.value} x ${inputRange.value}`;
    buildCanva();
    sombrear();
});

btnClear.addEventListener('click', () => {
    Array.from(container.children).forEach((child) => {
        child.style.backgroundColor = 'white';
    })
})

let numClicks = -1;

btnDarkLight.onclick = () => {
    numClicks *= -1;
    if(numClicks === 1) {
        body.style.backgroundColor = '#d1daf6d6';
        btnDarkLight.setAttribute('icon', 'iconamoon:mode-dark-duotone');
        btnDarkLight.style.color = 'lightslategray';
    }
    else{
        body.style.backgroundColor = '#0d1019d6';
        btnDarkLight.setAttribute('icon', 'entypo:light-up');
        btnDarkLight.style.color = '#fab96b';
    }
};