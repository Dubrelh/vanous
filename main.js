const page = document.body.id

let icon = document.getElementById('icon')

icon.addEventListener('click', function(){
    console.log('open')
    let menures = document.getElementById('menures');
    menures.classList.add('active')
    icon.style.display = "none"
})

let close = document.getElementById('close')

close.addEventListener('click', function(){
    console.log('close')
    let menures = document.getElementById('menures');
    menures.classList.remove('active')
    icon.style.display = "block"
})


// vidation du choix

let mount = [];
let tot = 0

// partie du panier

let panier = document.getElementById('panier')
let total = document.getElementById('total');

panier.addEventListener('click', function(){

    let comd = document.querySelector('.comd');
    comd.classList.add('active');

    const montant = mount.map(item => parseInt(item, 10));
    console.log(montant);

    if(total.textContent === ""){
        total.textContent = 0
        tot = total.textContent
    }

    for(let i = 0; i < mount.length; i++){
        tot = tot + montant[i]
    }
    console.log('bonjour')

    total.textContent = "Montant : " + tot + "fcfa"
})

// fermer la modal

let ferme = document.getElementById('fermer')

ferme.addEventListener('click', function(){
    let comd = document.querySelector('.comd');
    comd.classList.remove('active');

    while(mount.length){
        mount.pop();
    }

    err.textContent = ''

    console.log(mount)
})



 // compte de quantité


let compte = 1

function moin(element){
    // const aff = element.previousElementSibling;   
    const affe = element.closest('div[id]').querySelector(".qte p[id]");
    compte--;
    affe.textContent = compte
    console.log(affe.textContent)
}

function plus(element){
    // const aff = element.previousElementSibling;   
    const affe = element.closest('div[id]').querySelector(".qte p[id]");
    compte++;
    affe.textContent = compte
    console.log(affe.textContent)
}

let check = 0
let notif = document.getElementById('notif')

function valid(element){

    const nom = element.closest('div[id]');
    if(nom){
        console.log(nom.id);
    }

    const affe = element.closest('div[id]').querySelector(".qte p[id]");
    if(affe){
        console.log( "qte = " + affe.textContent);
    }

    const prix = element.closest('div[id]').querySelector(".product-price i");
    if(prix){
        console.log( "prix = " + prix.textContent);
    }

    let table = document.getElementById('table')
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let td4 = document.createElement('td')

    td1.textContent = nom.id
    td2.textContent = affe.textContent
    td3.textContent = prix.textContent*affe.textContent
    mount.push(td3.textContent);

    td1.className = 'align'
    td2.className = 'align'
    td3.className = 'align'
    td4.className = 'fas fa-xmark'
    td4.id = "supp"
    td4.onclick = function() { annuler(this); };

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    table.appendChild(tr)

    affe.textContent = 1
    compte = 1

    console.log("quantité = " + affe.textContent)
    console.log(mount)
    console.log(typeof(mount))

    check++

    notif.textContent = check
    notif.style.color = 'red'
    notif.style.backgroundColor = 'beige'

}

function annuler(element){

    setTimeout(() => {
        const supp = element.closest('tr');
        supp.innerHTML = ''
    }, 50);

    const mod = element.previousElementSibling;
    
    // mettre a jour le prix apres suppression

    tot = tot - mod.textContent
    total.textContent = "Montant : " + tot + "fcfa"

    // renitialiser le compteur

    check--
    notif.textContent = check
    if(check === 0){
    notif.style.color = 'transparent'
    notif.style.backgroundColor = 'transparent'
    }

}


// valider commande

let err = document.getElementById('err')

function envoyerCommandeWhatsApp() {

    if(check === 0){

        err.textContent = "Votre panier est vide" 
        err.style.color = "red"
        err.style.opacity = "0.4"

    }else{

        // Récupère le tableau des commandes
    let table = document.getElementById('table');
    let lignes = table.querySelectorAll('tr');
    let message = "Bonjour, je souhaite commander :%0A";
    let total = 0;

    // Parcours les lignes du tableau (sauter l'en-tête)
    for (let i = 1; i < lignes.length; i++) {
        let tds = lignes[i].querySelectorAll('td');
        if (tds.length >= 3) {
            let nom = tds[0].textContent;
            let quantite = tds[1].textContent;
            let prix = tds[2].textContent;
            message += `- ${nom} x${quantite} : ${prix} fcfa%0A`;
            total += parseInt(prix, 10);
        }
    }
    message += `%0ATotal : ${total} fcfa`;

    // Remplace par ton numéro WhatsApp (format international sans +)
    let numero = "237691317683";
    let url = `https://wa.me/${numero}?text=${message}`;
    window.open(url, '_blank');

    }

}


