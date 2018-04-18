// Game is a self-invoking function
(function () {

    // VARIABLES

    var _gameBoard = null
    var _scoreContainer = null
    var _lifesContainer = null
    var _timeContainer = null


    var _initialPlayerHeight = 12
    var _initialPlayerPositon = 50 - _initialPlayerHeight/2
    var _playerMoveStep = 2
    var __player = null


    function gameInit(container) {
        gameBoard(container)
        createPlayer()
        attachEventListeners()

    }


    //
    function gameBoard(container) {
        _gameBoard = document.createElement('div')
        _gameBoard.style.position = 'relative'
        _gameBoard.style.backgroundColor = 'red'
        _gameBoard.style.width = '50vw'
        _gameBoard.style.height = '50vw'
        _gameBoard.style.margin = '0 auto'

        container.appendChild(_gameBoard)
    }

    function createPlayer(){
        __player = document.createElement('div')
        __player.setAttribute('id', 'player')
        __player.style.position = 'absolute'
        __player.style.left = _initialPlayerPositon + '%'
        __player.style.top = (100 - _initialPlayerHeight) + '%'
        __player.style.backgroundColor = 'blue'
        __player.style.width = _initialPlayerHeight + '%'
        __player.style.height = _initialPlayerHeight + '%'
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
         var newPlayerPosition = parseInt(__player.style.left.slice(0, -1)) + deltaX * _playerMoveStep
        if((newPlayerPosition >= 0) && (newPlayerPosition <= 100 -_initialPlayerHeight)){
            __player.style.left = newPlayerPosition + '%'
        }
    }
    //

    gameInit(document.body)
})()






