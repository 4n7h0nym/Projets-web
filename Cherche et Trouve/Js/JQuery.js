/*
    Auteur:      Anthony Laforest
    Description: Logique de jeu cherche et trouve qui gère l'état du jeu, minuterie, génération d'objet,
                 interaction d'utilisateur et condition de victoire ou défaite.
    Date:        2026-04-17.
*/

$(document).ready(function () {
    const minuterieId = document.getElementById('minuterie');

    const minuteDebut = 1;
    let intervalTimer = null;
    let nbErreur = 0;
    let temps = minuteDebut * 60;
    let firstTime = true;
    let listeObjets = [];
    let nbTrouver = 0;
    let nbPartiesPerdues = 0;
    let nbPartiesGagnées = 0;

    let tousLesObjets = [
        { num: 0, nom: "cadran", img: "/img/cadran.png" },
        { num: 0, nom: "parapluie", img: "/img/parapluie.png" },
        { num: 0, nom: "chapeau", img: "/img/chapeau.png" },
        { num: 0, nom: "stylo", img: "/img/stylo.png" },
        { num: 0, nom: "boussole", img: "/img/boussole.png" },
        { num: 0, nom: "casque d'écoute", img: "/img/casque-ecoute.png" },
        { num: 0, nom: "lampe", img: "/img/Lampe.png" },
        { num: 0, nom: "loupe", img: "/img/loupe.png" },
        { num: 0, nom: "pomme", img: "/img/pomme.png" },
        { num: 0, nom: 'chat', img: '/img/chat.png' }
    ];



    $("#Commencer").on('click', function () {

        $(".image").attr("style", "");
        $('.gagnée').remove();
        $('.perdue').remove();
        $("#fond").css("visibility", "visible");

        nbTrouver = 0;
        nbErreur = 0;
        $('#objetsTrouves').html((nbTrouver).toString())
        clearInterval(intervalTimer);
        $("#Pause").val("Pause");
        temps = minuteDebut * 60;
        intervalTimer = setInterval(updateTimer, 1000);
        if ($('#fond').attr('src') == '/img/fond1.jpg' && firstTime == false) {
            $('#fond').attr('src', '/img/fond2.jpg');
        }
        else if ($('#fond').attr('src') == '/img/fond2.jpg' && firstTime == false) {
            $('#fond').attr('src', '/img/fond1.jpg');
        }
        else {
            firstTime = false;
        }

        $(this).val("Recommencer");
        $(this).css("font-size", "20px");
        $("#fond").css("visibility", "visible");

        listeObjets = tirerMotsAleatoires();

        genererObjets();
    });

    $("#Pause").on('click', function () {
        if ($(this).val() == "Pause") {
            $(this).val("Continuer")
            $("#fond").css("visibility", "hidden");
            $(".objet").css("visibility", "hidden");

            clearInterval(intervalTimer);

        }
        else {
            $(this).val("Pause")
            $("#fond").css("visibility", "visible");
            $(".objet").css("visibility", "visible");
            intervalTimer = setInterval(updateTimer, 1000);
        }

    });

    $("#fond").on('click', function () {
        temps = temps - 5;
        nbErreur++;
        $("#erreurs").html(nbErreur.toString());
    });

    function tirerMotsAleatoires() {
        let copie = [...tousLesObjets];
        let selection = [];

        for (let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * copie.length);
            let objet = copie[index];
            objet.num = i;
            selection.push(objet);
            copie.splice(index, 1);
            $('#objet' + i).html(objet.nom);
            $('#objet' + i).css('text-decoration', 'none');
        }

        return selection;
    }
    function genererObjets() {
        $(".objet").remove();

        for (let i = 0; i < listeObjets.length; i++) {

            let obj = listeObjets[i];

            let x = Math.floor(Math.random() * 760);
            let y = Math.floor(Math.random() * 560);

            let div = $("<div></div>")
                .addClass("objet")
                .attr("data-nom", obj.nom)
                .attr("data-no", obj.num)
                .css({
                    left: x + "px",
                    top: y + "px",
                    backgroundImage: `url(${obj.img})`
                });

            $(".image").append(div);
        }
    }


    function updateTimer() {
        const minutes = Math.floor(temps / 60);
        let seconds = temps % 60;

        if (seconds < 10) {
            seconds = '0' + seconds
        }
        minuterieId.innerHTML = `${minutes}:${seconds}`;
        temps--;

        if (temps == 0 || temps <= 0) {
            clearInterval(intervalTimer);
            $("#fond").css("visibility", "hidden");
            $('.image').append('<div class="perdue">Partie perdue!!!</div>');
            $('.objet').css("visibility", "hidden");
            nbPartiesPerdues++;
            $('#partiesPerdues').html(nbPartiesPerdues.toString());
        }
    }

    $(document).on("click", ".objet", function () {
        objectTrouve = $(this) 
        $(this).addClass("objetTrouve");
        nbTrouver++;
        $('#objetsTrouves').html((nbTrouver).toString())
        let num = $(this).data('no');
        $('#objet' + num).css('text-decoration', 'line-through');

        if (nbTrouver == listeObjets.length) {
            clearInterval(intervalTimer);
            $("#fond").css("visibility", "hidden");
            $('.image').append('<div class="gagnée">Partie gagnée!!!</div>');
            nbPartiesGagnées++;
            $('#partiesGagnees').html((nbPartiesGagnées).toString())
        }
        setTimeout(function () {
            objectTrouve.remove();
        },900);
    });



});




