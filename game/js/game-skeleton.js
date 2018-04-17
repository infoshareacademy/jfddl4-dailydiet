// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameBoard = null
    var _scoreContainer = null
    var _lifesContainer = null
    var _timeContainer = null

    // Set default player position
    var _initialPlayerPositon = 1

    // Create player with default position X
    var _player = {
        positionX: _initialPlayerPositon
    }

    var gameIntervals = [[checkCollision(), 500], [placeObstacle(), 3000]]

    // FUNCTIONS

    // game initial

    function gameInit(container) {
        gameInstruction()
        placePlayer()
        placeObstacle()
        gameBoard()
        render()
        attachEventListeners()

        _timeInterval = function(element, index, array) {
            for (var i =0; i < array.length; i++) {
                setInterval(element[index][0], element[index][1])
            }
        }
    }

    function gameBoard(container) {
        _gameBoard = document.createElement('div')
        _scoreContainer = document.createElement('div')
        _lifesContainer = document.createElement('div')
        _timeContainer = document.createElement('div')
        container.appendChild(_scoreContainer)
        container.appendChild(_timeContainer)
        container.appendChild(_lifesContainer)
        container.appendChild(_gameBoard)

        render()

        drawTime()
        drawScore()
        drawLifes()
        //drawBackground()
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
                // exit this handler for other keys
                default: return
            }
            // prevent the default action (scroll / move caret)
            event.preventDefault()   // what does it actually prevent from? from moving the other direction? hitting a wall?
        })
    }

    function move(deltaX) {
        var newPlayerPosition = {
            x: _playerPosition.x + deltaX,
        }

        render()  // do I understand it right that this function refresh the position of the player based on his last move?
    }
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

})()

























})