// commande speciale

function envoyerCommandeWhatsAppPerso() {
    // Récupération des infos du formulaire
    const nom = document.getElementById('client-nom').value.trim();
    const event = document.getElementById('event-type').value;
    const desc = document.getElementById('description').value.trim();

    // Récupération du tableau des commandes
    let table = document.getElementById('table');
    let lignes = table.querySelectorAll('tr');
    let message = `Bonjour, je souhaite commander pour un ${event}.\nNom : ${nom}\n`;
    if(desc) message += `Description : ${desc}\n`;
    let total = 0;

    for (let i = 1; i < lignes.length; i++) {
        let tds = lignes[i].querySelectorAll('td');
        if (tds.length >= 3) {
            let produit = tds[0].textContent;
            let quantite = tds[1].textContent;
            let prix = tds[2].textContent;
            message += `- ${produit} x${quantite} : ${prix} fcfa\n`;
            total += parseInt(prix, 10);
        }
    }

    // Encodage pour URL WhatsApp
    let numero = "237691317683"; // Mets ton numéro ici
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


if(page === "boutique"){

    
setTimeout(() => {
    
let gateau = document.getElementById('gateaux')
let mignardise = document.getElementById('mignardise')
let special = document.getElementById('special')
let table = [gateau,mignardise,special]

console.log(table)

for(let i = 0; i < table.length; i++){
    console.log(table[i].id)

    for(let j = 0; j < produit.length; j++){

        if(table[i].id === produit[j].categorie){
            console.log(table[i].id)

        let prod = document.createElement('div')
        let diva = document.createElement('div');
        let img = document.createElement('img')
        let divb = document.createElement('div')
        let h2 = document.createElement('h2')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let divc = document.createElement('div')
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let i1 = document.createElement('i')
        let p3 = document.createElement('p')
        let i2 = document.createElement('i')
        let button = document.createElement('button')

        prod.className = "product-card"
        diva.className = "div1"
        diva.id = "divimg"
        img.className = "product-image"
        divb.className = "div1"
        divb.id = "divres"
        h2.className = "product-title"
        p1.className = "product-description"
        p2.className = "product-price"
        divc.className = "qte"
        divc.id = produit[j].nom
        i1.className = "fas fa-minus"
        i1.onclick =  function() { moin(this); };
        p3.id = produit[j].nom
        p3.textContent = 1
        i2.className = "fas fa-plus"
        i2.onclick =  function() { plus(this); };
        button.className = "product-button"
        button.onclick = function() { valid(this); };

        img.src = produit[j].img
        divb.id = produit[j].nom
        h2.textContent = produit[j].nom
        p1.textContent = produit[j].description
        p2.innerHTML = "à partir de  <i>"+ produit[j].prix+"</i> fcfa"
        span1.textContent = "Quantité"
        button.textContent = "Ajouter au panier"

        prod.appendChild(diva)
        diva.appendChild(img)
        prod.appendChild(divb)
        divb.appendChild(h2)
        divb.appendChild(p1)
        divb.appendChild(p2)
        divb.appendChild(divc)
        divc.appendChild(span1)
        divc.appendChild(span2)
        span2.appendChild(i1)
        span2.appendChild(p3)
        span2.appendChild(i2)
        divb.appendChild(button)
        table[i].appendChild(prod)

    }

    }



}


}, 50);


}else if(page === "acceuil"){

    
setTimeout(() => {
    
let section = document.querySelector('.section')

for(let j = 0; j < produit.length; j++){

    if(produit[j].statu === "best"){

        let prod = document.createElement('div')
        let diva = document.createElement('div');
        let img = document.createElement('img')
        let divb = document.createElement('div')
        let h2 = document.createElement('h2')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let divc = document.createElement('div')
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let i1 = document.createElement('i')
        let p3 = document.createElement('p')
        let i2 = document.createElement('i')
        let button = document.createElement('button')

        prod.className = "product-card"
        diva.className = "div1"
        diva.id = "divimg"
        img.className = "product-image"
        divb.className = "div1"
        divb.id = "divres"
        h2.className = "product-title"
        p1.className = "product-description"
        p2.className = "product-price"
        divc.className = "qte"
        divc.id = produit[j].nom
        i1.className = "fas fa-minus"
        i1.onclick =  function() { moin(this); };
        p3.id = produit[j].nom
        p3.textContent = 1
        i2.className = "fas fa-plus"
        i2.onclick =  function() { plus(this); };
        button.className = "product-button"
        button.onclick = function() { valid(this); };

        img.src = produit[j].img
        divb.id = produit[j].nom
        h2.textContent = produit[j].nom
        p1.textContent = produit[j].description
        p2.innerHTML = "à partir de  <i>"+ produit[j].prix+"</i> fcfa"
        span1.textContent = "Quantité"
        button.textContent = "Ajouter au panier"

        prod.appendChild(diva)
        diva.appendChild(img)
        prod.appendChild(divb)
        divb.appendChild(h2)
        divb.appendChild(p1)
        divb.appendChild(p2)
        divb.appendChild(divc)
        divc.appendChild(span1)
        divc.appendChild(span2)
        span2.appendChild(i1)
        span2.appendChild(p3)
        span2.appendChild(i2)
        divb.appendChild(button)
        section.appendChild(prod)

    }

}



}, 500);


}


// stockage des produits

const produit = [
    {
        "img": "images/beignet.png",
        "nom": "Beignet soufflé",
        "description": "Lot de beignets sucrés ,10 pièces",
        "categorie": "mignardise",
        "prix": 2000,
        "statu": "best"
    },
    {
        "img": "images/cakemarbre.png",
        "nom": "Cake marbré",
        "description": "Moelleux et savoureux",
        "categorie": "gateaux",
        "prix": 3500,
        "statu": ""
    },
    {
        "img": "images/croissant.png",
        "nom": "Croissants",
        "description": "Lot de croissants frais, 6 pièces",
        "categorie": "chaud",
        "prix": 1500,
        "statu": ""
    },
    {
        "img": "images/cupcake.jpg",
        "nom": "Cupcakes",
        "description": "Délicieux cupcakes, aux differentes saveurs. box de 6",
        "categorie": "gateaux",
        "prix": 5000,
        "statu": "best"
    },
    {
        "img": "images/gateau choco.png",
        "nom": "Gateau chocolat",
        "description": "Moelleux et fondant au chocolat",
        "categorie": "gateaux",
        "prix": 9000,
        "statu": ""
    },
    {
        "img": "images/gateauanniv.png",
        "nom": "Gateau d'anniversaire",
        "description": "Personnalisé pour vos événements",
        "categorie": "gateaux",
        "prix": 9000,
        "statu": ""
    },
    {
        "img": "images/pack.png",
        "nom": "Pack burger pastel crepes",
        "description": "Assortiment de douceurs",
        "categorie": "mignardise",
        "prix": 10000,
        "statu": ""
    },
    {
        "img": "images/sablé.png",
        "nom": "sablés",
        "description": "Sablés croustillants, 30 pièces",
        "categorie": "mignardise",
        "prix": 2500,
        "statu": ""
    },
    {
        "img": "images/samussa.png",
        "nom": "Samoussas",
        "description": "Savoureux samoussas aux boeuf ou au poulet, 10 pièces",
        "categorie": "mignardise",
        "prix": 2000,
        "statu": "best"
    },
    {
        "img": "images/choco coco.png",
        "nom": "Chocolat coco",
        "description": "Fondant au chocolat et noix de coco",
        "categorie": "gateaux",
        "prix": 8000,
        "statu": ""
    },
    {
        "img": "images/nems.png",
        "nom": "Nems",
        "description": "croustillants et savoureux, 10 pièces",
        "categorie": "mignardise",
        "prix": 2000,
        "statu": "best"
    },
]


