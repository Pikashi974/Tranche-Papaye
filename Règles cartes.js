var yourSelect = document.getElementById("nbJoueurs");//Fait r�f�rence au nombre de joueurs choisis (entre 2 et 6)
var button = document.getElementById('button');//Bouton de roulement de d�
var placeholder = document.getElementById('placeholder');//Zone o� la valeur du d� est affich�e
var object = document.getElementById("textResult");//Cach�, sert � d�terminer si le joueur d�marre ou non
var turnPlayer = document.getElementById("turnPlayer");//Affiche le joueur qui doit jouer actuellement

var showcase = document.getElementById("qcm");

var bac = document.getElementById('add_bac');
var petit = document.getElementById('add_petit');
var dejeuner = document.getElementById('add_dejeuner');
var gouter = document.getElementById('add_gouter');
var diner = document.getElementById('add_diner');

var nbJoueurs = yourSelect.options[ yourSelect.selectedIndex ].value;
var demarrage = [false,false,false,false, false, false]; //permet de v�rifier si le joueur a le droit de d�marrer
var skip = [false,false,false,false, false, false];//permet de v�rifier si le joueur doit passer son tour 
var solidarity = [false,false,false,false, false, false];//permet de v�rifier si le joueur a une carte solidarit�
var plateau = []; //permet d'afficher les repas que poss�dent chaque joueur

var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1; //Choisit al�atoirement un nombre entre 1 et 6
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

