window.onload = function () {
    var tarn = 0; //0 = game開始前 -1 = 黒 1 = 白
    var tarnCount = 0;
    var othelloField = new Array(10); // 石なし = 0 白 = -1 黒 = 1
    var i = 0;
    while (i < 10) {
        othelloField[i] = new Array(10);
        i++;
    }
    var bord = document.getElementById('othelloBord');
    bordCreate();
    bordReset();
    bordStats();
    //描画の必要性がない部分の削除
    for (var i_1 = 0; i_1 < 36; i_1++) {
        var cant = document.getElementsByClassName('cant')[i_1].parentNode;
        cant.classList.add('dontSeen');
    }
    bord.addEventListener("click", function (e) {
        var clickCell = e.target;
        var clickRow = clickCell.parentNode;
        console.log("クリック");
        console.log(clickRow.rowIndex, clickCell.cellIndex); // erroe が発生しているがセルは取れる
        switch (tarn) {
            case -1:
                break;
            case 1:
                console.log("黒のターン");
                if (othelloField[clickRow.rowIndex][clickCell.cellIndex] === 0) {
                    console.log("test");
                    tarn = 2;
                }
                break;
            case 2:
                console.log("白のターン");
                if (othelloField[clickRow.rowIndex][clickCell.cellIndex] === 0) {
                    console.log("test");
                    tarn = 1;
                }
                break;
        }
    });
    function bordCreate() {
        for (var j = 0; j < 10; j++) {
            var tr = document.createElement("tr");
            bord.appendChild(tr);
            for (var k = 0; k < 10; k++) {
                var td = document.createElement("td");
                tr.appendChild(td);
            }
        }
    }
    function bordReset() {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                othelloField[x][y] = 0;
            }
        }
        othelloField[5][4] = -1;
        othelloField[4][5] = -1;
        othelloField[4][4] = 1;
        othelloField[5][5] = 1;
        for (var r = 0; r < 10; r++) {
            othelloField[0][r] = 3;
            othelloField[r][0] = 3;
            othelloField[r][9] = 3;
            othelloField[9][r] = 3;
            console.log("banana");
        }
        tarn = 1;
        tarnCount = 0;
    }
    function bordStats() {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                var piece = "";
                switch (othelloField[x][y]) {
                    case 0:
                        piece = "";
                        break;
                    case -1:
                        piece = '<div class="black"></div>';
                        break;
                    case 1:
                        piece = '<div class="white"></div>';
                        break;
                    case 3:
                        piece = '<div class="cant"></div>';
                }
                bord.rows[x].cells[y].innerHTML = piece;
            }
        }
    }
};
