window.onload = function () {
    var tarn = 0; //0 = game開始前 白= -1 黒 = 1
    var tarnCount = 0;
    var othelloField = new Array(10); // 石なし = 0 白 = -1 黒 = 1
    var directionArray = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    var i = 0;
    while (i < 10) {
        othelloField[i] = new Array(10);
        i++;
    }
    var bord = document.getElementById('othelloBord');
    var htmltarn = document.getElementById('tarn');
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
            case 0:
                break;
            case 1:
                htmltarn.innerHTML = '<p>黒のターン</p>';
                console.log("黒のターン");
                if (othelloField[clickRow.rowIndex][clickCell.cellIndex] === 0) {
                    console.log("test");
                    canPut(clickRow.rowIndex, clickCell.cellIndex, 1);
                }
                break;
            case -1:
                htmltarn.innerHTML = '<p>白のターン</p>';
                console.log("白のターン");
                if (othelloField[clickRow.rowIndex][clickCell.cellIndex] === 0) {
                    console.log("test");
                    canPut(clickRow.rowIndex, clickCell.cellIndex, -1);
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
        othelloField[5][4] = 1;
        othelloField[4][5] = 1;
        othelloField[4][4] = -1;
        othelloField[5][5] = -1;
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
                    case 1:
                        piece = '<div class="black"></div>';
                        break;
                    case -1:
                        piece = '<div class="white"></div>';
                        break;
                    case 3:
                        piece = '<div class="cant"></div>';
                }
                bord.rows[x].cells[y].innerHTML = piece;
            }
        }
    }
    function canPut(x, y, color) {
        for (var i_2 = 0; i_2 < 8; i_2++) {
            if (othelloField[x + directionArray[i_2][0]][y + directionArray[i_2][1]] * -1 === color) {
                console.log("canPut のforの中");
                reverse([x + directionArray[i_2][0]], [y + directionArray[i_2][1]], i_2, color); //発見座標と方向、自身の色を渡す
                console.log("canPutおわり");
            }
        }
    }
    function reverse(x, y, direction, color) {
        var numx = Number(x);
        var numy = Number(y);
        var reverseArray = [[numx, numy]];
        var reverseCount = 0;
        var stopFlag = false;
        console.log("direction");
        console.log(direction);
        for (var i_3 = 1; i_3 < 9; i_3++) {
            var spotTmp = othelloField[numx + (directionArray[direction][0] * i_3)][numy + (directionArray[direction][1] * i_3)];
            console.log("spotTmp");
            console.log(spotTmp);
            console.log("x");
            console.log(numx + (directionArray[direction][0] * i_3));
            console.log("y");
            console.log(numy + (directionArray[direction][1] * i_3));
            console.log("color");
            console.log(color);
            console.log("i");
            console.log(i_3);
            if (spotTmp === color * -1) {
                reverseArray.push([numx + (directionArray[direction][0] * i_3)], [numy + (directionArray[direction][1] * i_3)]);
                reverseCount++;
            }
            else if (spotTmp === color) {
                if (reverseCount === 0) {
                    console.log("reverseArray[0][1]");
                    console.log(reverseArray[0][1]);
                    console.log("色変え位置");
                    console.log(othelloField[reverseArray[0][0]][reverseArray[0][1]]);
                    othelloField[numx - (directionArray[direction][0])][numy - (directionArray[direction][1])] = color;
                    othelloField[reverseArray[0][0]][reverseArray[0][1]] = color;
                    console.log(othelloField);
                    stopFlag = true;
                }
                else {
                    for (var i_4 = 0; i_4 < reverseCount; i_4++) {
                        var tmp = reverseArray[i_4];
                        othelloField[tmp[0]][tmp[1]] = color;
                    }
                    stopFlag = true;
                    reverseArray = [];
                    reverseCount = 0;
                }
            }
            else if (spotTmp === 0 || spotTmp === 3) {
                stopFlag = true;
                reverseArray = [];
                reverseCount = 0;
            }
            if (stopFlag === true) {
                break;
            }
        }
        console.log("bordStats rev");
        console.log("koko");
        tarn = tarn * -1;
        bordStats();
    }
};
