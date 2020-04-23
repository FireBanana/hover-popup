document.addEventListener('DOMContentLoaded', loaded)
document.onmousemove = onMove
const modalWidth = 400
let modal = undefined
let modalDescription = undefined
let mHeight = undefined
let isHovering = false

const modalHtml = 
`<div id="modal-container">
<p id="modal-description">This is a description which can be quite long so we need to keep it a bit short</p>
</div>`

function loaded(){
    document.body.innerHTML += modalHtml
    modal = document.getElementById('modal-container')
    modalDescription = document.getElementById('modal-description')
    modal.style.width = `${modalWidth}px`
    let items = document.getElementsByClassName('modal-interact')
    Array.from(items).forEach(element => {        
        element.addEventListener('mouseover', mouseOver)
        element.addEventListener('mouseout', mouseOut)
    })
    modal.addEventListener('animationend', onAnimationEnd)
    modal.addEventListener('webkitAnimationEnd', onAnimationEnd)
}

function onAnimationEnd(event){
    isHovering = false;
}

function mouseOver(event){
    let definition = event.target.getAttribute('data-modaldescription')
    
    if(definition == null)
        return

    modal.style.display = 'block'
    modal.style.height = 'auto'
    isHovering = true;
    modalDescription.innerHTML = definition;
    modal.classList.remove('modal-animation')
    mHeight = parseFloat(getComputedStyle(modal).height)
}

function mouseOut(event){
    modal.classList.add('modal-animation')
    modalDescription.innerHTML = ""
    modal.style.height = `${mHeight}px`
}

function onMove(event){
    if(!isHovering){
        console.log('not hover')
        return
    }

    let x = event.clientX
    let y = event.clientY     

    modal.style.left = x + modalWidth < window.innerWidth ? `${x}px` : `${x - modalWidth}px`
    modal.style.top =  y + mHeight < window.innerHeight ? `${y}px` : `${y - mHeight}px`
}