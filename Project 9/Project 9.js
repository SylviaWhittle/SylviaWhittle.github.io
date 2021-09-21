

let input, button, greeting;


function createSubBox(title, text) {
    var box = document.createElement("div");
    box.setAttribute('class','notebox-box');

    // Make notebox title
    var boxtitle = document.createElement("div");
    boxtitle.setAttribute('class','notebox-box-title');
    boxtitle.innerHTML = title;
    box.appendChild(boxtitle);

    // Make notebox body
    var boxbody = document.createElement("div");
    boxbody.setAttribute('class','notebox-box-body');
    boxbody.innerHTML = text.toString();
    box.appendChild(boxbody);

    return box;
}

function createNoteBox(name, str, dex, con, int, wis, cha, hp, maxhp, ac, spelldc, per, spd) {

    // Create a new notebox div
    var notebox = document.createElement("div");
    notebox.setAttribute('class', 'notebox');

    // Create a name for the notebox div
    var header = document.createElement("div");
    header.setAttribute('class','notebox-h1')
    header.innerHTML = name;
    notebox.appendChild(header);

    // Create stats
    var stats = document.createElement("div");
    stats.setAttribute('class','notebox-stats')
    statstring = "STR: " + str.toString() + " " + "DEX: " + dex.toString() + " " + "CON: " + con.toString() 
    + " " + "INT: " + int.toString() + " " + "WIS: " + wis.toString() + " " + "CHA: " + cha.toString();
    stats.innerHTML = statstring;
    notebox.appendChild(stats);

    // Make notebox box container
    var boxcontainer = document.createElement("div");
    boxcontainer.setAttribute('class','notebox-box-container');

        // Make notebox
        boxcontainer.appendChild(createSubBox('HP', hp));

        boxcontainer.appendChild(createSubBox('MAX HP', maxhp));

        boxcontainer.appendChild(createSubBox('AC', ac));

        boxcontainer.appendChild(createSubBox('SPELL DC', spelldc));

        boxcontainer.appendChild(createSubBox('PERCEPTION', per));

        boxcontainer.appendChild(createSubBox('SPEED', spd));

    // Append box container
    notebox.appendChild(boxcontainer);

    return notebox;

}

function setup() {


    notebox_container = document.createElement('div');
    notebox_container.setAttribute('class','notebox-container');

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));
    
    document.getElementById("notes").appendChild(notebox_container);

    // create canvas
  createCanvas(710, 400);

  inputName = createInput();
  inputName.position(20, 65);

  // Create array of entities
  entityList = [];

  entityList.push(new Entity("Test"));

  button = createButton('submit');
  button.position(inputName.x + inputName.width, 65);
  button.mousePressed(addEntity);

  greeting = createElement('h4', 'enter data');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(20);
}

function addEntity(name) {
    entityList.push(new Entity(inputName.value()))
}

function draw() {

    clear();

    for(let i = 0; i < entityList.length; i++) {

        verticalStep = 50;
        drawY = 50 + i * verticalStep;
        drawX = width/2;
        rectWidth = width * 5/6;
        rectHeight = verticalStep - 10;
        rectCurve = 10;

        fill(255, 255, 255, 80);
        strokeWeight(1);
        stroke(255, 255, 255, 100);
        push();

        // Draw border
        rect(drawX - rectWidth/2, drawY - rectHeight/2, rectWidth, rectHeight, rectCurve);
        pop();

        fill(0, 0, 0, 100);
        strokeWeight(1);
        stroke(0, 0, 0, 100);
        push();

        textAlign(LEFT);
        text(entityList[i].name, drawX - rectWidth/2 + 10, drawY + 8);

        pop();
    }
}

function greet() {
  const name = input.value();
  greeting.html('hello ' + name + '!');
  input.value('');
}


class Entity {

    constructor(inputName) {
        this.name = inputName
    }

}