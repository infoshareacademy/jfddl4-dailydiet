// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameContainer = null
    var _scoreContainer = null
    var _lifesContainer = null
    var _timeContainer = null

    var _initialPlayerPositon = {
        x: 1
    }

    var _playerPosition = _initialPlayerPosition

    var _foodPosition

    var _customerPosition

    var _timeStep

    // FUNCTIONS

    // game initial

    function gameInit(container) {
        makeGameBoard(container)
        gameInstruction(container)
        placePlayer()
        placeNewFood()
        render()
        attachEventListeners()
    }

    function makeGameBoard(container) {
        _gameContainer = document.createElement('div')
        _scoreContainer = document.createElement('div')
        _timeContainer = document.createElement('div')

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
    animacje


























})