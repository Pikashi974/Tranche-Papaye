var yourSelect = document.getElementById("nbJoueurs");
var button = document.getElementById('button');
var placeholder = document.getElementById('placeholder');
var object = document.getElementById("textResult");
var turnPlayer = document.getElementById("turnPlayer");

var showcase = document.getElementById("qcm");

var bac = document.getElementById('add_bac');
var petit = document.getElementById('add_petit');
var dejeuner = document.getElementById('add_dejeuner');
var gouter = document.getElementById('add_gouter');
var diner = document.getElementById('add_diner');

var nbJoueurs = yourSelect.options[ yourSelect.selectedIndex ].value;
var demarrage = [false,false,false,false, false, false];
var skip = [false,false,false,false, false, false];
var solidarity = [false,false,false,false, false, false];
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
clicks.registerListener(function(val) {
  console.log("clicks " + val);
  j = (clicks.a-1)%nbJoueurs;
});

var j = clicks.a%nbJoueurs;//Permet de savoir  quel joueur joue

var Petit_Dejeuner = {
  aInternal: [[],[],[],[],[],[]],
  images: [[],[],[],[],[],[]],
  name:"Petit_Dejeuner",
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
  images: [[],[],[],[],[],[]],  
  name: "Dejeuner",
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
  images: [[],[],[],[],[],[]],  
  name: "Gouter",
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
  images: [[],[],[],[],[],[]],  
  name: "Diner",
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
    showcase.style.display = "block";
    var texte="";
    texte= texte+"<p>"+chance.texte+ "<br>"+chance.question+"</p>";
    for (var i = 0; i < chance.propositions.length; i++) {
        texte=texte+'<button id="'+chance.propositions[i]+
                '" onclick=réponse('+i+","+
                chance.propositions.indexOf(chance.réponse)+')>'+
                chance.propositions[i]+'</button>';
    }
    showcase.innerHTML=texte;
} 

function réponse(rep,answer){
    
    if(rep === answer){
        var texte = "Bonne réponse";
        skip[j]=false;
    }
    else{
        var texte = "Mauvaise réponse";
        skip[j]=true;
    }
    showcase.innerHTML="<button onclick='close_qcm()'>"+texte+"</button>";
    
}

