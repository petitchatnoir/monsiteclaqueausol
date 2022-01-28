var clear = false;
var player = 0;
var nbShots = 0;
var rndval = 0;
var nbEssais = 0;
var indicePendu = 0;
var motPendu = "root";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function guess(myguess){
  let parsed = parseInt(myguess.value, 10);
  if (isNaN(parsed)) {
    document.querySelector("#indice").innerHTML = "Veuillez entrer un entier";
    return;
  }

  if(parsed < rndval)
    document.querySelector("#indice").innerHTML = "C'est plus !";
  else if (parsed > rndval)
    document.querySelector("#indice").innerHTML = "C'est moins !";
  else {
    document.querySelector("#indice").innerHTML = "C'est ça !";
    rndval = randomIntFromInterval(1, 1000);
  }

  console.log(rndval);
}

function victory(val){
  let shots = document.querySelectorAll("#game tr td input");

  for(let i = 0; i < 3; i++){
    if(shots[i * 3].value == val && shots[(i * 3) + 1].value == val && shots[(i * 3) + 2].value == val)
      return true;
    if(shots[i].value == val && shots[i + 3].value == val && shots[i + 6].value == val)
      return true;
  }

  if(shots[0].value == val && shots[4].value == val && shots[8].value == val)
    return true;

  if(shots[2].value == val && shots[4].value == val && shots[6].value == val)
    return true;

  return false;
}

function clearGame(){
  player = 0;
  nbShots = 0;

  document.querySelector("#infos").innerHTML = "Au tour de " + (player == 1 ? "X" : "O")

  let shots = document.querySelectorAll("#game tr td input");
  for(let i = 0; i < 9; i++)
    shots[i].value = "";
}

function play(shot){
  if(shot.value != '' || nbShots == 9)
    return;

  shot.value = player == 1 ? "X" : "O";
  nbShots++;

  if(victory(shot.value)){
    document.querySelector("#infos").innerHTML = "Félicitation " + (player == 1 ? "X" : "O")
    nbShots = 9;
  } else if (nbShots == 9) {
    document.querySelector("#infos").innerHTML = "Match nul";
  } else {
    player = (player + 1) % 2;
    document.querySelector("#infos").innerHTML = "Au tour de " + (player == 1 ? "X" : "O")
  }
}


function showPart(part){
  let parts = document.querySelectorAll(".part");

  for (let i = 0; i < parts.length; i++)
    parts[i].style.display = "none";

  part.style.display = "block";
}

function rotateImage(){
  let images = document.querySelectorAll(".image > img");
  let tmp = images[0].src;

  images[0].src = images[2].src;
  images[2].src = images[3].src;
  images[3].src = images[1].src;
  images[1].src = tmp;
}

function put(val){
  if(clear){
    document.querySelector("#res").value = "";
    clear = false;
  }
  document.querySelector("#res").value += val;
}

function compute(){
  try {
      document.querySelector("#res").value = eval(document.querySelector("#res").value);
  } catch (e) {
      if (e instanceof SyntaxError) {
          document.querySelector("#res").value = e.message;
      }
  }
  clear = true;
}

function guessPendu(letter){
  let char = letter.value;
  letter.value = "";

  if(document.querySelector("#infosPendu").innerHTML == "Try again !")
    document.querySelector("#imagePendu").src = "";

  document.querySelector("#infosPendu").innerHTML = motPendu.substring(0, indicePendu);

  if(!(/[a-zA-Z]/).test(char) || char.length != 1){
    document.querySelector("#infosPendu").innerHTML = "Veuillez entrer une lettre";
    return;
  }

  if(motPendu[indicePendu] == char){
      indicePendu++;
      document.querySelector("#infosPendu").innerHTML = motPendu.substring(0, indicePendu);
      if(indicePendu == motPendu.length){
        document.querySelector("#infosPendu").innerHTML = "Bravo";
        clearPendu();
      }
  }
  else {
    document.querySelector("#imagePendu").src = "./assets/pendu/" + nbEssais + ".png";
    nbEssais++;

    if(nbEssais == 7){
      indicePendu = 0;
      nbEssais = 0;
      document.querySelector("#infosPendu").innerHTML = "Try again !";
      return;
    }
  }
}

function clearPendu(){
  indicePendu = 0;
  nbEssais = 0;
  document.querySelector("#imagePendu").src = "";
}

document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector("#res").value = "";
  rndval = randomIntFromInterval(1, 1000);
});
