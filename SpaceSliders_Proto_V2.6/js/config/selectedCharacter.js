function selectedCharacter(_whichOne)
{
    var character1CSS = document.getElementById("Character1").style;
    var character2CSS = document.getElementById("Character2").style;
    var character3CSS = document.getElementById("Character3").style;
    var character4CSS = document.getElementById("Character4").style;

    if (_whichOne === 0) // classic rifle
    {
        character1CSS.backgroundColor = "rgba(28,134,238,1)";
        character1CSS.border          = "solid white 2px";
        character1CSS.color           = "white";

        character2CSS.backgroundColor = "rgba(255,0,0,0.5)";
        character2CSS.border          = "none";
        character2CSS.color           = "grey";

        character3CSS.backgroundColor = "rgba(0,205,0,0.5)";
        character3CSS.border          = "none";
        character3CSS.color           = "grey";

        character4CSS.backgroundColor = "rgba(255,215,0,0.5)";
        character4CSS.border          = "none";
        character4CSS.color           = "grey";
    }

    if (_whichOne === 1) // sword
    {
        character1CSS.backgroundColor = "rgba(28,134,238,0.5)";
        character1CSS.border          = "none";
        character1CSS.color           = "grey";

        character2CSS.backgroundColor = "rgba(255,0,0,1)";
        character2CSS.border          = "solid white 2px";
        character2CSS.color           = "white";

        character3CSS.backgroundColor = "rgba(0,205,0,0.5)";
        character3CSS.border          = "none";
        character3CSS.color           = "grey";

        character4CSS.backgroundColor = "rgba(255,215,0,0.5)";
        character4CSS.border          = "none";
        character4CSS.color           = "grey";
    }

    if (_whichOne === 2) // sniper
    {
        character1CSS.backgroundColor = "rgba(28,134,238,0.5)";
        character1CSS.border          = "none";
        character1CSS.color           = "grey";

        character2CSS.backgroundColor = "rgba(255,0,0,0.5)";
        character2CSS.border          = "none";
        character2CSS.color           = "grey";

        character3CSS.backgroundColor = "rgba(0,205,0,1)";
        character3CSS.border          = "solid white 2px";
        character3CSS.color           = "white";

        character4CSS.backgroundColor = "rgba(255,215,0,0.5)";
        character4CSS.border          = "none";
        character4CSS.color           = "grey";
    }

    if (_whichOne === 3) // plasma rocket
    {
        character1CSS.backgroundColor = "rgba(28,134,238,0.5)";
        character1CSS.border          = "none";
        character1CSS.color           = "grey";

        character2CSS.backgroundColor = "rgba(255,0,0,0.5)";
        character2CSS.border          = "none";
        character2CSS.color           = "grey";

        character3CSS.backgroundColor = "rgba(0,205,0,0.5)";
        character3CSS.border          = "none";
        character3CSS.color           = "grey";

        character4CSS.backgroundColor = "rgba(255,215,0,1)";
        character4CSS.border          = "solid white 2px";
        character4CSS.color           = "white";
    }
}