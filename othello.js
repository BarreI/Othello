window.onload = function () {
    var tarn = 0; //0 = game開始前 -1 = 黒 1 = 白
    var tarnCount = 0;
    var othelloField = new Array(10); // 石なし = 0 白 = -1 黒 = 1
    var directionArray = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
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
                    canPut(clickRow.rowIndex, clickCell.cellIndex, 1);
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
    //012
    //7@3
    //654
    function canPut(x, y, color) {
        for (var i_2 = 0; i_2 < 8; i_2++) {
            if (othelloField[x + directionArray[i_2][0]][y + directionArray[i_2][1]] * -1 === color) {
                console.log("座標計算x");
                console.log(x + directionArray[i_2][0]);
                console.log("座標計算y");
                console.log(y + directionArray[i_2][1]);
                console.log("num");
                console.log(othelloField[x + directionArray[i_2][0]][y + directionArray[i_2][1]]);
                console.log("canPut");
                console.log("x");
                console.log(x + directionArray[i_2][0]);
                console.log("方向");
                console.log(i_2);
                reverse(othelloField[x + directionArray[i_2][0]], [y + directionArray[i_2][1]], i_2, color);
            }
        }
    }
    function reverse(x, y, direction, color) {
        var reverseArray = [];
        var reverseCount = 0;
        var stopFlag = false;
        for (var i_3 = 1; i_3 < 9; i_3++) {
            console.log("Y");
            console.log(y - (directionArray[direction][1] * i_3));
            console.log("X");
            console.log(x - (directionArray[direction][0] * i_3));
            console.log("X2");
            console.log(directionArray[direction][0]);
            console.log("i");
            console.log(i_3);
            var spotTmp = othelloField[x - (directionArray[direction][0] * i_3)][y - (directionArray[direction][1] * i_3)];
            console.log(spotTmp);
            if (spotTmp === color * -1) {
                reverseArray.push([x - (directionArray[direction][0] * i_3)], [y - (directionArray[direction][1] * i_3)]);
                reverseCount++;
            }
            else if (spotTmp === color) {
                if (reverseCount === 0) {
                    stopFlag = true;
                }
                else {
                    for (var i_4 = 0; i_4 < reverseCount; i_4++) {
                        var tmp = reverseArray[i_4];
                        othelloField[tmp[0], tmp[1]] = color;
                    }
                    stopFlag = true;
                    reverseArray = [];
                    reverseCount = 0;
                }
            }
            if (stopFlag === true) {
                break;
            }
        }
        bordStats();
    }
};
