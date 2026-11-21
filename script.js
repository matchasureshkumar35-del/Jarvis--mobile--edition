const chat=document.getElementById('chat');
const input=document.getElementById('msg');
const network=document.getElementById('network');
function add(text,who){const d=document.createElement('div');d.className='msg '+who;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;return d;}
document.getElementById('chat-form').addEventListener('submit',event=>{
 event.preventDefault();const t=input.value.trim();if(!t)return;
 add('YOU: '+t,'user');input.value='';
 const pending=add('J.A.R.V.I.S: Processing...','ai');
 setTimeout(()=>{pending.textContent='J.A.R.V.I.S: Systems online. This is a demo dashboard. A secure AI backend is required for intelligent replies.';},600);
});
function updateNetwork(){const online=navigator.onLine;network.textContent=online?'● ONLINE':'● OFFLINE';network.className=online?'on':'off';}
window.addEventListener('online',updateNetwork);window.addEventListener('offline',updateNetwork);updateNetwork();
