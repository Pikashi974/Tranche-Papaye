var yourSelect = document.getElementById("nbJoueurs");
var button = document.getElementById('button');
var placeholder = document.getElementById('placeholder');
var object = document.getElementById("textResult");
var turnPlayer = document.getElementById("turnPlayer");

//var json = require('./data.json'); //(with path)


var bac = document.getElementById('add_bac');
var petit = document.getElementById('add_petit');
var dejeuner = document.getElementById('add_dejeuner');
var gouter = document.getElementById('add_gouter');
var diner = document.getElementById('add_diner');

var nbJoueurs = yourSelect.options[ yourSelect.selectedIndex ].value;
var demarrage = [false,false,false,false, false, false];
var skip = [false,false,false,false, false, false];
var plateau = [];

var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
	switch (randomNumber){
	  	case 1:
	  		var choice = "Plats";
	  		break;
	  	case 2:
	  		var choice = "Petits déjeuners et goûters";
	  		break;
	  	case 3:
	  		var choice = "Fruits";
	  		break;
	  	case 4:
	  		var choice = "Légumes";
	  		break;
	  	case 5:
	  		var choice = "La malice";
	  		break;
	  	case 6:
	  		var choice = "La chance";
	  		break;
  	}
    return choice;
  }
};

var clicks = {
  aInternal: 0,
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};

var j = clicks.a%nbJoueurs;//Permet de savoir  quel joueur joue

var Petit_Dejeuner = {
  aInternal: [[],[],[],[],[],[]],
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};
Petit_Dejeuner.registerListener(function(val) {
    fillTab();
});

var Dejeuner = {
  aInternal: [[],[],[],[],[],[]],
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};
Dejeuner.registerListener(function(val) {
    fillTab();
});

var Gouter = {
  aInternal: [[],[],[],[],[],[]],
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};
Gouter.registerListener(function(val) {
    fillTab();
});

var Diner = {
  aInternal: [[],[],[],[],[],[]],
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};
Diner.registerListener(function(val) {
    fillTab();
});

var Fruit_Legumes =[0,0,0,0,0,0];
var Interdits = [0,0,0,0,0,0];
var boutique = [];

clicks.registerListener(function(val) {
  console.log("clicks " + val);
  j = (clicks.a-1)%nbJoueurs;
  de_result();
});
var complet = {
  aInternal: [0,0,0,0,0,0],
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};
complet.registerListener(function(val) {
    fillTab();
});

var petitDej1 = {
    first: "Macatia",
    second:"Fromage blanc",
    third:"Infusion à la verveine",
    fourth:"Pêches"
};

var petitDej2 = {
    first: "Corn Flakes",
    second:"Lait"
};



function qcm(chance){
    document.getElementById("qcm").style.display = "block";
    var texte="";
    texte= texte+"<p>"+chance.texte+ "<br>"+chance.question+"</p>";
    for (var i = 0; i < chance.propositions.length; i++) {
        texte=texte+'<button id="'+chance.propositions[i]+
                '" onclick=réponse('+i+","+
                chance.propositions.indexOf(chance.réponse)+')>'+
                chance.propositions[i]+'</button>';
    }
    document.getElementById("qcm").innerHTML=texte;
} 

function réponse(rep,answer){
    
    if(rep === answer){
        var texte = "Bonne réponse";
    }
    else{
        var texte = "Mauvaise réponse";
    }
    document.getElementById("qcm").innerHTML="<button onclick='close_qcm()'>"+texte+"</button>";
    
}

function close_qcm(){
    document.getElementById("qcm").style.display = "none";
}

function open_boutique() {
    document.getElementById("boutique").style.display = "block";
    if(boutique.length === 0){
        document.getElementById("item_boutique").innerHTML="Vide";
    }
    else{
        document.getElementById("item_boutique").innerHTML=boutique;
    }
}

function close_boutique() {
    document.getElementById("boutique").style.display = "none";
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    nbJoueurs = yourSelect.options[ yourSelect.selectedIndex ].value;
    gridCreation(nbJoueurs);
    fillTab();
    turnPlayer.innerHTML="Au tour du joueur 1";
    //object.innerHTML=PrinterArray(demarrage);
}

