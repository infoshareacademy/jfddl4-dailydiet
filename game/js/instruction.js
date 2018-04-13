//
// var gameInstruction = document.createElement('div')
//
//
// gameInstruction.style.width = "300px"
// gameInstruction.style.height = "300px"
// gameInstruction.style.backgroundColor = "red"
//
//
// document.querySelector('body').innerHTML = gameInstruction
//
//
//
// (function () {
//     var buttonElement = document.querySelector('button')
//
//     buttonElement.addEventListener(
//         'click',
//         function (event) {
//             console.log(event)
//         }
//     )
//
// })()

var fallingBox = document.querySelector(".falling-box")


function showX(){



    var positionOfFallingBoxY = fallingBox.offsetTop
    console.log('pozycja ' + positionOfFallingBoxY)
}


setInterval(showX, 1000);

//
// element.offsetTop
// element.offsetLeft
// element.offsetHeight
// element.offsetWidth