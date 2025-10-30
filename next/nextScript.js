const playbtn= document.getElementById("play-btn");
const rulebtn = document.getElementById("rule-btn")
const rules =  document.querySelector(".rules");
const crossbtn = document.getElementById("crossbtn");

playbtn.addEventListener("click",()=>{
    window.location.href = "../index.html"
})

rulebtn.addEventListener("click",()=>{
    rules.style.display = "block"
})

crossbtn.addEventListener("click",()=>{
    rulesBox.style.display = "none"
})