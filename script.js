let user="";
let interval=null;

async function login(){
  const password=document.getElementById("password").value;
  if(!password) return alert("Masukkan password!");

  const res=await fetch("/api/auth",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({password})
  });

  const data=await res.json();
  if(!data.success) return alert("Password salah!");

  user=data.username;

  document.getElementById("login").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");

  loadMessages();
  if(interval) clearInterval(interval);
  interval=setInterval(loadMessages,3000);
}

async function sendMessage(){
  const input=document.getElementById("text");
  const text=input.value.trim();
  if(!text) return;

  await fetch("/api/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({user,text,time:Date.now()})
  });

  input.value="";
  loadMessages();
}

async function loadMessages(){
  const res=await fetch("/api/chat");
  const data=await res.json();

  const box=document.getElementById("messages");
  box.innerHTML="";

  data.forEach(m=>{
    const div=document.createElement("div");
    div.className="bubble "+(m.user===user?"me":"other");
    div.innerHTML=`<div class="name">${m.user}</div>${m.text}`;
    box.appendChild(div);
  });

  box.scrollTop=box.scrollHeight;
}
