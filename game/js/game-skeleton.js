// Game is a self-invoking function
(function () {

        // VARIABLES

        var _gameContainer = document.querySelector('body')

        var _lifes = 3
        var _score = 0

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
            {name: checkPosition, time: 100},
            {name: placeObstacle, time: 3000},
            {name: levelUp, time: 10000}
        ]

        function levelUp() {
            _gameIntervals[1].time = Math.ceil(_gameIntervals[1].time * 0.85)
            _playerMoveStep += 1
            clearAllIntervals()
            gameTicker()
        }

        // FUNCTIONS

        // game initial
        function gameInit() {
            setBodyStyle()
            gameBoard()
            createPlayer()
            attachEventListeners()
            gameTicker()

        }

        function setBodyStyle () {
            document.body.style.boxSizing = 'border-box'
            document.body.style.margin = '0'
            document.body.style.padding = '1vw'
            document.body.style.height = '100vh'
            document.body.style.width = '100vw'
        }

        function gameBoard() {
            var board = document.createElement('div')
            board.style.position = 'relative'
            board.style.overflow = 'hidden'
            board.style.margin = '0 auto'
            board.style.perspective = '0.65vw'

            if (document.body.offsetWidth > document.body.offsetHeight) {
                board.style.width = '98vh'
                board.style.height = '98vh'
            } else {
                board.style.width = '98vw'
                board.style.height = '98vw'
            }

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
                {backgroundPositionY: '0%'},
                {backgroundPositionY: '100%'}
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
            obstacle.style.backgroundSize = 'cover'
            obstacle.style.transition = "all 3s ease-in"
            obstacle.style.top = '0'
            obstacle.style.zIndex = '100'
            obstacle.type = Math.round(Math.random())

            if (obstacle.type === 0)
                obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random() * 4 - 0.5) + ".png')"
            else
                obstacle.style.backgroundImage = "url('js/food/" + Math.round(Math.random() * 4 + 9.5) + ".png')"

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
            if (randomWay === 0) {
                _obstacle.style.left = '44.5%'
                setTimeout(function () {
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                    moveObstacle(105, -25)
                }, 100)
            }
            else if (randomWay === 1) {
                _obstacle.style.left = '46.5%'
                setTimeout(function () {
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                    moveObstacle(105, 35)
                }, 100)
            }
            else {
                _obstacle.style.left = '48.5%'
                setTimeout(function () {
                    _obstacle.style.width = '30%'
                    _obstacle.style.height = '30%'
                    moveObstacle(105, 95)
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
            _player.style.boxSizing= "border-box"
            _player.style.backgroundColor = 'gold'
            _player.style.border = '0.5rem solid black'
            _player.style.borderRadius = '1rem'
            _player.style.width = _initialPlayerHeight + '%'
            _player.style.height = _initialPlayerHeight + '%'
            _player.style.zIndex = '200'

            var playerFace = document.createElement('img')
            playerFace.style.width = '100%'
            playerFace.style.height = '100%'
            playerFace.setAttribute('src', 'js/food/smiley-face.png')

            _player.appendChild(playerFace)

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

        function checkPosition() {
            var obstacles = document.getElementsByClassName('obstacle')

            _arrayOfObstacles = [].slice.call(obstacles)

            _arrayOfObstacles.forEach(function (el, i) {
                if (el.offsetTop + el.offsetWidth >= _player.offsetTop) {
                    checkCollision(el)
                }
                removeObstacle()
            })
        }

        function checkCollision(el) {
            if (
                _player.offsetTop < el.offsetTop + el.offsetHeight * 0.9
                &&
                _player.offsetLeft < el.offsetLeft + el.offsetWidth
                &&
                el.offsetLeft < _player.offsetLeft + _player.offsetWidth
                &&
                el.offsetTop <= _player.offsetTop + _player.offsetWidth * 0.8
            ) {
                checkType(el)
            }
        }

        function checkType(el) {
            if (el.type === 0) {
                el.parentNode.removeChild(el)
                --_lifes
                if (_lifes === 0) {
                    endGame()
                }
            } else {
                el.parentNode.removeChild(el)
                ++_score
                if (_score % 10 === 0) {
                    ++_lifes
                }
            }
        }

        function removeObstacle() {
            _arrayOfObstacles.forEach(function (el) {
                if (el.offsetTop > _player.offsetTop + _player.offsetWidth) {
                    el.parentNode.removeChild(el)
                }
            })
        }

        function clearAllIntervals() {
            var highestInterval = setInterval(function () {
            })
            for (var i = 0; i < highestInterval; i++) {
                clearInterval(i)
            }
        }

        function endGame() {
            clearAllIntervals()
            if (confirm("You lose :( Your score is " + _score  + "! Do you want to play again?")) {
                window.location = ''
            } else {
                clearAllIntervals()
            }
        }
        gameInit(document.body)

    }


)()
