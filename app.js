// --- Contador funcional ---
const counterDisplay = document.getElementById("counter");
const targetDate = new Date("2025-12-31T23:59:59").getTime();

function updateCounter(){
  const now = new Date().getTime();
  const diff = targetDate - now;

  if(diff<0){ counterDisplay.textContent="¡Evento completado!"; return;}

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);

  
}
setInterval(updateCounter,1000);
updateCounter();

// --- Comentarios solo admin ---
let comments = JSON.parse(localStorage.getItem("comments")) || [];
let isAdmin = localStorage.getItem("isAdmin")==="true";
const ADMIN_PASSWORD = "bosque123";

function saveComments(){localStorage.setItem("comments",JSON.stringify(comments));}
function renderComments(){
  const section = document.getElementById("commentSection");
  section.innerHTML="";
  comments.forEach((c,i)=>{
    const div=document.createElement("div");
    div.classList.add("comment");
    let actions="";
    
    section.appendChild(div);
  });
  document.getElementById("logoutBtn").style.display=isAdmin?"inline-block":"none";
}

function addComment(){
  const user=document.getElementById("username").value.trim();
  const text=document.getElementById("commentInput").value.trim();
  if(!user||!text)return alert("Debes ingresar nombre y comentario");
  comments.push({user,text});
  saveComments();
  renderComments();
  document.getElementById("commentInput").value="";
}

function editComment(index){
  const newText=prompt("Edita el comentario:",comments[index].text);
  if(newText!==null&&newText.trim()!==""){comments[index].text=newText.trim(); saveComments(); renderComments();}
}

function deleteComment(index){
  if(confirm("¿Seguro que deseas borrar este comentario?")){
    comments.splice(index,1);
    saveComments();
    renderComments();
  }
}

function loginAdmin(){
  const pass=document.getElementById("adminPass").value;
  if(pass===ADMIN_PASSWORD){isAdmin=true; localStorage.setItem("isAdmin","true"); alert("Modo Admin activado ✅"); renderComments();}
  else alert("Contraseña incorrecta ❌");
}
function logoutAdmin(){isAdmin=false; localStorage.setItem("isAdmin","false"); alert("Sesión Admin cerrada 🚪"); renderComments();}

// --- Menú hamburguesa ---
const menuToggle=document.getElementById("menuToggle");
const navbar=document.getElementById("navbar");
menuToggle.addEventListener("click",()=>{menuToggle.classList.toggle("active"); navbar.classList.toggle("open");});

// --- Scroll suave ---
document.querySelectorAll("#navbar a").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute("href"));
    const offset=70;
    window.scrollTo({top:target.offsetTop-offset,behavior:"smooth"});
    if(window.innerWidth<=768){menuToggle.classList.remove("active"); navbar.classList.remove("open");}
  });
});

// --- Glitch inicial ---
document.querySelectorAll('section h2').forEach(h2=>{h2.setAttribute('data-text',h2.textContent);h2.classList.add('glitch');});

// --- Botón ambiente ---
const ambientBtn = document.getElementById("ambientBtn");
const ambientAudio = document.getElementById("ambientAudio");
ambientBtn.addEventListener("click", ()=>{
  ambientAudio.play();
  ambientBtn.style.display="none";
  // Luces intermitentes rojas y verdes
  setInterval(()=>{
    document.body.style.backgroundColor = (Math.random()>0.5)?"#0a0000":"#00100a";
  },400);
});

// Render inicial
renderComments();