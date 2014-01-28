function selectedCharacter(_whichOne)
{
    if (_whichOne === 0) // classic rifle
    {
        document.getElementById("Character1").style.backgroundColor = "rgba(28,134,238,1)";
        document.getElementById("Character1").style.border          = "solid white 2px";
        document.getElementById("Character1").style.color           = "white";

        document.getElementById("Character2").style.backgroundColor = "rgba(255,0,0,0.5)";
        document.getElementById("Character2").style.border          = "none";
        document.getElementById("Character2").style.color           = "grey";

        document.getElementById("Character3").style.backgroundColor = "rgba(0,205,0,0.5)";
        document.getElementById("Character3").style.border          = "none";
        document.getElementById("Character3").style.color           = "grey";

        document.getElementById("Character4").style.backgroundColor = "rgba(255,215,0,0.5)";
        document.getElementById("Character4").style.border          = "none";
        document.getElementById("Character4").style.color           = "grey";
    }

    if (_whichOne === 1) // sword
    {
        document.getElementById("Character1").style.backgroundColor = "rgba(28,134,238,0.5)";
        document.getElementById("Character1").style.border          = "none";
        document.getElementById("Character1").style.color           = "grey";

        document.getElementById("Character2").style.backgroundColor = "rgba(255,0,0,1)";
        document.getElementById("Character2").style.border          = "solid white 2px";
        document.getElementById("Character2").style.color           = "white";

        document.getElementById("Character3").style.backgroundColor = "rgba(0,205,0,0.5)";
        document.getElementById("Character3").style.border          = "none";
        document.getElementById("Character3").style.color           = "grey";

        document.getElementById("Character4").style.backgroundColor = "rgba(255,215,0,0.5)";
        document.getElementById("Character4").style.border          = "none";
        document.getElementById("Character4").style.color           = "grey";
    }

    if (_whichOne === 2) // sniper
    {
        document.getElementById("Character1").style.backgroundColor = "rgba(28,134,238,0.5)";
        document.getElementById("Character1").style.border          = "none";
        document.getElementById("Character1").style.color           = "grey";

        document.getElementById("Character2").style.backgroundColor = "rgba(255,0,0,0.5)";
        document.getElementById("Character2").style.border          = "none";
        document.getElementById("Character2").style.color           = "grey";

        document.getElementById("Character3").style.backgroundColor = "rgba(0,205,0,1)";
        document.getElementById("Character3").style.border          = "solid white 2px";
        document.getElementById("Character3").style.color           = "white";

        document.getElementById("Character4").style.backgroundColor = "rgba(255,215,0,0.5)";
        document.getElementById("Character4").style.border          = "none";
        document.getElementById("Character4").style.color           = "grey";
    }

    if (_whichOne === 3) // plasma rocket
    {
        document.getElementById("Character1").style.backgroundColor = "rgba(28,134,238,0.5)";
        document.getElementById("Character1").style.border          = "none";
        document.getElementById("Character1").style.color           = "grey";

        document.getElementById("Character2").style.backgroundColor = "rgba(255,0,0,0.5)";
        document.getElementById("Character2").style.border          = "none";
        document.getElementById("Character2").style.color           = "grey";

        document.getElementById("Character3").style.backgroundColor = "rgba(0,205,0,0.5)";
        document.getElementById("Character3").style.border          = "none";
        document.getElementById("Character3").style.color           = "grey";

        document.getElementById("Character4").style.backgroundColor = "rgba(255,215,0,1)";
        document.getElementById("Character4").style.border          = "solid white 2px";
        document.getElementById("Character4").style.color           = "white";
    }
}