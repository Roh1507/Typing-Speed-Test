const typingText = document.querySelector('.typing-text p')
let inpFeild = document.querySelector('.wrapper .input-field')
let mistakeTag=document.querySelector('.mistake span')
let timerTag=document.querySelector('.time span b')
let wpmTag=document.querySelector('.wpm span')
let cpmTag=document.querySelector('.cpm span')
let tryButton=document.querySelector('button')
let charIndex =0
let mistakes=0
let timer
let maxTime=60
let timeLeft=maxTime
let isTyping=false

function randomPara() {
    let randomIndex = Math.floor(Math.random() * paragraph.length)
    typingText.innerHTML=""
    paragraph[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inpFeild.focus())
    typingText.addEventListener("click", () => inpFeild.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll('span')
    let typerChar = inpFeild.value.split("")[charIndex]
    
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){//once typing it wont restart
            timer=setInterval(initTimer,1000)
            isTyping=true
        }
        //user has not pressed any button or backsapce
        if (typerChar == null) {
            charIndex--
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--
            }
            characters[charIndex].classList.remove("correct","incorrect")
        } else {
            //Increment word as entered and also mistakes
            
            if (characters[charIndex].innerText === typerChar) {
                characters[charIndex].classList.add("correct")
            } else {
                mistakes++
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++
        }
        characters.forEach(span => span.classList.remove('active'))
        characters[charIndex].classList.add("active")
    
        let wpm=Math.round((((charIndex-mistakes)/5) / (maxTime - timeLeft)) * 60)
        //if wpm value is 0, empty or infinity settingg to 0
        wpm =wpm < 0 || !wpm || wpm === Infinity? 0:wpm
        mistakeTag.innerText=mistakes
        wpmTag.innerText=wpm
        cpmTag.innerText=charIndex-mistakes
    }
    else{
        inpFeild.value=""
        clearInterval(timer)
    }
}

function initTimer(){
    if(timeLeft > 0){
    timeLeft--
    timerTag.innerText=timeLeft        
    }
    else{
        clearInterval(timer)
    }
}

function resetGame(){
    randomPara()
    inpFeild.value=""
    timeLeft=maxTime
    charIndex=mistakes=isTyping=0
    timerTag.innerText=timeLeft
    mistakeTag.innerText=mistakes
    wpmTag.innerText=0
    cpmTag.innerText=0
}

randomPara()
inpFeild.addEventListener("input", initTyping)
tryButton.addEventListener("click",resetGame)