let input, button, greeting;


// Entity class

// Must have : NAME, HP

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

function takeDamage() {
    parentDiv = 
    console.log(this);
}

function createDamageBox() {

    var box = document.createElement("div");
    box.setAttribute('class','notebox-box');

    // Create notebox box title
    var boxtitle = document.createElement("div");
    boxtitle.setAttribute('class','notebox-box-title');
    boxtitle.innerHTML = "TAKE DAMAGE"
    box.appendChild(boxtitle);

    // Create input field
    var damageinput = document.createElement("input");
    damageinput.setAttribute('type','text');
    damageinput.setAttribute('class','notebox-box-input');
    damageinput.setAttribute('placeholder', 'DAM');
    box.appendChild(damageinput);

    // Create button
    submitbutton = document.createElement("button");
    submitbutton.setAttribute('class','notebox-box-input-button')
    submitbutton.setAttribute("onclick", 'takeDamage()');
    submitbutton.innerHTML = "DEAL";
    box.appendChild(submitbutton);

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

        //boxcontainer.appendChild(createDamageBox());

    // Append box container
    notebox.appendChild(boxcontainer);

    return notebox;

}

function createNoteboxInput(name) {
    inp = document.createElement("input");
    inp.setAttribute('type','text');
    inp.setAttribute('class','notebox-input')
    inp.setAttribute('id','input ' + name.toString());
    inp.setAttribute('placeholder', name.toString());

    return inp;
}

function userInput() {

    alert('submitted');
    _name = document.getElementById("input NAME").value.toUpperCase();
    _str = document.getElementById("input STR").value;
    _dex = document.getElementById("input DEX").value;
    _con = document.getElementById("input CON").value;
    _int = document.getElementById("input INT").value;
    _wis = document.getElementById("input WIS").value;
    _cha = document.getElementById("input CHA").value;
    _hp = document.getElementById("input HP").value;
    _maxhp = document.getElementById("input MAXHP").value;
    _ac = document.getElementById("input AC").value;
    _spelldc = document.getElementById("input SPELLDC").value;
    _perception = document.getElementById("input PERCEPTION").value;
    _speed = document.getElementById("input SPEED").value;

    notebox_container.appendChild(createNoteBox(_name, _str, _dex, _con, _int, _wis, _cha, _hp, _maxhp, _ac, _spelldc, _perception, _speed));
}

function setup() {

    notebox_base_container = document.createElement("div");
    notebox_base_container.setAttribute('class','notebox-base-container');

    // Store input field container
    noteboxInput_container = document.createElement("div");
    noteboxInput_container.setAttribute('class','notebox-input-container')

    noteboxInput_container.appendChild(createNoteboxInput('NAME'));
    noteboxInput_container.appendChild(createNoteboxInput('STR'));
    noteboxInput_container.appendChild(createNoteboxInput('DEX'));
    noteboxInput_container.appendChild(createNoteboxInput('CON'));
    noteboxInput_container.appendChild(createNoteboxInput('INT'));
    noteboxInput_container.appendChild(createNoteboxInput('WIS'));
    noteboxInput_container.appendChild(createNoteboxInput('CHA'));
    noteboxInput_container.appendChild(createNoteboxInput('HP'));
    noteboxInput_container.appendChild(createNoteboxInput('MAXHP'));
    noteboxInput_container.appendChild(createNoteboxInput('AC'));
    noteboxInput_container.appendChild(createNoteboxInput('SPELLDC'));
    noteboxInput_container.appendChild(createNoteboxInput('PERCEPTION'));
    noteboxInput_container.appendChild(createNoteboxInput('SPEED'));

    notebox_base_container.appendChild(noteboxInput_container);

    submitbutton = document.createElement("button");
    submitbutton.setAttribute('class','notebox-input-button')
    submitbutton.setAttribute("onclick", 'userInput()');
    submitbutton.innerHTML = "SUBMIT";
    notebox_base_container.appendChild(submitbutton);

    // Create input fields
    //nameinput = createNoteboxInput("NAME");
    //noteboxInput_container.appendChild(nameinput);
    // noteboxInput_container.appendChild(createNoteboxInput("HP"));
    // noteboxInput_container.appendChild(createNoteboxInput("STR"));
    // noteboxInput_container.appendChild(createNoteboxInput("DEX"));
    // noteboxInput_container.appendChild(createNoteboxInput("CON"));
    // noteboxInput_container.appendChild(createNoteboxInput("INT"));
    // noteboxInput_container.appendChild(createNoteboxInput("WIS"));
    // noteboxInput_container.appendChild(createNoteboxInput(""));
    // noteboxInput_container.appendChild(createNoteboxInput(""));





    notebox_container = document.createElement('div');
    notebox_container.setAttribute('class','notebox-container');

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));

    notebox_container.appendChild(createNoteBox('GOBBO', 8, 14, 9, 11, 12, 6, 20, 20, 12, 14, 15, 30));
    
    notebox_base_container.appendChild(notebox_container);

    document.getElementById("notebox").appendChild(notebox_base_container);

    

    // create canvas
  //createCanvas(width/2, height/2);

//   inputName = createInput();
//   inputName.position(20, 65);

//   // Create array of entities
//   entityList = [];

//   entityList.push(new Entity("Test"));

//   button = createButton('submit');
//   button.position(inputName.x + inputName.width, 65);
//   button.mousePressed(addEntity);

//   greeting = createElement('h4', 'enter data');
//   greeting.position(20, 5);

//   textAlign(CENTER);
//   textSize(20);
}

// function addEntity(name) {
//     entityList.push(new Entity(inputName.value()))
// }

// function draw() {

//     clear();

//     for(let i = 0; i < entityList.length; i++) {

//         verticalStep = 50;
//         drawY = 50 + i * verticalStep;
//         drawX = width/2;
//         rectWidth = width * 5/6;
//         rectHeight = verticalStep - 10;
//         rectCurve = 10;

//         fill(255, 255, 255, 80);
//         strokeWeight(1);
//         stroke(255, 255, 255, 100);
//         push();

//         // Draw border
//         rect(drawX - rectWidth/2, drawY - rectHeight/2, rectWidth, rectHeight, rectCurve);
//         pop();

//         fill(0, 0, 0, 100);
//         strokeWeight(1);
//         stroke(0, 0, 0, 100);
//         push();

//         textAlign(LEFT);
//         text(entityList[i].name, drawX - rectWidth/2 + 10, drawY + 8);

//         pop();
//     }
// }

// function greet() {
//   const name = input.value();
//   greeting.html('hello ' + name + '!');
//   input.value('');
// }


// class Entity {

//     constructor(inputName) {
//         this.name = inputName
//     }

// }