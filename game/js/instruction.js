(function () {
    var _instructions = null
    var _container = document.querySelector('body')

    function init(container) {
        instructions(container)
    }

    function instructions(container) {
        _instructions = document.createElement('div')
        container.appendChild(_instructions)

        var titleDiv = document.createElement('div')
        titleDiv.style.
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


    }

    init(_container)

})()