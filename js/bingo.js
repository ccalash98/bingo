$(function () {
    var bingo = {
        selectedNumbers: new Set(),
        generateRandom: function () {
            var min = 1;
            var max = 90;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        generateNextRandom: function () {
            if (bingo.selectedNumbers.size >= 90) {
                alert("Todos los números han sido generados");
                return 0;
            }
            var random;
            do {
                random = bingo.generateRandom();
            } while (bingo.selectedNumbers.has(random));
            bingo.selectedNumbers.add(random);
            return random;
        }
    };

    var cells = $('td');

    $('#btnGenerate').click(function () {
        if (bingo.selectedNumbers.size >= 90) {
            alert("Se han llenado todas las celdas.");
            return;
        }

        var random = bingo.generateNextRandom();
        
        // Mostrar el número en la celda correspondiente a su valor
        $(cells[random - 1]).text(random);
        $(cells[random - 1]).addClass('selected');

        // Actualizar el número en el elemento displayNumber
        $('#displayNumber').text(random);
    });

    $('#btnRefresh').click(function () {
        $('#displayNumber').text("0");
        bingo.selectedNumbers.clear();
        cells.text("");
        cells.removeClass('selected');
    });
});
