$(function () {
    var bingo = {
        selectedNumbers: [],
        usedCells: [], // Arreglo para rastrear las celdas usadas
        generateRandom: function () {
            var min = 1;
            var max = 75; // Usamos números del 1 al 75
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        generateNextRandom: function () {
            if (bingo.selectedNumbers.length >= 24) {
                alert("Todos los números han sido generados");
                return 0;
            }
            var random = bingo.generateRandom();
            while ($.inArray(random, bingo.selectedNumbers) > -1) {
                random = bingo.generateRandom();
            }
            bingo.selectedNumbers.push(random);
            return random;
        },
        getRandomCellIndex: function () {
            var randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 24); // Seleccionar índice aleatorio entre 0 y 23
            } while ($.inArray(randomIndex, bingo.usedCells) > -1); // Asegurar que no se ha usado la celda
            bingo.usedCells.push(randomIndex); // Marcar celda como usada
            return randomIndex;
        }
    };

    // Seleccionamos las 24 celdas, excluyendo la celda del medio
    var cells = $('td').not('#middle');

    $('#btnGenerate').click(function () {
        if (bingo.usedCells.length >= 24) {
            alert("Se han llenado todas las celdas.");
            return;
        }

        var random = bingo.generateNextRandom().toString();
        var randomIndex = bingo.getRandomCellIndex(); // Obtener índice aleatorio para la celda

        // Asignar el número generado a la celda aleatoria
        $(cells[randomIndex]).text(random);
        $(cells[randomIndex]).addClass('selected');

        // Actualizar el número mostrado en el span dentro de bigNumberDisplay
        $('#displayNumber').text(random);
    });
});
