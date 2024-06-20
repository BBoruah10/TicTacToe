const gameboard = document.getElementById("gameboard")
const infod = document.querySelector("#info");
infod.textContent="Cicle goes first";
const startCells=["","","","","","","","",""];
let go="circle";

function createBoard(){
    startCells.forEach((_cell,index) => {
        const cellEle=document.createElement("div");
        cellEle.classList.add("square");
       // cellEle.innerHTML=index;
      // const circleElement=document.createElement("div");
      // circleElement.classList.add("circle");
      // const circleElement1=document.createElement("div");
      // circleElement1.classList.add("cross");
      // cellEle.append(circleElement);
      // cellEle.append(circleElement1);
       cellEle.id=index;
       cellEle.addEventListener("click",addGo);
        gameboard.append(cellEle);
    })

}
createBoard();

function addGo(e){
   // console.log("clicked",e.target)
    const goDisplay=document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";//go  changes from circle to go
    //console.log(go)
    infod.textContent = "it is now" + go +"'s go";
    e.target.removeEventListener("click",addGo);//upre upre nahe jate
    checkScore();
}
function checkScore(){
    const allSquares=document.querySelectorAll(".square");
    //console.log(allSquares);
    const winningCombos=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    winningCombos.forEach(array =>{
        const circleWins=array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"));
        if(circleWins)
            {
                infod.textContent="circle Wins";
                //to stop the game after one wins--->remoave all event Losteners
                allSquares.forEach(square=>square.replaceWith(square.cloneNode(true)))
            }
    })//we are checcking that first child tu sob circle hoi ne nai
    winningCombos.forEach(array =>{
        const crossWins=array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"));
        if(crossWins)
            {
                infod.textContent="Cross Wins";

                allSquares.forEach(square=>square.replaceWith(square.cloneNode(true)))
            }
    })//we are checcking that first child tu sob star hoi ne nai for eg 0->star ,1->star,2->star

}