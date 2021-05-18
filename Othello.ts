window.onload = function () { 
  let tarn:number = 0; //0 = game開始前 -1 = 黒 1 = 白
  let othelloField:number[][] = new Array(8); // 石なし = 0 白 = 1 黒 = 2
  let i: number = 0;
  while(i < 8){
    othelloField[i] = new Array(8);
    i++;
  }

  let bord = <HTMLTableElement>document.getElementById('othelloBord')!;

  bordCreate();
  bordReset();
  bordStats();

  for(let x:number=0;x<8;x++){
    for(let y:number=0;y<8;y++){
      let clickEvent:HTMLElement = bord.rows[x].cells[y];
      clickEvent.onclick = function(){
        console.log(clickEvent.innerText); 
        if(clickEvent.innerText === ""){ //divで要素を管理しているため全てからの判定　修正の必要
          clickEvent.innerHTML = '<div class="Black"></div>';
        }
      }
    }
  }

  function bordCreate(){
    for(let j:number=0;j < 8;j++){
      let tr : HTMLElement = document.createElement("tr");
      bord.appendChild(tr);
      for(let k:number=0;k < 8;k++){
        let td : HTMLElement = document.createElement("td");
        tr.appendChild(td);
      }
    }
  }

  function bordReset(){
    for(let x:number=0;x<8;x++){
      for(let y:number=0;y<8;y++){
        othelloField[x][y] = 0
      }
    }
    othelloField[3][3] = 1;
    othelloField[4][4] = 1;
    othelloField[4][3] = 2;
    othelloField[3][4] = 2;
    tarn = 1;
  }

  function bordStats(){
    for(let x:number=0;x<8;x++){
      for(let y:number=0;y<8;y++){
        let piece:string = "";
        switch(othelloField[x][y]){
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
}