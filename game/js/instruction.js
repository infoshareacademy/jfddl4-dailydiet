(function () {
    var _instructions = null
    var _container = document.querySelector('body')
    _container.style.background = "green"

    function init(container) {
        instructions(container)
    }

    function instructions(container) {
        _instructions = document.createElement('div')
        _instructions.style.background = 'rgba(255,255,255,0.7)'
        container.appendChild(_instructions)

        var titleDiv = document.createElement('div')
        _instructions.appendChild(titleDiv)


        var title = document.createElement('h1')
        title.innerText = 'Thank you!'
        title.style.textAlign = 'center'
        title.style.color = 'darkGreen'
        titleDiv.appendChild(title)

        var titleParagraph = document.createElement('p')
        titleParagraph.innerText = 'To thank for your subscription we invite you to enjoy Daily Diet game which encourages to live healthy life.'
        titleParagraph.style.textAlign = 'center'
        titleParagraph.style.fontSize = '22px'
        titleDiv.appendChild(titleParagraph)
        var hr = document.createElement('hr')
        titleParagraph.appendChild(hr)

        var rules = document.createElement('div')
        rules.style.display = 'flex'
        rules.style.margin = 'auto'
        rules.style.width = '80%'
        container.appendChild(rules)

        var array = [
            'use arrow keys to move left and right',
            'catch healthy products to stay fit',
            'avoid unhealthy food, otherwise your character is going to end miserably'
        ]

        var instructionList = document.createElement('ol')
        rules.appendChild(instructionList)

        array.forEach(function (thingsToDo) {
            var li = document.createElement('li')
            instructionList.appendChild(li)
            li.innerHTML += thingsToDo
        })
        instructionList.style.fontSize = '22px'
        instructionList.style.marginLeft = '50%'
    }

    init(_container)

})()