function close_qcm(){
    showcase.style.display = "none";
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

function solidar(position){
    showcase.style.display = "block";
    var texte = "";
    texte = texte+"<img src='./public/css/Solidarite.png'><br>";
    texte = texte+"<button onclick='boutique()'>Ajouter à la boutique</button> <button onclick=board("+position+")>Ajouter au plateau</button>";
    showcase.innerHTML = texte;
}

function boutique(){
    showcase.style.display = "none";
    fillTab();
}

function board(position){
    solidarity[position]=true;
    showcase.style.display = "none";
    fillTab();
}

function charity(joueur){
    showcase.style.display = "block";
    var texte = "<p>Faire preuve de solidarité à qui?</p><br>";
    for (var i = 0; i < nbJoueurs; i++) {
        if((demarrage[i]===false || skip[i] === true)&& i!== joueur){
            texte = texte+"<button onclick='liberate("+i+","+joueur+")'>Joueur "+(i+1)+"</button>";
        }
    }
    texte= texte + "<button onclick=\"showcase.style.display = 'none'\" >Retour</button>";
    showcase.innerHTML=texte;
    
}

function liberate(nbJoueur,giver){
    demarrage[nbJoueur]=true;
    skip[nbJoueur] = false;
    showcase.style.display = "none";
    solidarity[giver]=false;
    fillGrid();
    //clicks.a+=1;
}

function plateau_rempli(tableau,position){
    if(tableau.images[position].length> 2){
        showcase.style.display = "block";
        var texte = "<p>Retirer quelle carte?</p><br>";
        console.log(tableau.images[position].length);
        for (var i = 0; i < tableau.images[position].length; i++) {
            var element = eval(tableau.images[position][i]);
            console.log(element);
            if("img" in element){
                texte = texte + "<img onclick=retirer("+tableau.name+","+position+","+i+") src='"+element.img+"'>";
            }
            else{
                texte = texte + "<p onclick=retirer("+tableau.name+","+position+","+i+")>"+gestion_elements(element)+"</p>";
            }
        }
        showcase.innerHTML=texte;
    }
};

function gestion_elements(objet){
    if("isFruit_Legumes" in objet && "img" in objet){//On ajoute un plat ou un petit-déjeuner/gouter avec image
        //values(petitDej1).slice(0,(-petitDej1.isFruit_Legumes.length))
        return(Object.values(objet).slice(0, -2 ));
    }
    else if(("isFruit_Legumes" in objet && ("img" in objet === false))||("img" in objet)){
        //On ajoute un plat ou un petit-déjeuner/gouter sans image ou un fruit/légume avec une image
        return(Object.values(objet).slice(0, -1 ));
            
    }
    else{
        return(Object.values(objet));
    }
}

function retirer(tableau,position, i){
    
    var tab = eval(tableau);
    var test = eval(tab.images[position][i]);
    console.log("Fruit?"+tab.images[position][i].includes("fruit"));
    console.log("Légume?"+tab.images[position][i].includes("legume"));
    
    console.log("Avant: " + tab.a[position]);
    console.log("Avant: " + tab.images[position]);
    if("isFruit_Legumes" in test){
        Fruit_Legumes[position] = Fruit_Legumes[position]-test.isFruit_Legumes.length;
    }
    else if(tab.images[position][i].includes("fruit") || tab.images[position][i].includes("legume")){
        Fruit_Legumes[position] = Fruit_Legumes[position]-1;
    }
    
    tab.a[position].splice(i,1); //.splice(i, 1);
    tab.images[position].splice(i,1);
    console.log("Après: " + tab.a[position]);
    console.log("Après: " + tab.images[position]);
    
    showcase.style.display = "none";
    fillTab();
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
       var texte="<div id='first_part'><div id='PetidDej'> " + Petit_Dejeuner.a[i]
               +"</div> <div id='Vide1'></div> <div id='Dejeuner'> " + Dejeuner.a[i]
               +"</div></div> <div id='second_part'><div id='Gouter'> " + Gouter.a[i]
               +"</div> <div id='Vide2'></div> <div id='Diner'> " + Diner.a[i] +"</div><div id='Vide3'></div><div id='Solidarity'>";
       
       if(solidarity[i]===true){
           texte = texte+"<img onclick=charity("+i+") src='./public/css/Solidarite.png' width='90px'></div></div>";
       }
       else{
           texte = texte+"</div></div>";
       }
       x[i].innerHTML = texte
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
        //On regarde aussi si l'enfant ne doit pas passer son tour
        if ((i===j && demarrage[i]===true) || (i===j && demarrage[i]===false && object.innerHTML==="On démarre ")){
            //console.log("placeholder.innerHTML==="+placeholder.innerHTML);
            demarrage[i]=true;//On dit que l'enfant peut démarrer
            console.log("j= "+j);
            var result=Math.floor(Math.random() * 2) + 1;
            console.log("result= "+result);
            switch(placeholder.innerHTML){
                case "La malice":
                    skip[i]=true; //l'enfant passe son tour à cause de la carte malice
                    eval(eval("malice"+result+".action"));
                    break;
                case "La chance":
                    eval(chance1.action);
                    break;
                case "Plats":
                    var objet = "plat"+result;
                    //console.log("Plat:"+Object.values(objet));
                    bac_or_set(eval(objet),j,objet);
                    break;
                case "Petits déjeuners et goûters":
                    var objet = "petitDej"+result;
                    //console.log("Plat:"+Object.values(objet));
                    dejeuner.style.visibility = "hidden";
                    diner.style.visibility = "hidden";
                    bac_or_set(eval(objet),j,objet);
                    break;
                case "Fruits":
                    console.log("Fruit");
                    var objet = "fruit"+result;
                    //console.log("Fruit:"+Object.values(objet));
                    bac_or_set(eval(objet),j,objet);
                    break;
                case "Légumes":
                    console.log("Legume");
                    var objet = "legume"+result;
                    //console.log("Légume:"+Object.values(objet));
                    bac_or_set(eval(objet),j,objet);
                    break;
            }
            //Interdits[i] = 1;
        }
        
        fillTab();
    }
    turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
    
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

function bac_or_set(objet,position,name){
    if("solidarity" in objet){
        solidar(position);
    }
    else{
        document.getElementById("choice").style.display = "block";
        if("img" in objet){//On vérifie que la carte est une image
            console.log("A une image");
            document.getElementById("textFound").innerHTML = "<img src='"+objet.img+"'>";
        }
        else if("isFruit_Legumes" in objet ){
            console.log("A un array");
            document.getElementById("textFound").innerHTML = Object.values(objet).slice(0, -1 );
        }
        else{
            console.log("N'a pas une image");
            document.getElementById("textFound").innerHTML = Object.values(objet);
        }
        petit.onclick = function(){
            if(name.includes("fruit") || name.includes("legume")  ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isFruit_Legumes" in objet){
                Fruit_Legumes[j] = Fruit_Legumes[j]+objet.isFruit_Legumes.length;
            }
            Petit_Dejeuner.images[position].push(name);
            specific_values(objet,position, Petit_Dejeuner.a);
            plateau_rempli(Petit_Dejeuner,position);
            dejeuner.style.visibility = "visible";//Réaffiche les boutons pour les autres cartes
            diner.style.visibility = "visible";
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
//            for (var i = 0; i < nbJoueurs; i++) {
//                console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
//                console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
//                console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
//                console.log("Diner "+(i+1)+": " + Diner.a[i]);
//            }
//            console.log("Fruits_Legumes: " + Fruit_Legumes);
//            console.log("Interdits: "+ Interdits);
//            console.log("Complet: "+ complet.a);
            nb_complet(position);
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }

        };
        dejeuner.onclick = function(){
            if(name.includes("fruit") || name.includes("legume")  ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isFruit_Legumes" in objet){
                Fruit_Legumes[j] = Fruit_Legumes[j]+objet.isFruit_Legumes.length;
            }
            Dejeuner.images[position].push(name);
            specific_values(objet,position, Dejeuner.a);
            plateau_rempli(Dejeuner,position);
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
//            for (var i = 0; i < nbJoueurs; i++) {
//                console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
//                console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
//                console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
//                console.log("Diner "+(i+1)+": " + Diner.a[i]);
//            }
//            console.log("Fruits_Legumes: " + Fruit_Legumes);
//            console.log("Interdits: "+ Interdits);
//            console.log("Complet: "+ complet.a);
            nb_complet(position);
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }

        };
        gouter.onclick = function(){
            if(name.includes("fruit") || name.includes("legume")  ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isFruit_Legumes" in objet){
                Fruit_Legumes[j] = Fruit_Legumes[j]+objet.isFruit_Legumes.length;
            }
            Gouter.images[position].push(name);
            specific_values(objet,position, Gouter.a);
            plateau_rempli(Gouter,position);
            dejeuner.style.visibility = "visible";
            diner.style.visibility = "visible";
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
//            for (var i = 0; i < nbJoueurs; i++) {
//                console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
//                console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
//                console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
//                console.log("Diner "+(i+1)+": " + Diner.a[i]);
//            }
//            console.log("Fruits_Legumes: " + Fruit_Legumes);
//            console.log("Interdits: "+ Interdits);
//            console.log("Complet: "+ complet.a);
            nb_complet(position);
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }

        };
        diner.onclick = function(){
            if(name.includes("fruit") || name.includes("legume")){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isFruit_Legumes" in objet){
                Fruit_Legumes[j] = Fruit_Legumes[j] + objet.isFruit_Legumes.length;
            }
            Diner.images[position].push(name);
            specific_values(objet,position, Diner.a);
            plateau_rempli(Diner,position);
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
//            for (var i = 0; i < nbJoueurs; i++) {
//                console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
//                console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
//                console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
//                console.log("Diner "+(i+1)+": " + Diner.a[i]);
//            }
//            console.log("Fruits_Legumes: " + Fruit_Legumes);
//            console.log("Interdits: "+ Interdits);
//            console.log("Complet: "+ complet.a);
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
//            for (var i = 0; i < nbJoueurs; i++) {
//                console.log("Petit Déjeuner "+(i+1)+": " + Petit_Dejeuner.a[i]);
//                console.log("Déjeuner "+(i+1)+": " + Dejeuner.a[i]);
//                console.log("Gouter "+(i+1)+": " + Gouter.a[i]);
//                console.log("Diner "+(i+1)+": " + Diner.a[i]);
//            }
//            console.log("Fruits_Legumes: " + Fruit_Legumes);
//            console.log("Interdits: "+ Interdits);

            fillTab();

        };
    }
}

