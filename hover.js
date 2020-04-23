document.addEventListener('DOMContentLoaded', loaded)
document.onmousemove = onMove
const modalWidth = 400
let modal = undefined
let modalDescription = undefined
let mHeight = undefined
let mWidth = undefined
let isHovering = false

const modalHtml =
    `<div id="modal-window">
        <div id="modal-container">
            <p id="modal-description"></p>
        </div>
    </div>`

function loaded() {
    document.body.innerHTML += modalHtml
    modal = document.getElementById('modal-container')
    modalDescription = document.getElementById('modal-description')
    let items = document.getElementsByClassName('modal-interact')
    Array.from(items).forEach(element => {
        element.addEventListener('mouseover', mouseOver)
        element.addEventListener('mouseout', mouseOut)
    })
    modal.addEventListener('animationend', onAnimationEnd)
    modal.addEventListener('webkitAnimationEnd', onAnimationEnd)

    modal.style.maxWidth = `${modalWidth}px`
}

function onAnimationEnd(event) {
    isHovering = false;
}

function mouseOver(event) {
    let definition = event.target.getAttribute('data-modaldescription')

    if (definition == null)
        return

    modal.style.height = 'auto'
    isHovering = true
    modalDescription.innerHTML = definition
    modal.classList.remove('modal-animation')
    mHeight = parseFloat(getComputedStyle(modal).height)
    mWidth = parseFloat(getComputedStyle(modal).width)
}

function mouseOut(event) {
    const w = modal.style.width
    modal.classList.add('modal-animation')
    modal.style.width = `${w}px`
    modal.style.height = `${mHeight}px`
}

function onMove(event) {

    if (!isHovering)
        return

    let x = event.clientX
    let y = event.clientY

    modal.style.transform = `translate(${x + mWidth < document.documentElement.clientWidth ? x : x - mWidth}px, ${y + mHeight < document.documentElement.clientHeight ? y : y - mHeight}px)`
}