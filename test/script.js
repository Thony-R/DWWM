const btn= document.getElementById("button");
let score = 0;
document.getElementById('score').textContent = score;
console.log('score : '+score);
btn.addEventListener('click',()=>{score++;console.log('score : '+score);document.getElementById('score').textContent = score;});