var clicks = {//Sert � g�rer le tour par tour
  aInternal: 0,
  aListener: function(val) {},
  set a(val) {//Ecoute pour savoir si la variable est modifi�e
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
clicks.registerListener(function(val) {//Va s'activer chaque fois que le nombre de clics change'
  console.log("clicks " + val);
  j = (clicks.a-1)%nbJoueurs;
});

var j = clicks.a%nbJoueurs;//Permet de savoir quel joueur joue

var Petit_Dejeuner = {
  aInternal: [[],[],[],[],[],[]],//Stocke les diff�rentes cartes mises dans petit-d�jeuner
  images: [[],[],[],[],[],[]],//Stocke les diff�rentes images li�es aux cartes dans petit-d�jeuner
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
  aInternal: [[],[],[],[],[],[]],//Stocke les diff�rentes cartes mises dans d�jeuner
  images: [[],[],[],[],[],[]],//Stocke les diff�rentes images li�es aux cartes dans d�jeuner
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
  aInternal: [[],[],[],[],[],[]],//Stocke les diff�rentes cartes mises dans gouter
  images: [[],[],[],[],[],[]],//Stocke les diff�rentes images li�es aux cartes dans gouter
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
  aInternal: [[],[],[],[],[],[]],//Stocke les diff�rentes cartes mises dans diner
  images: [[],[],[],[],[],[]],//Stocke les diff�rentes images li�es aux cartes dans  diner
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

var Fruit_Legumes =[0,0,0,0,0,0];//Regarde le nombre de fruits et l�gumes pour chaque joueur
var Interdits = [0,0,0,0,0,0];//Regarde le nombre d'aliments interdits'pour chaque joueur
var boutique = [];


var complet = {
  aInternal: [0,0,0,0,0,0],//Regarde le nombre de repas complets pour chaque joueur
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

function qcm(chance){//projette le qcm associ� � une carte chance (ou malice)
    showcase.style.display = "block";
    var texte="";
    texte= texte+"<p>"+chance.texte+ "<br>"+chance.question+"</p>";
    for (var i = 0; i < chance.propositions.length; i++) {
        texte=texte+'<button id="'+chance.propositions[i]+
                '" onclick=r�ponse('+i+","+
                chance.propositions.indexOf(chance.r�ponse)+')>'+
                chance.propositions[i]+'</button>';
    }
    showcase.innerHTML=texte;
} 

function r�ponse(rep,answer){//V�rifie si un QCM a bien �t� r�pondu
    
    if(rep === answer){
        var texte = "Bonne r�ponse";
        skip[j]=false;
    }
    else{
        var texte = "Mauvaise r�ponse";
        skip[j]=true;
    }
    showcase.innerHTML="<button onclick='close_qcm()'>"+texte+"</button>";
    
}

function close_qcm(){//Sert � fermer la fen�tre quand le QCM a �t� r�pondu(bien ou non)
    showcase.style.display = "none";
}

function open_boutique() {//Fonction qui g�re l'ouverture de la boutique
    document.getElementById("boutique").style.display = "block";
    if(boutique.length === 0){
        document.getElementById("item_boutique").innerHTML="Vide";
    }
    else{
        document.getElementById("item_boutique").innerHTML=boutique;
    }
}

function close_boutique() {//Fonction qui ferme la boutique
    document.getElementById("boutique").style.display = "none";
}

function on() {//Affiche l'overlay qui affiche le choix du nombre de joueurs
    document.getElementById("overlay").style.display = "block";
}

function off() {//Retire l'overlay qui affiche le choix du nombre de joueurs
    document.getElementById("overlay").style.display = "none";
    nbJoueurs = yourSelect.options[ yourSelect.selectedIndex ].value;
    gridCreation(nbJoueurs);
    fillTab();
    turnPlayer.innerHTML="Au tour du joueur 1";
    
}

function printNumber(number) {//Affiche la valeur du d� � sa position 
  placeholder.innerHTML = number;
}

function card(result) {//D�termine si le joueur peut d�marrer ou non
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

function solidar(position){//Agit si une personne a pioch� une carte solidarit�
    showcase.style.display = "block";
    var texte = "";
    texte = texte+"<img src='C:\\Users\\users-6425\\Documents\\JavaScript\\public\\css\\Solidarite.png'><br>";
    texte = texte+"<button onclick='boutique()'>Ajouter � la boutique</button> <button onclick=board("+position+")>Ajouter au plateau</button>";
    showcase.innerHTML = texte;
}

function boutique(){//Ajoute la carte solidarit� � la boutique
    showcase.style.display = "none";
    fillTab();
}

function board(position){//Ajoute la carte solidarit� au plateau du joueur
    solidarity[position]=true;
    showcase.style.display = "none";
    fillTab();
}

function charity(joueur){//Permet d'utiliser une carte solidarit� sur un joueur potentiel(qui n'a pas d�marr� ou qui passe son tour)
    showcase.style.display = "block";
    var texte = "<p>Faire preuve de solidarit� � qui?</p><br>";
    for (var i = 0; i < nbJoueurs; i++) {
        if((demarrage[i]===false || skip[i] === true)&& i!== joueur){
            texte = texte+"<button onclick='liberate("+i+","+joueur+")'>Joueur "+(i+1)+"</button>";
        }
    }
    texte= texte + "<button onclick=\"showcase.style.display = 'none'\" >Retour</button>";
    showcase.innerHTML=texte;
    
}

function liberate(nbJoueur,giver){//Permet � un joueur de jouer si son tour a �t� pass�/n'a pas d�marr�
    demarrage[nbJoueur]=true;
    skip[nbJoueur] = false;
    showcase.style.display = "none";
    solidarity[giver]=false;
    fillGrid();
    //clicks.a+=1;
}

function plateau_rempli(tableau,position){//S'affiche quand le joueur a plus de 3 cartes sur le plateau
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
    if("isFruit_Legumes" in objet && "img" in objet && "isInterdit" in objet){//On ajoute un plat ou un petit-d�jeuner/gouter avec image
        return(Object.values(objet).slice(0, -3 ));
    }
    else if("isFruit_Legumes" in objet && "img" in objet || "isFruit_Legumes" in objet && "isInterdit" in objet 
			|| "isInterdit" in objet && "img" in objet){//On ajoute un plat ou un petit-d�jeuner/gouter avec image
        return(Object.values(objet).slice(0, -2 ));
    }
    else if(("isFruit_Legumes" in objet && ("img" in objet === false))||("img" in objet) || "isInterdit" in objet){
        //On ajoute un plat ou un petit-d�jeuner/gouter sans image ou un fruit/l�gume avec une image
        return(Object.values(objet).slice(0, -1 ));
            
    }
    else{
        return(Object.values(objet));
    }
}

function retirer(tableau,position, i){//retire tout les �l�ments d'un tableau
    var tab = eval(tableau);
    var test = eval(tab.images[position][i]);
    console.log("Fruit?"+tab.images[position][i].includes("fruit"));
    console.log("L�gume?"+tab.images[position][i].includes("legume"));
    
    console.log("Avant: " + tab.a[position]);
    console.log("Avant: " + tab.images[position]);
    if(("isFruit_Legumes" in test && test.isFruit_Legumes===true) || tab.images[position][i].includes("fruit") || tab.images[position][i].includes("legume")){
        Fruit_Legumes[position] = Fruit_Legumes[position]-1;
    }
    else if("isInterdit" in test && test.isFruit_Legumes===true){
		Interdits[position] = Interdits[position]-1;
	}
    tab.a[position].splice(i,1); //.splice(i, 1);
    tab.images[position].splice(i,1);
    console.log("Apr�s: " + tab.a[position]);
    console.log("Apr�s: " + tab.images[position]);
    
    showcase.style.display = "none";
    fillTab();
}
function gridCreation(n){//Va cr�er un plateau pour chaque joueur
    grid=document.getElementById("grid-tab");
    for (var i = 0; i < n; i++) {
        var item_board = document.createElement("div");
        item_board.className="grid-item";
		item_board.id="grid-item"+(i+1);
        grid.appendChild(item_board);

        var canvas_item = document.createElement("canvas");
        canvas_item.className="myCanvas";
        item_board.appendChild(canvas_item);
        
    }
}

function fillGrid() {//Remplit tout les tableaux avec les �l�ments 
    x=document.getElementsByClassName("grid-item");
    for (var i = 0; i < x.length; i++) {
       var texte="<div id='first_part'><div id='PetidDej'> " + Petit_Dejeuner.a[i]
               +"</div> <div id='Vide1'></div> <div id='Dejeuner'> " + Dejeuner.a[i]
               +"</div></div> <div id='second_part'><div id='Gouter'> " + Gouter.a[i]
               +"</div> <div id='Vide2'></div> <div id='Diner'> " + Diner.a[i] +"</div><div id='Vide3'></div><div id='Solidarity'>";
       
       if(solidarity[i]===true){
           texte = texte+"<img onclick=charity("+i+") src='C:\\Users\\users-6425\\Documents\\JavaScript\\public\\css\\Solidarite.png' width='90px'></div></div>";
       }
       else{
           texte = texte+"</div></div>";
       }
       x[i].innerHTML = texte
    }
    
}

function de_result(){
    for (var i = 0; i < nbJoueurs; i++) {
        ///Au d�part, aucun enfant ne peut commencer s'il n'a pas obtenu un fruit ou l�gumes
        //On regarde aussi si l'enfant ne doit pas passer son tour
        if ((i===j && demarrage[i]===true) || (i===j && demarrage[i]===false && object.innerHTML==="On d�marre ")){
            //console.log("placeholder.innerHTML==="+placeholder.innerHTML);
            demarrage[i]=true;//On dit que l'enfant peut d�marrer
            console.log("j= "+j);
            console.log("result= "+result);
            switch(placeholder.innerHTML){
                case "La malice":
                    skip[i]=true; //l'enfant passe son tour � cause de la carte malice
                    var result=Math.floor(Math.random() * 1) + 1; //Modifier le chiffre 2 si d'autres cartes sont rajout�es
                    eval(eval("malice"+result+".action"));
                    break;
                case "La chance":
                    skip[i]=true; //l'enfant passe son tour � cause de la carte malice
                    var result=Math.floor(Math.random() * 1) + 1; //Modifier le chiffre 2 si d'autres cartes sont rajout�es
                    eval(eval("chance"+result+".action"));
                    break;
                case "Plats":
                    var result=Math.floor(Math.random() * 2) + 1; //Modifier le chiffre 2 si d'autres cartes sont rajout�es
                    var objet = "plat"+result;
                    //console.log("Plat:"+Object.values(objet));
                    bac_or_set(eval(objet),j,objet);
                    break;
                case "Petits d�jeuners et go�ters":
                    var result=Math.floor(Math.random() * 2) + 1; //Modifier le chiffre 2 si d'autres cartes sont rajout�es
                    var objet = "petitDej"+result;
                    //console.log("Plat:"+Object.values(objet));
                    dejeuner.style.visibility = "hidden";
                    diner.style.visibility = "hidden";
                    bac_or_set(eval(objet),j,objet);
                    break;
                case "Fruits":
                    console.log("Fruit");
                    var result=Math.floor(Math.random() * 2) + 1; //Modifier le chiffre 2 si d'autres cartes sont rajout�es
                    var objet = "fruit"+result;
                    //console.log("Fruit:"+Object.values(objet));
                    bac_or_set(eval(objet),j,objet);
                    break;
                case "L�gumes":
                    var result=Math.floor(Math.random() * 2) + 1; //Modifier le chiffre 2 si d'autres cartes sont rajout�es
                    console.log("Legume");
                    var objet = "legume"+result;
                    //console.log("L�gume:"+Object.values(objet));
                    bac_or_set(eval(objet),j,objet);
                    break;
            }
            //Interdits[i] = 1;
        }
        
        fillTab();
    }
    turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
    
}

function nb_complet(position){//V�rifie le nombre de repas complet
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

function bac_or_set(objet,position,name){//G�re l'action � faire si une carte est pioch�e 
    if("solidarity" in objet){
        solidar(position);
    }
    else{
        document.getElementById("choice").style.display = "block";
        if("img" in objet){//On v�rifie que la carte est une image
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
        petit.onclick = function(){//Dupliqu� pour les 4 repas, ajoute � un des repas
            if(name.includes("fruit") || name.includes("legume") || ("isFruit_Legumes" in objet && objet.isFruit_Legumes===true) ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isInterdit" in objet && objet.isInterdit===true){
                Interdits[j] = Interdits[j]+1;
            }
            Petit_Dejeuner.images[position].push(name);
            specific_values(objet,position, Petit_Dejeuner.a);
            plateau_rempli(Petit_Dejeuner,position);
            dejeuner.style.visibility = "visible";//R�affiche les boutons pour les autres cartes
            diner.style.visibility = "visible";
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
            nb_complet(position);
			//V�rifie si les conditions de victoires sont atteintes
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }

        };
        dejeuner.onclick = function(){
            if(name.includes("fruit") || name.includes("legume") || ("isFruit_Legumes" in objet && objet.isFruit_Legumes===true) ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isInterdit" in objet && objet.isInterdit===true){
                Interdits[j] = Interdits[j]+1;
            }
            Dejeuner.images[position].push(name);
            specific_values(objet,position, Dejeuner.a);
            plateau_rempli(Dejeuner,position);
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
            nb_complet(position);
			//V�rifie si les conditions de victoires sont atteintes
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }

        };
        gouter.onclick = function(){
            if(name.includes("fruit") || name.includes("legume") || ("isFruit_Legumes" in objet && objet.isFruit_Legumes===true) ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isInterdit" in objet && objet.isInterdit===true){
                Interdits[j] = Interdits[j]+1;
            }
            Gouter.images[position].push(name);
            specific_values(objet,position, Gouter.a);
            plateau_rempli(Gouter,position);
            dejeuner.style.visibility = "visible";
            diner.style.visibility = "visible";
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
            nb_complet(position);
			//V�rifie si les conditions de victoires sont atteintes
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }

        };
        diner.onclick = function(){
            if(name.includes("fruit") || name.includes("legume") || ("isFruit_Legumes" in objet && objet.isFruit_Legumes===true) ){
                Fruit_Legumes[j] = Fruit_Legumes[j]+1;
            }
            else if("isInterdit" in objet && objet.isInterdit===true){
                Interdits[j] = Interdits[j]+1;
            }
            Diner.images[position].push(name);
            specific_values(objet,position, Diner.a);
            plateau_rempli(Diner,position);
            document.getElementById("choice").style.display = "none";
            complet.a = complet.a ;
            nb_complet(position);
			//V�rifie si les conditions de victoires sont atteintes
            if(complet.a[position] >= 2 && Fruit_Legumes[position] >=5 && Interdits [position] === 0 ){
                document.getElementById("textComplet").innerHTML = "Joueur " + (position+1).toString() + " gagne";
                button.disabled = true;
            }
            turnPlayer.innerHTML="Au tour du joueur "+(1+(clicks.a%nbJoueurs));
        };
        bac.onclick=function(){//Ajoute la carte � la boutique
            boutique.push(Object.values(objet));
            document.getElementById("choice").style.display = "none";

            fillTab();

        };
    }
}

function malice(objet){//G�re les cartes malices
    showcase.style.display = "block";
    var texte="";
    texte= texte+"<p>"+objet.texte+"</p>";
    texte=texte+'<button id="action" onclick='+objet.action_2+'>Action</button>';
    showcase.innerHTML=texte;
}

function remove_all(num_joueur,element,carte){//Retire toute les cartes avec un �l�ment du plateau d'un joueur
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

function remove(tableau, element){//retire un �l�ment de la liste des repas
    for (var i = 0; i < tableau.length; i++) {
        if(tableau[i].includes(element)){
            tableau.splice(i,1);
        }
    }
    
}


function specific_values(objet,position, tableau){
    if("isFruit_Legumes" in objet && "img" in objet){//On ajoute un plat ou un petit-d�jeuner/gouter avec image
        //values(petitDej1).slice(0,(-petitDej1.isFruit_Legumes.length))
        tableau[position].push(Object.values(objet).slice(0, -2 ));
    }
    else if(("isFruit_Legumes" in objet && ("img" in objet === false))||("img" in objet)){
        //On ajoute un plat ou un petit-d�jeuner/gouter sans image ou un fruit/l�gume avec une image        
        tableau[position].push(Object.values(objet).slice(0, -1 ));
            
    }
    else{
        tableau[position].push(Object.values(objet));
    }
}

function fillTab(){//Remplit les plateaux
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


//var object = document.getElementById("textResult");


button.onclick = function() {//Gestion du bouton du d�
  var result = dice.roll();
  printNumber(result);
  object.innerHTML = card(result);
  turnPlayer.innerHTML="Au tour du joueur "+ (1+(clicks.a%nbJoueurs));
  clicks.a += 1;
  de_result();
  if (skip[(clicks.a)%nbJoueurs]===true){//L'enfant doit passer son tour
      turnPlayer.innerHTML="Le joueur "+ (1+(clicks.a%nbJoueurs) +" passe son tour <br>\n\
      Au tour du joueur "+ (1+((clicks.a+1)%nbJoueurs)));
      skip[clicks.a%nbJoueurs]=false; //Sert � redonner son tour � l'enfant s'il a du passer son tour
      clicks.a += 1;
    }
};