function printNumber(number) {
  placeholder.innerHTML = number;
}

function card(result) {
    switch (result){
        case "La malice":
        case "La chance":
	case "Plats":
        case "Petits déjeuners et goûters":
            var choice = ("On ne démarre pas ");
            
            break;
        case "Fruits":
        case "Légumes":
            var choice = ("On démarre ");
            break;
    }
    return choice;
}

function gridCreation(n){
    grid=document.getElementById("grid-tab");
    for (var i = 0; i < n; i++) {
        var item_board = document.createElement("div");
        item_board.className="grid-item";
        grid.appendChild(item_board);

        var canvas_item = document.createElement("canvas");
        canvas_item.className="myCanvas";
        item_board.appendChild(canvas_item);
        
    }
}

function fillGrid() {
    x=document.getElementsByClassName("grid-item");
    for (var i = 0; i < x.length; i++) {
       x[i].innerHTML = "Petit Déjeuner : " + Petit_Dejeuner.a[i]
               +"<br> Déjeuner : " + Dejeuner.a[i]
               +"<br> Gouter : " + Gouter.a[i]
               +"<br> Diner : " + Diner.a[i];
    }
}

function count(element,tableau){
    var n = 0;
    for(var k = 0; k < tableau.length; ++k){
        if(tableau[k] === element){
            n++;
        }
    }
    return(n);
}

function de_result(){
    for (var i = 0; i < nbJoueurs; i++) {
        ///Au départ, aucun enfant ne peut commencer s'il n'a pas obtenu un fruit ou légumes
        if ((i===j && demarrage[i]===true) || (i===j && skip[i] === false && demarrage[i]===false && object.innerHTML==="On démarre ")){
            console.log("placeholder.innerHTML==="+placeholder.innerHTML);
            demarrage[i]=true;//On dit que l'enfant peut démarrer
            console.log("j= "+j);
            var result=Math.floor(Math.random() * 2) + 1;
            
            console.log("result= "+result);
            switch(placeholder.innerHTML){
                case "La malice":
                    eval(malice1.action);
                    skip[i]=true; //l'enfant passe son tour à cause de la carte malice
                    break;
                case "La chance":
                    eval(chance1.action);
                    break;
                case "Plats":
                    var objet = eval("plat"+result);
                    console.log("Plat:"+Object.values(objet));
                    bac_or_set(objet,j);
                    break;
                case "Petits déjeuners et goûters":
                    var objet = eval("petitDej"+result);
                    console.log("Plat:"+Object.values(objet));
                    dejeuner.style.visibility = "hidden";
                    diner.style.visibility = "hidden";
                    bac_or_set(objet,j);
                    break;
                case "Fruits":
                    console.log("Fruit");
                    var objet = eval("fruit"+result);
                    Fruit_Legumes[i] = Fruit_Legumes[i]+1;
                    console.log("Fruit:"+Object.values(objet));
                    bac_or_set(objet,j);
                    break;
                case "Légumes":
                    console.log("Legume");
                    var objet = eval("legume"+result);
                    Fruit_Legumes[i] = Fruit_Legumes[i]+1;
                    console.log("Légume:"+Object.values(objet));
                    bac_or_set(objet,j);
                    break;
            }
            //Interdits[i] = 1;
        }
        skip[i]=false; //Sert à redonner son tour à l'enfant s'il a du passer son tour
        fillTab();
    }

    
}

function nb_complet(position){
    var nbComplet=0;
    if([].concat.apply([], Petit_Dejeuner.a[position]).length>=3){
       nbComplet+=1; 
    }
    if([].concat.apply([], Dejeuner.a[position]).length>=3){
       nbComplet+=1; 
    }
    if([].concat.apply([], Gouter.a[position]).length>=3){
       nbComplet+=1; 
    }
    if([].concat.apply([], Diner.a[position]).length>=3){
       nbComplet+=1; 
    }
    complet.a[position]=nbComplet;
}

