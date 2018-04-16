// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameBoard = null
    var _scoreContainer = null
    var _lifesContainer = null
    var _timeContainer = null

    // Set interval
    var _timeStep = 100

    // Set default player position
    var _initialPlayerPositon = 1

    // Create player with default position X
    var _player = {
        positionX: _initialPlayerPositon
    }

    // FUNCTIONS

    // game initial

    function gameInit(container) {
        makeGameBoard()
        gameInstruction()
        placePlayer()
        placeObstacle()
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


    function placeObstacle() {
        makeObstacle(_obstacle)
        radnomWay(_obstaclePosition)
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