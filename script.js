const bootScreen = document.getElementById('bootScreen');
const progress = document.getElementById('bootProgress');
const bootLog = document.getElementById('bootLog');
const logs = ['LOADING IDENTITY MODULE...', 'MOUNTING IDEA VAULT...', 'CALIBRATING CURIOSITY...', 'SYSTEM STATUS: ONLINE'];
let bootFinished = false;
function finishBoot(){ if(bootFinished) return; bootFinished=true; progress.style.width='100%'; bootLog.textContent='SYSTEM STATUS: ONLINE'; setTimeout(()=>bootScreen.style.opacity='0',180); setTimeout(()=>bootScreen.style.display='none',650); }
setTimeout(()=>progress.style.width='36%',100); setTimeout(()=>{progress.style.width='70%';bootLog.textContent=logs[1]},550); setTimeout(()=>{progress.style.width='88%';bootLog.textContent=logs[2]},1050); setTimeout(finishBoot,1550);
document.getElementById('skipBoot').addEventListener('click',finishBoot);

document.querySelectorAll('.process-step').forEach(button=>button.addEventListener('click',()=>{
  const copy={question:'Every experiment starts with a useful question — not necessarily an obvious answer.',experiment:'Try a small version. Test assumptions. See what changes.',fail:'When something breaks, it leaves a clue. That clue is part of the work.',learn:'Turn observations into a better mental model of the problem.',iterate:'Use what changed to make the next attempt more useful.'};
  document.querySelectorAll('.process-step').forEach(b=>b.classList.remove('active')); button.classList.add('active'); document.getElementById('processDetail').textContent=copy[button.dataset.step];
}));

const answers=[
  {keys:['learn','learning','c++','dsa','data structure'],answer:'Roshan is currently learning C++ and building fundamentals in Data Structures & Algorithms. He is also exploring web development, AI, and R&D.'},
  {keys:['r&d','research','why'],answer:'He is interested in R&D because he enjoys understanding how things work, testing different approaches, learning from failed attempts, and turning curiosity into something tangible.'},
  {keys:['explore','interest','idea','ideas'],answer:'Current explorations include AI, web development, and R&D. In the idea vault, he is considering a study-pattern tool, a campus knowledge map, and an explain-it-back learning space.'},
  {keys:['about','who','roshan'],answer:'Roshan is a first-year CSE student at the beginning of his journey. This site is designed to show his curiosity, willingness to learn, and experiment-first mindset.'},
  {keys:['skill','tools'],answer:'There are no inflated percentages here. Current tools include GitHub, VS Code, and AI tools; the focus is on learning and experimenting honestly.'}
];
function askSystem(input){const text=input.trim();if(!text)return;const body=document.getElementById('chatBody');const user=document.createElement('div');user.className='user-message';user.textContent=text;body.appendChild(user);const lowered=text.toLowerCase();const result=answers.find(item=>item.keys.some(key=>lowered.includes(key)));setTimeout(()=>{const bot=document.createElement('div');bot.className='bot-message';bot.textContent=result?result.answer:'This prototype only knows the information in Roshan’s portfolio. Try asking about learning, R&D, current interests, ideas, or tools.';body.appendChild(bot);body.scrollTop=body.scrollHeight},220);body.scrollTop=body.scrollHeight;}
document.getElementById('chatForm').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('chatInput');askSystem(input.value);input.value=''});
document.querySelectorAll('.quick-prompts button').forEach(button=>button.addEventListener('click',()=>askSystem(button.textContent)));

const terminalAnswers={help:'Commands available: about, skills, ideas, status, clear, debug.',about:'Roshan is a first-year CSE student with a question-first, experiment-driven mindset.',skills:'Learning: C++ and DSA. Exploring: web development, AI, and R&D.',ideas:'Idea vault: Study Signal, Campus Query Map, and Explain It Back.',status:'SYSTEM ONLINE. Current mode: learning. Current focus: C++ / DSA.',debug:'Hidden module found. Debug mode enabled.'};
document.getElementById('terminalForm').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('terminalInput');const cmd=input.value.trim().toLowerCase();if(!cmd)return;const output=document.getElementById('terminalOutput');const prompt=document.createElement('p');prompt.innerHTML='<span>roshan@lab:~$</span> '+cmd;output.appendChild(prompt);if(cmd==='clear'){output.innerHTML=''}else{const reply=document.createElement('p');reply.textContent=terminalAnswers[cmd]||'Command not found. Type help.';output.appendChild(reply);if(cmd==='debug'){document.body.classList.add('debug');document.getElementById('secretPanel').classList.add('show');document.getElementById('debugStatus').textContent='STATUS: DEBUG'}}input.value='';output.scrollTop=output.scrollHeight});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));
document.addEventListener('mousemove',e=>{document.querySelector('.cursor-glow').style.left=e.clientX+'px';document.querySelector('.cursor-glow').style.top=e.clientY+'px'});
let logoClicks=0,clickTimer;document.getElementById('logo').addEventListener('click',e=>{if(++logoClicks===5){e.preventDefault();document.body.classList.toggle('debug');document.getElementById('secretPanel').classList.add('show');document.getElementById('debugStatus').textContent='STATUS: DEBUG';logoClicks=0}clearTimeout(clickTimer);clickTimer=setTimeout(()=>logoClicks=0,1200)});document.getElementById('closeSecret').addEventListener('click',()=>document.getElementById('secretPanel').classList.remove('show'));