function bac_or_set(objet,position){
    document.getElementById("choice").style.display = "block";
    document.getElementById("textFound").innerHTML = Object.values(objet);
    petit.onclick = function(){
        Petit_Dejeuner.a[position].push(Object.values(objet));
        dejeuner.style.visibility = "visible";
        diner.style.visibility = "visible";
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
            console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
            console.log("Diner "+(i+1)+": " + Diner.a[i]);
        }
        console.log("Fruits_Legumes: " + Fruit_Legumes);
        console.log("Interdits: "+ Interdits);
        console.log("Complet: "+ complet.a);
        nb_complet(position);
        if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
            document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
            button.disabled = true;
        }
        turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
        
    };
    dejeuner.onclick = function(){
        Dejeuner.a[position].push(Object.values(objet));
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
            console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
            console.log("Diner "+(i+1)+": " + Diner.a[i]);
        }
        console.log("Fruits_Legumes: " + Fruit_Legumes);
        console.log("Interdits: "+ Interdits);
        console.log("Complet: "+ complet.a);
        nb_complet(position);
        if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
            document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
            button.disabled = true;
        }
        turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
    };
    gouter.onclick = function(){
        Gouter.a[position].push(Object.values(objet));
        dejeuner.style.visibility = "visible";
        diner.style.visibility = "visible";
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
            console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
            console.log("Diner "+(i+1)+": " + Diner.a[i]);
        }
        console.log("Fruits_Legumes: " + Fruit_Legumes);
        console.log("Interdits: "+ Interdits);
        console.log("Complet: "+ complet.a);
        nb_complet(position);
        if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
            document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
            button.disabled = true;
        }
        turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
    };
    diner.onclick = function(){
        Diner.a[position].push(Object.values(objet));
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
            console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
            console.log("Diner "+(i+1)+": " + Diner.a[i]);
        }
        console.log("Fruits_Legumes: " + Fruit_Legumes);
        console.log("Interdits: "+ Interdits);
        console.log("Complet: "+ complet.a);
        nb_complet(position);
        if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
            document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
            button.disabled = true;
        }
        turnPlayer.innerHTML="Au tour du joueur "+(1+(clicks.a%nbJoueurs));
    };
    bac.onclick=function(){
        boutique.push(Object.values(objet));
        document.getElementById("choice").style.display = "none";
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
            console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
            console.log("Diner "+(i+1)+": " + Diner.a[i]);
        }
        console.log("Fruits_Legumes: " + Fruit_Legumes);
        console.log("Interdits: "+ Interdits);
        
        fillTab();
        turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
    };
}

function remove_all(num_joueur,element){
    remove(Petit_Dejeuner.a[num_joueur],element);
    remove(Dejeuner.a[num_joueur],element);
    remove(Gouter.a[num_joueur],element);
    remove(Diner.a[num_joueur],element);
}

function remove(tableau, element){
    for (var i = 0; i < tableau.length; i++) {
        if(tableau[i].includes(element)){
            tableau.splice(i,1);
        }
    }
}

function shuffle(object,tableau){
    if(object in tableau){
        tableau.pull(object);
    }
    
}
function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function importer(number, res){
    var texte= concat(res+number);
    texte;
    
}

function fillTab(){
    plateau=[];
    var j = clicks.a%nbJoueurs;
    for (var i = 0; i < nbJoueurs; i++) {
        if ( (clicks.a===-1 && i===0) || (i!==j && clicks.a !== -1)) { //début de jeu
            plateau.push("False \n"+complet.a[i]);
        } 
        else {
            plateau.push("Mon tour \n"+complet.a[i]);
        }
    }
    fillGrid();
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function PrinterArray(array){
    var t="";
    for (i = 0; i < array.length; i++)
        t=t+( " " + array[i]);
    fillTab();
    return t;
}

function cardToArray(Path){
    var text = read(Path);
    return(text.split("\n"));
}

var foo = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];
//var object = document.getElementById("textResult");
//var text=PrinterArray(foo);//foo pour test shuffle




//object.innerHTML=PrinterArray(demarrage);


button.onclick = function() {
  var result = dice.roll();
  printNumber(result);
  object.innerHTML = card(result);
  turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
  //object.innerHTML = PrinterArray(shuffle(foo));;
  clicks.a += 1;
  //object.innerHTML = PrinterArray(demarrage);
};