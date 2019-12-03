var yourSelect = document.getElementById("nbJoueurs");
var button = document.getElementById('button');
var placeholder = document.getElementById('placeholder');
var object = document.getElementById("textResult");
var turnPlayer = document.getElementById("turnPlayer");

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
	  		var choice = "Petits d�jeuners et go�ters";
	  		break;
	  	case 3:
	  		var choice = "Fruits";
	  		break;
	  	case 4:
	  		var choice = "L�gumes";
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

function qcm(chance){
    document.getElementById("qcm").style.display = "block";
    var texte="";
    texte= texte+"<p>"+chance.texte+ "<br>"+chance.question+"</p>";
    for (var i = 0; i < chance.propositions.length; i++) {
        texte=texte+'<button id="'+chance.propositions[i]+
                '" onclick=r�ponse('+i+","+
                chance.propositions.indexOf(chance.r�ponse)+')>'+
                chance.propositions[i]+'</button>';
    }
    document.getElementById("qcm").innerHTML=texte;
} 

function r�ponse(rep,answer){
    
    if(rep === answer){
        var texte = "Bonne r�ponse";
    }
    else{
        var texte = "Mauvaise r�ponse";
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
        case "Petits d�jeuners et go�ters":
            var choice = ("On ne d�marre pas ");
            
            break;
        case "Fruits":
        case "L�gumes":
            var choice = ("On d�marre ");
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
       x[i].innerHTML = "<div id='first_part'><div id='1_1'> " + Petit_Dejeuner.a[i]
               +"</div> <div id='1_2'></div> <div id='1_3'> " + Dejeuner.a[i]
               +"</div></div> <div id='second_part'><div id='2_1'> " + Gouter.a[i]
               +"</div> <div id='2_2'></div> <div id='2_3'> " + Diner.a[i] +"</div></div>";
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
        ///Au d�part, aucun enfant ne peut commencer s'il n'a pas obtenu un fruit ou l�gumes
        if ((i===j && demarrage[i]===true) || (i===j && skip[i] === false && demarrage[i]===false && object.innerHTML==="On d�marre ")){
            console.log("placeholder.innerHTML==="+placeholder.innerHTML);
            demarrage[i]=true;//On dit que l'enfant peut d�marrer
            console.log("j= "+j);
            var result=Math.floor(Math.random() * 2) + 1;
            var has_skip = false;
            console.log("result= "+result);
            switch(placeholder.innerHTML){
                case "La malice":
                    eval(eval("malice"+result+".action"));
                    skip[i]=true; //l'enfant passe son tour � cause de la carte malice
                    has_skip=true;
                    break;
                case "La chance":
                    eval(chance1.action);
                    break;
                case "Plats":
                    var objet = eval("plat"+result);
                    console.log("Plat:"+Object.values(objet));
                    bac_or_set(objet,j);
                    break;
                case "Petits d�jeuners et go�ters":
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
                case "L�gumes":
                    console.log("Legume");
                    var objet = eval("legume"+result);
                    Fruit_Legumes[i] = Fruit_Legumes[i]+1;
                    console.log("L�gume:"+Object.values(objet));
                    bac_or_set(objet,j);
                    break;
            }
            //Interdits[i] = 1;
        }
        
        fillTab();
        if (has_skip === false){
            skip[i]=false; //Sert � redonner son tour � l'enfant s'il a du passer son tour
        }
        turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
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
    if("img" in objet){//On v�rifie que la carte est une image
        console.log("A une image");
        document.getElementById("textFound").innerHTML = "<img src='"+objet.img+"'>";
    }
    else{
        console.log("N'a pas une image");
        document.getElementById("textFound").innerHTML = Object.values(objet);
    }
    
    petit.onclick = function(){
        if("img" in objet){//On v�rifie que la carte a une image
            Petit_Dejeuner.a[position].push("<img src='"+objet.img+"'>");
        }
        else{
            Petit_Dejeuner.a[position].push(Object.values(objet));
        }
        dejeuner.style.visibility = "visible";//R�affiche les boutons pour les autres cartes
        diner.style.visibility = "visible";
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit D�jeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("D�jeuner "+(i+1)+": " + Dejeuner.a[i]);
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
        
    };
    dejeuner.onclick = function(){
        if("img" in objet){//On v�rifie que la carte a une image
            Dejeuner.a[position].push(Object.values(objet).slice(0, -1));
        }
        else{
            Dejeuner.a[position].push(Object.values(objet));
        }
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit D�jeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("D�jeuner "+(i+1)+": " + Dejeuner.a[i]);
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

    };
    gouter.onclick = function(){
        if("img" in objet){//On v�rifie que la carte a une image
            Gouter.a[position].push(Object.values(objet).slice(0, -1));
        }
        else{
            Gouter.a[position].push(Object.values(objet));
        }
        dejeuner.style.visibility = "visible";
        diner.style.visibility = "visible";
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit D�jeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("D�jeuner "+(i+1)+": " + Dejeuner.a[i]);
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

    };
    diner.onclick = function(){
        if("img" in objet){//On v�rifie que la carte a une image
            Diner.a[position].push(Object.values(objet).slice(0, -1));
        }
        else{
            Diner.a[position].push(Object.values(objet));
        }
        document.getElementById("choice").style.display = "none";
        complet.a = complet.a ;
        for (var i = 0; i < nbJoueurs; i++) {
            console.log("Petit D�jeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("D�jeuner "+(i+1)+": " + Dejeuner.a[i]);
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
            console.log("Petit D�jeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
            console.log("D�jeuner "+(i+1)+": " + Dejeuner.a[i]);
            console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
            console.log("Diner "+(i+1)+": " + Diner.a[i]);
        }
        console.log("Fruits_Legumes: " + Fruit_Legumes);
        console.log("Interdits: "+ Interdits);
        
        fillTab();

    };
}

function malice(objet){
    document.getElementById("qcm").style.display = "block";
    var texte="";
    texte= texte+"<p>"+objet.texte+"</p>";
    texte=texte+'<button id="action" onclick='+objet.action_2+'>Action</button>';
    document.getElementById("qcm").innerHTML=texte;
}

function remove_all(num_joueur,element,carte){
    remove(Petit_Dejeuner.a[num_joueur],element);
    remove(Dejeuner.a[num_joueur],element);
    remove(Gouter.a[num_joueur],element);
    remove(Diner.a[num_joueur],element);
    document.getElementById("qcm").style.display = "none";
    var result=Math.floor(Math.random() * 2) + 1;
    var objet = eval(carte+result);
    bac_or_set(objet,num_joueur);
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
        if ( (clicks.a===-1 && i===0) || (i!==j && clicks.a !== -1)) { //d�but de jeu
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