function malice(objet){
    showcase.style.display = "block";
    var texte="";
    texte= texte+"<p>"+objet.texte+"</p>";
    texte=texte+'<button id="action" onclick='+objet.action_2+'>Action</button>';
    showcase.innerHTML=texte;
}

function remove_all(num_joueur,element,carte){
    remove(Petit_Dejeuner.a[num_joueur],element);
    remove(Dejeuner.a[num_joueur],element);
    remove(Gouter.a[num_joueur],element);
    remove(Diner.a[num_joueur],element);
    showcase.style.display = "none";
    var result=Math.floor(Math.random() * 2) + 1;
    var objet = carte+result;
    console.log(num_joueur);
    bac_or_set(eval(objet),num_joueur,objet);
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

function specific_values(objet,position, tableau){
    if("isFruit_Legumes" in objet && "img" in objet){//On ajoute un plat ou un petit-déjeuner/gouter avec image
        //values(petitDej1).slice(0,(-petitDej1.isFruit_Legumes.length))
        tableau[position].push(Object.values(objet).slice(0, -2 ));
    }
    else if(("isFruit_Legumes" in objet && ("img" in objet === false))||("img" in objet)){
        //On ajoute un plat ou un petit-déjeuner/gouter sans image ou un fruit/légume avec une image        
        tableau[position].push(Object.values(objet).slice(0, -1 ));
            
    }
    else{
        tableau[position].push(Object.values(objet));
    }
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


var foo = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];
//var object = document.getElementById("textResult");


button.onclick = function() {
  var result = dice.roll();
  printNumber(result);
  object.innerHTML = card(result);
  turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
  clicks.a += 1;
  de_result();
  if (skip[(clicks.a)%nbJoueurs]===true){//L'enfant doit passer son tour
      turnPlayer.innerHTML="Le joueur "+ (1+(clicks.a%nbJoueurs) +" passe son tour <br>\n\
      Au tour du joueur "+ (1+((clicks.a+1)%nbJoueurs)));
      skip[clicks.a%nbJoueurs]=false; //Sert à redonner son tour à l'enfant s'il a du passer son tour
      clicks.a += 1;
    }
};