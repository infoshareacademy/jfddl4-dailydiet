// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameBoard = null
    var _scoreContainer = null
    var _lifesContainer = null
    var _timeContainer = null

    // Set default player position
    // var _initialPlayerPositon = 1
    //
    // // Create player with default position X
    // var __player = null //= {
    //     positionX: _initialPlayerPositon
    // }
    //
    // var gameIntervals = [[checkCollision(), 500], [placeObstacle(), 3000]]

    // FUNCTIONS

    // game initial

    function gameInit(container) {
        gameBoard(container)
        // gameInstruction()
        // placeObstacle()
        placePlayer()
        // render()
        // attachEventListeners()

        // _timeInterval = function(element, index, array) {
        //     for (var i =0; i < array.length; i++) {
        //         setInterval(element[index][0], element[index][1])
        //     }
        // }
    }


    //
    function gameBoard(container) {
        _gameBoard = document.createElement('div')
    //     _scoreContainer = document.createElement('div')
    //     _lifesContainer = document.createElement('div')
    //     _timeContainer = document.createElement('div')
    //     container.appendChild(_scoreContainer)
    //     container.appendChild(_timeContainer)
    //     container.appendChild(_lifesContainer)
        _gameBoard.style.position = 'relative'
        _gameBoard.style.backgroundColor = 'red'
        _gameBoard.style.width = '98vh'
        _gameBoard.style.height = '98vh'
        _gameBoard.style.margin = '0 auto'

        container.appendChild(_gameBoard)
    //
    //     render()
    //
    //     drawTime()
    //     drawScore()
    //     drawLifes()
    //     //drawBackground()
    }

    function placePlayer(){
        __player = document.createElement('div')
        __player.style.position = 'absolute'
        __player.style.left = '45%'
        __player.style.top = '85%'

        __player.style.backgroundColor = 'blue'
        __player.style.width = '10%'
        __player.style.height = '10%'
       _gameBoard.appendChild(__player)
    }




//////////////////////PLAYER POSITION////////////////////////
    function attachEventListeners() {
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    move(-1)
                    break
                case 'ArrowRight':
                    move(1)
                    break

                default: return
            }
            event.preventDefault()
        })
    }

    function move(deltaX) {
        var newPlayerPosition = {
            x: _playerPosition.x + deltaX,
        }
        if ((newPlayerPosition > -1) && (newPlayerPosition < 3)){
         return _playerPosition = newPlayerPosition
        }
        render()
    }
    //



/*    plansza - wymiary
    stałe elementy planszy:
        tory
        regały

    ruchome elementy planszy
        ruch gracza
        ruch jedzenia
        staruszka
        dzieciak
    gracz - co ma gracz?
        pozycja startowa
        pozycja zmienna
        funkcje ruchu - lewo, prawo
    punkty - dodatnie, ujemne, limit ujemnych (ew. limit dodatnich i wywołanie przyśpieszenia)
    czas
    wydarzenia - np zebranie przedmiotu
    animacje*/


    gameInit(document.body)
})()






