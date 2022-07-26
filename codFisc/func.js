
function calcolo() {
        var cF = document.getElementById("cF");
        var cognom = document.getElementById('sur');
        const surname = cognom.value;
        var nom = document.getElementById('nam');
        const name = nom.value;
        var s = document.getElementById('gen');
        const gender = s.value;
        var lN = document.getElementById('bP');
        const bornPlace = lN.value;
        var sP = document.getElementById('sP');
        const sigProv = sP.value;
        var dN = document.getElementById('dB');
        const dateBorn = dN.value;
        var Ex = document.getElementById('Exception');

    if (surname == "" || name == "" || bornPlace == "" || sigProv == "" || dateBorn == "") {
        Ex.style.color = "red";
        Ex.textContent = "";
        Ex.textContent = "*Per calcolare il codice fiscale abbiamo bisogno che lei inserisca tutti i campi.";
        Ex.style.visibility = "visible";
    } else {
        const placeOfBorn = COMUNI.filter((c) => {
            return c[1] === sigProv.toUpperCase() && c[2] === bornPlace.toUpperCase();
        }).map((comune) => {
            return {codice: comune[0], provincia: comune[1], comune: comune[2]};
        });

        if (placeOfBorn.length === 1) {
            console.log(placeOfBorn);

            let cf = new ItalianTaxCalculator(surname, name, gender, dateBorn, placeOfBorn[0]);

            const calc = cf.compute();
            cF.value = calc;
        }

        // errore
    }
}
