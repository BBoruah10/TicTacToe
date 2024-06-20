const gameboard = document.getElementById("gameboard")
const infod = document.querySelector("#info");
infod.textContent="Circle 🟢 goes first";
const startCells=["","","","","","","","",""];
let go="circle";

function createBoard(){
    startCells.forEach((_cell,index) => {
        const cellEle=document.createElement("div");
        cellEle.classList.add("square");
       // cellEle.innerHTML=index;
      // const circleElement=document.createElement("div");//ALL for checking the display of cross/circle
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
    infod.textContent = "It is now " + go +"'s turn ➡️";
    e.target.removeEventListener("click",addGo);//Avoid OVERLAPPING of the cross or circle
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
        const circleWins=array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"));//we are checking that the every first child is circle
        if(circleWins)
            {
                infod.textContent="Circle 🟢 Wins";
                //to stop the game after one wins--->remoave all event Losteners
                allSquares.forEach(square=>square.replaceWith(square.cloneNode(true)))
                playAgain();
            }
    })
    winningCombos.forEach(array =>{
        const crossWins=array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"));
        if(crossWins)
            {
                infod.textContent="Cross ❌ Wins";

                allSquares.forEach(square=>square.replaceWith(square.cloneNode(true)))
                playAgain();
            }
    })//we are checcking that first child is  star for all: for eg 0->star ,1->star,2->star

}
//play Again button
function playAgain(){
    const play=document.createElement("button");
    play.setAttribute("class","playA");
    play.innerText="Play Again ▶️";
    infod.append(play);
    play.addEventListener("click",()=>{
        window.location.reload();//reloads
    })
    
}