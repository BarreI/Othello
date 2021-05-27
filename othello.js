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
                console.log("はじまってないよ");
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
    //この時点でなんこの石が操作可能の可能性があるかどうかを判断して情報をおくり
    //置けた場合はおける一全てを確かめてからターンをうつす、おけないばあいはターンをうつさない
    function canPut(x, y, color) {
        var canPutCount = 0;
        var canPutArray = [];
        for (var i_2 = 0; i_2 < 8; i_2++) {
            if (othelloField[x + directionArray[i_2][0]][y + directionArray[i_2][1]] * -1 === color) {
                canPutCount++;
                canPutArray.push([i_2, x + directionArray[i_2][0], y + directionArray[i_2][1]]); //おける方向と座標
            }
        }
        console.log("canPut のforの中");
        reverse(canPutCount, canPutArray, color); //発見座標と方向、自身の色を渡す
        console.log("canPutおわり");
    }
    function reverse(count, direction, color) {
        for (var i_3 = 0; i_3 < count; i_3++) {
            var reverseArray = [[]];
            var reverseCount = 0;
            var stopFlag = false;
            var directionNum = direction[i_3][0];
            var directionSpotx = direction[i_3][1];
            var directionSpoty = direction[i_3][2];
            for (var i_4 = 1; i_4 < 9; i_4++) {
                console.log("y");
                console.log(directionSpoty + (directionArray[directionNum][1] * i_4));
                console.log("x");
                console.log(directionSpotx + (directionArray[directionNum][0] * i_4));
                var spotTmp = othelloField[directionSpotx + (directionArray[directionNum][0] * i_4)][directionSpoty + (directionArray[directionNum][1] * i_4)];
                console.log("test");
                console.log(spotTmp);
                console.log("iro");
                console.log(color);
                if (spotTmp == color * -1) {
                    reverseArray.push([directionSpotx + (directionArray[directionNum][0] * i_4)], [directionSpoty + (directionArray[directionNum][1] * i_4)]);
                    reverseCount++;
                }
                else if (spotTmp == color) {
                    if (reverseCount === 0) {
                        console.log("きてます");
                        console.log("座標1");
                        console.log(othelloField[directionSpotx - (directionArray[directionNum][0] * i_4)][directionSpoty - (directionArray[directionNum][1] * i_4)]);
                        othelloField[directionSpotx - (directionArray[directionNum][0] * i_4)][directionSpoty - (directionArray[directionNum][1] * i_4)] = color;
                        othelloField[directionSpotx][directionSpoty] = color;
                        console.log(othelloField);
                        stopFlag = true;
                    }
                    else {
                        for (var i_5 = 0; i_5 < reverseCount; i_5++) {
                            var tmp = reverseArray[i_5];
                            othelloField[tmp[0]][tmp[1]] = color;
                            stopFlag = true;
                            reverseArray = [];
                            reverseCount = 0;
                        }
                    }
                }
                else if (spotTmp == 3 || spotTmp == 0) {
                    stopFlag = true;
                    reverseArray = [];
                    reverseCount = 0;
                }
                if (stopFlag === true) {
                    break;
                }
            }
        }
        bordStats();
        tarn = tarn * -1;
    }
};
// let numx:number = Number(x);
// let numy:number = Number(y);
// let reverseArray :number[][] = [[numx,numy]];
// let reverseCount :number = 0;
// let stopFlag : boolean = false;
// console.log("direction")
// console.log(direction);
//     for(let i=1;i<9;i++){
//       let spotTmp:number = othelloField[numx+(directionArray[direction][0] * i)][numy+(directionArray[direction][1] * i)]; 
//       console.log("spotTmp");
//       console.log(spotTmp);
//       console.log("x");
//       console.log(numx+(directionArray[direction][0] * i));
//       console.log("y");
//       console.log(numy+(directionArray[direction][1] * i));
//       console.log("color");
//       console.log(color);
//       console.log("i");
//       console.log(i);
//       if(spotTmp === color * -1){
//         reverseArray.push([numx+(directionArray[direction][0] * i)],[numy+(directionArray[direction][1] * i)])
//         reverseCount++;
//       }else if(spotTmp === color){
//         if(reverseCount === 0){
//           console.log("reverseArray[0][1]");
//           console.log(reverseArray[0][1]);
//           console.log("色変え位置");
//           console.log(othelloField[reverseArray[0][0]][reverseArray[0][1]]);
//           othelloField[numx-(directionArray[direction][0])][numy-(directionArray[direction][1])] = color;
//           othelloField[reverseArray[0][0]][reverseArray[0][1]] = color;
//           console.log(othelloField);
//           stopFlag = true;
//         }else{
//           for(let i=0;i<reverseCount;i++){
//             let tmp:number[] = reverseArray[i]
//             othelloField[tmp[0]][tmp[1]] = color;
//           }
//           stopFlag = true;
//           reverseArray = [];
//           reverseCount = 0;
//         }
//       }else if(spotTmp === 0 || spotTmp === 3){
//         stopFlag = true;
//         reverseArray = [];
//         reverseCount = 0;
//       }
//       if(stopFlag === true){
//         break;
//       }
//     }
//     console.log("bordStats rev")
//     console.log("koko");
//     bordStats();
// }
