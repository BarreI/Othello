window.onload = function () { 
  let tarn:number = 0; //0 = game開始前 -1 = 黒 1 = 白
  let tarnCount:number = 0;
  let othelloField:number[][] = new Array(10); // 石なし = 0 白 = -1 黒 = 1
  let directionArray: number[][] = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
  let i: number = 0;
  while(i < 10){
    othelloField[i] = new Array(10);
    i++;
  }

  let bord = <HTMLTableElement>document.getElementById('othelloBord')!;

  bordCreate();
  bordReset();
  bordStats();

  //描画の必要性がない部分の削除
  for(let i=0;i<36;i++){
    let cant : HTMLElement = <HTMLElement>document.getElementsByClassName('cant')[i].parentNode;
    cant.classList.add('dontSeen');
  }

  bord.addEventListener("click", (e) =>{
    let clickCell: HTMLElement = <HTMLElement>e.target;
    let clickRow: HTMLElement = <HTMLElement>clickCell.parentNode;
    console.log("クリック");
    console.log(clickRow.rowIndex,clickCell.cellIndex);// erroe が発生しているがセルは取れる
    switch(tarn){
      case -1:
        break;
      case 1:
        console.log("黒のターン");
        if(othelloField[clickRow.rowIndex][clickCell.cellIndex] === 0){
          console.log("test");
          canPut(clickRow.rowIndex,clickCell.cellIndex,1)
          tarn = 2;
        }
        break;
      case 2:
        console.log("白のターン");
        if(othelloField[clickRow.rowIndex][clickCell.cellIndex] === 0){
          console.log("test");
          tarn = 1;
        }
        break;
    }
  })

  function bordCreate(){ //外側にindexの範囲外を避けるために大きく作る
    for(let j:number=0;j < 10;j++){
      let tr : HTMLElement = document.createElement("tr");
      bord.appendChild(tr);
      for(let k:number=0;k < 10;k++){
        let td : HTMLElement = document.createElement("td");
        tr.appendChild(td);
      }
    }
  }

  function bordReset(){
    for(let x:number=0;x<10;x++){
      for(let y:number=0;y<10;y++){
        othelloField[x][y] = 0;
      }
    }
    othelloField[5][4] = -1;
    othelloField[4][5] = -1;
    othelloField[4][4] = 1;
    othelloField[5][5] = 1;
    for(let r=0;r<10;r++){
      othelloField[0][r] = 3;
      othelloField[r][0] = 3;
      othelloField[r][9] = 3;
      othelloField[9][r] = 3;
      console.log("banana");
    }
    tarn = 1;
    tarnCount = 0;
  }

  function bordStats(){
    for(let x:number=0;x<10;x++){
      for(let y:number=0;y<10;y++){
        let piece:string = "";
        switch(othelloField[x][y]){
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
            piece = '<div class="cant"></div>'
        }
        bord.rows[x].cells[y].innerHTML = piece;
      }
    }
  }
  //012
  //7@3
  //654
  function canPut(x:number,y:number,color:number){//color は操作している色
    for(let i =0;i<8;i++){
      if(othelloField[x+directionArray[i][0]][y+directionArray[i][1]] * -1 === color){
        reverse(othelloField[x+directionArray[i][0]],[y+directionArray[i][1]],i,color)
      }
    }
  }

  function reverse(x,y,direction,color){
    let reverseArray :number[][] = [];
    let reverseCount :number = 0;
    let stopFlag = false;
        for(let i=1;i<9;i++){
          let spotTmp:number = othelloField[x-(directionArray[direction][0] * i)][y-(directionArray[direction][1] * i)];
          if(spotTmp === color * -1){
            reverseArray.push([x-(directionArray[direction][0] * i)],[y-(directionArray[direction][1] * i)])
            reverseCount++;
          }else if(spotTmp === color){
            if(reverseCount === 0){
              stopFlag = true;
            }
            //ひっくり返すしょりお
          }
        }
  }
}