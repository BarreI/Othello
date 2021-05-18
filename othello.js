window.onload = function () {
    var tarn = 0; //0 = game開始前 -1 = 黒 1 = 白
    var othelloField = new Array(8); // 石なし = 0 白 = 1 黒 = 2
    var i = 0;
    while (i < 8) {
        othelloField[i] = new Array(8);
        i++;
    }
    var bord = document.getElementById('othelloBord');
    bordCreate();
    bordReset();
    bordStats();
    for (var x = 0; x < 8; x++) {
        var _loop_1 = function (y) {
            var clickEvent = bord.rows[x].cells[y];
            clickEvent.onclick = function () {
                console.log(clickEvent.innerText);
                if (clickEvent.innerText === "") {
                    clickEvent.innerHTML = '<div class="Black"></div>';
                }
            };
        };
        for (var y = 0; y < 8; y++) {
            _loop_1(y);
        }
    }
    function bordCreate() {
        for (var j = 0; j < 8; j++) {
            var tr = document.createElement("tr");
            bord.appendChild(tr);
            for (var k = 0; k < 8; k++) {
                var td = document.createElement("td");
                tr.appendChild(td);
            }
        }
    }
    function bordReset() {
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                othelloField[x][y] = 0;
            }
        }
        othelloField[3][3] = 1;
        othelloField[4][4] = 1;
        othelloField[4][3] = 2;
        othelloField[3][4] = 2;
        tarn = 1;
    }
    function bordStats() {
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                var piece = "";
                switch (othelloField[x][y]) {
                    case 0:
                        piece = "";
                        break;
                    case 1:
                        piece = '<div class="Black"></div>';
                        break;
                    case 2:
                        piece = '<div class="White"></div>';
                        break;
                }
                bord.rows[x].cells[y].innerHTML = piece;
            }
        }
    }
};
