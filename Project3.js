
 function RandomRange(min, max) {
  return (Math.random() * (max - min) ) + min;
}

function random_rgba() {
  return 'rgba(' + RandomRange(0,255) + ',' + RandomRange(0,255) + ',' + RandomRange(0,255) + ',' + 0.3 + ')';
}



const canvas = document.querySelector("#canvas3");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;







