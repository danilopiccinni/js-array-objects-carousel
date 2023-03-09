/*
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/
// -------------------------------------------------------

/*
- array di oggetti 
- ogni oggetto contiene:
    - un immagine che deve variare al click delle freccie
        ed essere usata anche come anteprima a lato
    - un titolo 'personale' da far comparire insieme all'immagine 
    - un testo descrittivo 'personale' da far comparire sotto al suo titolo
*/
const immagini = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos",
    }, 
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay',
    }
];


// costanti e variabili presi dal documento tramite l'id
let contImgEl = document.getElementById ('cont-img')
let outputInfoEl = document.getElementById ('output-info')
let frecciaSuEl = document.getElementById ('freccia-su')
let frecciaGiuEl = document.getElementById ('freccia-giu')
let contAnteprimeEl = document.getElementById ('cont-anteprime')
let bottoneStartStopEl = document.getElementById ('bottone-start-stop')
let bottoneReverseEl = document.getElementById ('bottone-reverse')

// ciclo for che crea le anteprime da visualizzare in pagina a lato della immagine grande
for (let i in immagini) {

    // crea un elemento 'img' in pagina assegnandola a un una variabile
    let nuovaAnteprima = document.createElement ('img')

    // calcola l'altezza dell'anteprima sulla base della lunghezza dell'array 
    // suddividendo appunto l'altezza disponibile per la quantità degli oggetti nell'array
    nuovaAnteprima.style.height = 'calc(100% /' + immagini.length + ')'

    // agggiunge una classe 'anteprime' che in css danno un po di stile da assumere
    nuovaAnteprima.classList.add ('anteprime')

    // tramite la variabile dichiarata che creava l'elemento in pagina (img) e il suo valore 'src'
    // gli assegna l'immagine servendosi dell'indice 
    nuovaAnteprima.src = immagini[i].image

    // appende l'elemento creato al contenitore scelto in pagina come output
    contAnteprimeEl.append (nuovaAnteprima)

}

// tramite il querySelectorAll bersagliamo tutti gli elementi con una determinata classe ('anteprime')
// assegnandola a una variabile che automaticamente viene creata come un array
const anteprime = document.querySelectorAll ('.anteprime')

// immagine da visualizzare al caricamento della pagina
// con indice 0 specifichiamo che trattiamo il primo elemento dell'array
let index = 0;
// assegnamo al src del contenitore scelto come output dell'immagine grande da visualizzare il valore 'image' riferito sempre al primo elemento (index=0)
contImgEl.src = immagini[index].image
// assegna al primo elemento (index=0) la classe active che servirà a rendere visibile questa anteprima piu' visibile delle altre 
anteprime[index].classList.add('active')
// fa comparire in pagina il titolo e la descrizione relative sempre al primo elemento (index = 0)
outputInfoEl.innerHTML = immagini[index].title + '<br>' + immagini[index].text 

let isGoing =false
let StartStop;
bottoneStartStopEl.addEventListener('click' , function() {
    if (isGoing) {
        clearInterval(StartStop)
        isGoing = false
    } else {
        StartStop = setInterval (cambiaImmagineInGiu , 3000 )
        isGoing = true
    }
    
})

// crea una funzione tramite il click sul tasto 'freccia-giu'
frecciaGiuEl.addEventListener ('click' , function(){

    cambiaImmagineInGiu()
    
    // // fa aumentare il contatore index di uno appena chlicchiamo
    // index++;

    // // rimuove la classe active dall'immagine precedente
    // anteprime[index - 1].classList.remove('active')
    
    // // condizione per regolare il ciclo infinito 
    // if (index == immagini.length) {
    //     // se la condizione è vera significa che siamo sull'ultimo elemento della lista 
    //     // quindi resettiamo index a 0 per tornare sul primo elemento
    //     index = 0
    // }
    
    // // aggiunge la classe active
    // anteprime[index].classList.add('active')
    // // sostituisce l'imaggine che l'immagine dell'elemento con index corrente subito dopo il click
    // contImgEl.src = immagini[index].image
    // // aggiunge il titolo e la descrizione riferite sempre al elemento della lista corrente (quindi specificando l'index contatore)
    // outputInfoEl.innerHTML = immagini[index].title + '<br>' + immagini[index].text 
     
})

