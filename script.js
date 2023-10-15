console.log("Welcome to Tic Tac Toe");

let turn = "X"
const turnMusic = new Audio("assets/ting.mp3")
const winMusic = new Audio("assets/gameover.mp3")
let isGameOver = false
let isDraw = false

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

// Function to chech win
const checkWin = () => {
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    win.forEach((e) => {
        let boxTexts = document.getElementsByClassName("boxText")
        if (boxTexts[e[0]].innerText === boxTexts[e[1]].innerText &&
            boxTexts[e[1]].innerText === boxTexts[e[2]].innerText &&
            boxTexts[e[0]].innerText !== "") {
            document.querySelector(".info").innerText = boxTexts[e[0]].innerText + " has won"
            isGameOver = true
            document.getElementsByTagName("img")[0].style.width = "250px"
            winMusic.play()
            let boxes = document.getElementsByClassName("box")
            e.forEach((i) => {
                boxes[i].style.background = "#f2c14e25"
                boxes[i].classList.add("changeBG")
            })
        }
    })
}

// Function to chech draw
const checkDraw = () => {
    let boxTexts = document.getElementsByClassName("boxText")
    let isFull = true
    Array.from(boxTexts).forEach((element) => {
        if (element.innerText == "") {
            isFull = false
        }
    })
    if (isFull && !isGameOver) {
        isDraw = true
        document.querySelector(".info").innerText = "Match Draw ! ! !"
        document.getElementsByTagName("img")[1].style.width = "250px"
    }
}


// Game Logic
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".boxText")
    element.addEventListener('click', () => {
        if (boxText.innerText === "") {
            if (!isGameOver) {
                boxText.innerText = turn
                turn = changeTurn()
                turnMusic.play()
                checkWin()
                checkDraw()
                if (!isGameOver && !isDraw) {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
                }
            }
            else {
                boxText.innerText = ""
            }
        }
    })
})

// Add onclick listener to restart button
const restart = document.getElementById("restart")
restart.addEventListener('click', () => {
    let boxTexts = document.getElementsByClassName("boxText")
    Array.from(boxTexts).forEach((element) => {
        element.innerText = ""
    })
    turn = "X"
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn

    let img = document.getElementsByTagName("img")
    Array.from(img).forEach((element)=>{
            element.style.width = "0"
    })

    let changeBG = document.getElementsByClassName("changeBG")
    Array.from(changeBG).forEach((element) => {
        element.style.backgroundColor = "#2d414b"
        element.addEventListener('mouseover', () => {
            if (!isGameOver) {
                element.style.background = "#273841"
            }
        })
        element.addEventListener('mouseout', () => {
            if (!isGameOver) {
                element.style.background = "#2d414b"
            }
        })
    })
    Array.from(changeBG).forEach((element) => {
        element.classList.add("changeBG")
    })
    isGameOver = false
    isDraw = false
})
