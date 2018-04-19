// Game is a self-invoking function
(function () {

        // VARIABLES

        var _gameContainer = document.querySelector('body')

        var _gameBoard = null
        var _background = null
        var _floor = null

        // Create obstacle
        var _obstacle = null
        var _arrayOfObstacles = []

        // Create player
        var _initialPlayerHeight = 12
        var _initialPlayerPositon = 50 - _initialPlayerHeight / 2
        var _playerMoveStep = 2
        var _player = null

        var _gameIntervals = [
            {name: checkCollision, time: 100},
            {name: placeObstacle, time: 3000},
            {name: leveUp, time: 10000}
        ]

        function leveUp() {
            _gameIntervals[1].time = Math.ceil(_gameIntervals[1].time * 0.8)
            _playerMoveStep += 1
            clearAllIntervals()
            gameTicker()
        }

        // FUNCTIONS

        // game initial
        function gameInit(container) {
            gameBoard(container)
            createPlayer()
            attachEventListeners()
            gameTicker()

        }

        function gameBoard() {
            var board = document.createElement('div')
            board.style.position = 'relative'
            board.style.overflow = 'hidden'
            board.style.width = '50vw'
            board.style.height = '50vw'
            board.style.margin = '0 auto'
            board.style.perspective = '0.65vw'

            _gameContainer.appendChild(board)

            _gameBoard = board

            drawFloor()
            drawBackground()
        }

        function drawFloor() {
            _floor = document.createElement('div')
            _floor.style.position = 'absolute'
            _floor.style.top = '50%'
            _floor.style.width = '100%'
            _floor.style.height = '50%'
            _floor.style.backgroundSize = '25%'
            _floor.style.backgroundImage = "url('js/food/floor.png')"
            _floor.style.backgroundRepeat = 'repeat'
            _floor.style.backgroundPosition = '0%'
            _floor.style.zIndex = '1'
            _floor.style.transformStyle = 'preserve-3d'
            _floor.style.transform = 'rotateX(15deg)'
            _floor.animate([
                { backgroundPositionY: '0%' },
                { backgroundPositionY: '100%'}
            ], {
                duration: 8000,
                easing: 'linear',
                iterations: Infinity
            })

            moveFloor()

            _gameBoard.appendChild(_floor)
        }

        function moveFloor() {
            _floor.style.backgroundPosition = '100%'
        }

        function drawBackground() {
            _background = document.createElement('div')
            _background.style.position = 'absolute'
            _background.style.backgroundImage = "url('js/food/background.gif')"
            _background.style.backgroundSize = 'cover'
            _background.style.width = '100%'
            _background.style.height = '100%'
            _background.style.zIndex = '10'

            _gameBoard.appendChild(_background)
        }

        function makeObstacle() {

            var obstacle = document.createElement('div')
            obstacle.classList.add('obstacle')
            obstacle.style.position = 'absolute'
            obstacle.style.width = '7%'
            obstacle.style.height = '7%'
            obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random() * 3) + ".png')"
            obstacle.style.backgroundSize = 'cover'
            obstacle.style.transition = "all 3s ease-in"
            obstacle.style.top = '0'
            obstacle.style.zIndex = '100'


            _gameBoard.appendChild(obstacle)
            _obstacle = obstacle
        }

        function choseRandomWay() {
            return Math.round(Math.random() * 3 - 0.5)
        }

        function moveObstacle(top, left) {
            _obstacle.style.top = top + '%'
            _obstacle.style.left = left + '%'
        }

        function placeObstacle() {
            var randomWay = choseRandomWay()
            makeObstacle()
            _obstacle.style.top = '40%'
            _obstacle.style.left = '46.5%'
            if (randomWay === 0) {
                setTimeout(function () {
                    moveObstacle(105, -25)
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                }, 100)
            }
            else if (randomWay === 1) {
                setTimeout(function () {
                    moveObstacle(105, 35)
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                }, 100)
            }
            else {
                setTimeout(function () {
                    moveObstacle(105, 95)
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                }, 100)
            }
        }

        function gameTicker() {
            for (var i = 0; i < _gameIntervals.length; i++) {
                setInterval(_gameIntervals[i].name, _gameIntervals[i].time)
            }
        }

        function createPlayer() {
            _player = document.createElement('div')
            _player.style.position = 'absolute'
            _player.style.left = _initialPlayerPositon + '%'
            _player.style.top = (100 - _initialPlayerHeight) + '%'
            _player.style.transition = "0.1s linear"
            _player.style.backgroundColor = 'blue'
            _player.style.width = _initialPlayerHeight + '%'
            _player.style.height = _initialPlayerHeight + '%'
            _player.style.zIndex = '200'

            _gameBoard.appendChild(_player)
        }

        function attachEventListeners() {
            document.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case 'ArrowLeft':
                        move(-1)
                        break
                    case 'ArrowRight':
                        move(1)
                        break
                    default:
                        return
                }
                event.preventDefault()
            })
        }

        function move(deltaX) {
            var newPlayerPosition = parseInt(_player.style.left.slice(0, -1)) + deltaX * _playerMoveStep
            if ((newPlayerPosition >= 0) && (newPlayerPosition <= 100 - _initialPlayerHeight)) {
                _player.style.left = newPlayerPosition + '%'
            }
        }

        function checkCollision() {
            var obstacles = document.getElementsByClassName('obstacle')

            _arrayOfObstacles = [].slice.call(obstacles)

            _arrayOfObstacles.forEach(function (el, i) {
                if (el.offsetTop + el.offsetWidth >= _player.offsetTop) {
                    if (
                        _player.offsetTop < el.offsetTop + el.offsetHeight * 0.9
                        &&
                        _player.offsetLeft < el.offsetLeft + el.offsetWidth
                        &&
                        el.offsetLeft < _player.offsetLeft + _player.offsetWidth
                        &&
                        el.offsetTop <= _player.offsetTop + _player.offsetWidth * 0.8
                    ) {
                        console.log("YOU LOOSE THE GAME. An ATOMIC BOMB will be sent at your current location OR you can start again. You have 10 seconds since you started reading this message to make your decision...")
                        endGame()
                    }
                }
            })
            removeObstacle()
        }

        function removeObstacle() {
            console.log('Remove obstacle')
            _arrayOfObstacles.forEach(function (el) {
                if (el.offsetTop > _player.offsetTop + _player.offsetWidth) {
                    el.parentNode.removeChild(el)
                }
            })
        }

        function clearAllIntervals() {
            var highestInterval = setInterval(function(){})
            for (var i = 0; i < highestInterval; i++) {
                clearInterval(i)
            }
        }

        function endGame() {
            clearAllIntervals()
            if (confirm("YOU LOSE! Do you want to play again?")) {
                window.location = ''
            } else {
                clearAllIntervals()
            }
        }

        gameInit(document.body)

    }

)()