// crea una funzione tramite il click dul tasto 'freccia-su' in pagina
frecciaSuEl.addEventListener ('click' , function() {

    cambiaImmagineInSu()

//     // fa diminuire l'index di 1 appena clicchiamo
//     index--;
    
// // per regolare il ciclo infinito
//     // condizione che controlla se l'index scenda sotto lo zero e quindi 'sotto il primo elemento dell'array che non esiste
//     if (index == -1) {

//         // essendo entrato qui,quindi con condizione vera
//             // rimuove la classe active al primo elemento dell'array
//         anteprime[0].classList.remove('active');
//             // riassegna l'indice in modo da bersagliare l'ultimo elemento della lista 
//             // (sapendo che la lunghezza della lista non combacia con l'index)
//             // esempio: se l'array contiene 7 elementi, l'index dell'ultimo elemento è 6 perche si parte da 0
//         index = immagini.length - 1;
//     // altrimenti
//     } else {
//         // se la condizione è falsa togliamo la classe active all'elemento sopra di esso specificando che l'elemento con index aumentato di uno gli va tolta la classe
//         anteprime[index + 1].classList.remove('active');

//     }
    
//     // assegna all'elemento con l'index corrente la classe active
//     anteprime[index].classList.add('active')
//     // sostituisce l'imaggine che l'immagine dell'elemento con index corrente subito dopo il click
//     contImgEl.src = immagini[index].image
//     // aggiunge il titolo e la descrizione riferite sempre al elemento della lista corrente (quindi specificando l'index contatore)
//     outputInfoEl.innerHTML = immagini[index].title + '<br>' + immagini[index].text 


}) 



function cambiaImmagineInGiu() {

        // fa aumentare il contatore index di uno appena chlicchiamo
        index++;

        // rimuove la classe active dall'immagine precedente
        anteprime[index - 1].classList.remove('active')
        
        // condizione per regolare il ciclo infinito 
        if (index == immagini.length) {
            // se la condizione è vera significa che siamo sull'ultimo elemento della lista 
            // quindi resettiamo index a 0 per tornare sul primo elemento
            index = 0
        }
        
        // aggiunge la classe active
        anteprime[index].classList.add('active')
        // sostituisce l'imaggine che l'immagine dell'elemento con index corrente subito dopo il click
        contImgEl.src = immagini[index].image
        // aggiunge il titolo e la descrizione riferite sempre al elemento della lista corrente (quindi specificando l'index contatore)
        outputInfoEl.innerHTML = immagini[index].title + '<br>' + immagini[index].text 

}

function cambiaImmagineInSu() {
        // fa diminuire l'index di 1 appena clicchiamo
        index--;
    
        // per regolare il ciclo infinito
            // condizione che controlla se l'index scenda sotto lo zero e quindi 'sotto il primo elemento dell'array che non esiste
            if (index == -1) {
        
                // essendo entrato qui,quindi con condizione vera
                    // rimuove la classe active al primo elemento dell'array
                anteprime[0].classList.remove('active');
                    // riassegna l'indice in modo da bersagliare l'ultimo elemento della lista 
                    // (sapendo che la lunghezza della lista non combacia con l'index)
                    // esempio: se l'array contiene 7 elementi, l'index dell'ultimo elemento è 6 perche si parte da 0
                index = immagini.length - 1;
            // altrimenti
            } else {
                // se la condizione è falsa togliamo la classe active all'elemento sopra di esso specificando che l'elemento con index aumentato di uno gli va tolta la classe
                anteprime[index + 1].classList.remove('active');
        
            }
            
            // assegna all'elemento con l'index corrente la classe active
            anteprime[index].classList.add('active')
            // sostituisce l'imaggine che l'immagine dell'elemento con index corrente subito dopo il click
            contImgEl.src = immagini[index].image
            // aggiunge il titolo e la descrizione riferite sempre al elemento della lista corrente (quindi specificando l'index contatore)
            outputInfoEl.innerHTML = immagini[index].title + '<br>' + immagini[index].text 
}