const MONTHS = [ 
 {name:"January",file:"january.jpg",artist:"Chamindu Chathumina",title:"Let’s Protect the Beauty of Nature",age:"9-12 years",motion:"motion-drift",music:"january.wav",quote:"Protecting wildlife and natural habitats keeps our world beautiful."},
 {name:"February",file:"february.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-float",music:"february.wav",quote:"Like raindrops, little acts of kindness help our world grow."},
 {name:"March",file:"march.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-sway",music:"march.wav",quote:"Let the wind remind us that change can bring new life."},
 {name:"April",file:"april.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-zoom",music:"april.wav",quote:"A greener tomorrow begins with the seeds we plant today."},
 {name:"May",file:"may.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-pan",music:"may.wav",quote:"The beauty of nature is a gift worth protecting together."},
 {name:"June",file:"june.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-drift",music:"june.wav",quote:"Keep our rivers flowing clear, and life will continue to flourish."},
 {name:"July",file:"july.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-float",music:"july.wav",quote:"Reach for the sky while keeping your roots close to nature."},
 {name:"August",file:"august.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-sway",music:"august.wav",quote:"Every leaf tells a story; let us make it one of renewal."},
 {name:"September",file:"september.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-zoom",music:"september.wav",quote:"A world full of colour begins with a healthy natural world."},
 {name:"October",file:"october.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-pan",music:"october.wav",quote:"Protect the places where wildlife, wonder and imagination belong."},
 {name:"November",file:"november.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-drift",music:"november.wav",quote:"The earth is our shared home; let every choice show that we care."},
 {name:"December",file:"december.jpg",artist:"To be announced",title:"Let’s Protect the Beauty of Nature",age:"To be confirmed",motion:"motion-float",music:"december.wav",quote:"Carry the beauty of nature into every new beginning."}
];

const HOLIDAYS = {
 "2027-01-15":{name:"Tamil Thai Pongal Day",public:true,bank:true,mercantile:true},
 "2027-01-22":{name:"Duruthu Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-02-04":{name:"Independence Day",public:true,bank:true,mercantile:true},
 "2027-02-20":{name:"Nawam Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-03-06":{name:"Maha Sivarathri Day",public:true,bank:true},
 "2027-03-10":{name:"Id-Ul-Fitr (Ramazan Festival Day)",public:true,bank:true},
 "2027-03-22":{name:"Medin Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-03-26":{name:"Good Friday",public:true,bank:true},
 "2027-04-13":{name:"Day Prior to Sinhala and Tamil New Year Day",public:true,bank:true,mercantile:true},
 "2027-04-14":{name:"Sinhala and Tamil New Year Day",public:true,bank:true,mercantile:true},
 "2027-04-20":{name:"Bak Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-05-01":{name:"May Day (International Workers’ Day)",public:true,bank:true,mercantile:true},
 "2027-05-17":{name:"Id-Ul-Alha (Hadji Festival Day)",public:true,bank:true},
 "2027-05-19":{name:"Vesak Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-05-20":{name:"Day Following Vesak Full Moon Poya Day",public:true,bank:true,mercantile:true},
 "2027-06-18":{name:"Poson Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-07-18":{name:"Esala Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-08-15":{name:"Milad-Un-Nabi (Holy Prophet’s Birthday)",public:true,bank:true,mercantile:true},
 "2027-08-16":{name:"Nikini Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-09-15":{name:"Binara Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-10-15":{name:"Vap Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-10-28":{name:"Deepavali Festival Day",public:true,bank:true},
 "2027-11-13":{name:"Il Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-12-13":{name:"Unduvap Full Moon Poya Day",public:true,bank:true,poya:true},
 "2027-12-25":{name:"Christmas Day",public:true,bank:true,mercantile:true}
};

let pageIndex=0;
let deferredInstallPrompt=null;
const $=id=>document.getElementById(id);
const navigation=$("monthNavigation");
const TOTAL_PAGES=25;
const monthAudio=$("monthAudio");
const musicToggle=$("musicToggle");
let loadedAudioMonth=-1;

MONTHS.forEach((month,index)=>{
 const button=document.createElement("button");
 button.type="button";button.className="month-tab";button.dataset.page=String(index*2+1);
 button.innerHTML=`<span class="tab-icon">❧</span><span>${month.name}</span>`;
 button.addEventListener("click",()=>showPage(index*2+1));
 navigation.appendChild(button);
});
navigation.querySelector('[data-page="0"]').addEventListener("click",()=>showPage(0));

function dateKey(year,month,day){return `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;}
function holidayMarkers(info,isWeekend){
 const markers=[];
 if(info?.public)markers.push({symbol:"*",label:"Public holiday"});
 if(info?.bank&&!isWeekend)markers.push({symbol:"†",label:"Bank holiday"});
 if(info?.mercantile)markers.push({symbol:"‡",label:"Mercantile holiday"});
 if(info?.poya)markers.push({symbol:"●",label:"Full Moon Poya"});
 return markers;
}
function buildCalendar(monthIndex){
 const year=2027, firstDay=new Date(year,monthIndex,1).getDay();
 const daysInMonth=new Date(year,monthIndex+1,0).getDate(), offset=(firstDay+6)%7;
 const grid=$("calendarGrid");grid.innerHTML="";
 ["MON","TUE","WED","THU","FRI","SAT","SUN"].forEach(label=>{
  const cell=document.createElement("div");cell.className="weekday";cell.textContent=label;grid.appendChild(cell);
 });
 for(let i=0;i<offset;i++){const empty=document.createElement("div");empty.className="date-cell empty";grid.appendChild(empty);}
 const monthHolidays=[];
 for(let day=1;day<=daysInMonth;day++){
  const date=new Date(year,monthIndex,day), weekday=(date.getDay()+6)%7,isWeekend=weekday>=5;
  const info=HOLIDAYS[dateKey(year,monthIndex,day)],markers=holidayMarkers(info,isWeekend);
  const cell=document.createElement("div");cell.className="date-cell"+(isWeekend?" weekend":"")+(info?" holiday":"")+(info?.poya?" poya-day":"");
  const number=document.createElement("span");number.className="date-number";number.textContent=day;cell.appendChild(number);
  const markerRow=document.createElement("span");markerRow.className="date-markers";
  markers.forEach(marker=>{const mark=document.createElement("span");mark.textContent=marker.symbol;if(marker.symbol==="●")mark.className="poya-marker";markerRow.appendChild(mark);});
  cell.appendChild(markerRow);
  if(info){const markerText=markers.map(m=>m.label).join(", ");cell.title=`${info.name} — ${markerText}`;cell.setAttribute("aria-label",`${day}: ${info.name}. ${markerText}.`);monthHolidays.push({day,name:info.name,poya:!!info.poya});}
  else if(isWeekend){cell.title=weekday===5?"Saturday":"Sunday";cell.setAttribute("aria-label",`${day}: ${weekday===5?"Saturday":"Sunday"}`);}
  grid.appendChild(cell);
 }
 const list=$("holidayList");list.innerHTML="";
 if(monthHolidays.length){
  monthHolidays.forEach(item=>{const card=document.createElement("div");card.className="holiday-item"+(item.poya?" poya-holiday":"");
   const day=document.createElement("strong");day.className="holiday-day";day.textContent=String(item.day).padStart(2,"0");
   const name=document.createElement("span");name.textContent=item.name;card.append(day,name);list.appendChild(card);});
 }else{const empty=document.createElement("div");empty.className="holiday-item no-holiday";empty.textContent="No additional public or Poya holidays listed for this month.";list.appendChild(empty);}
}
function showPage(nextPage){
 pageIndex=((nextPage%TOTAL_PAGES)+TOTAL_PAGES)%TOTAL_PAGES;
 const isCover=pageIndex===0,isArtwork=!isCover&&pageIndex%2===1,isMonth=!isCover&&!isArtwork;
 const monthIndex=isCover?-1:Math.floor((pageIndex-1)/2),month=monthIndex>=0?MONTHS[monthIndex]:null;
 if(monthIndex!==loadedAudioMonth){
  if(!monthAudio.paused){monthAudio.pause();monthAudio.currentTime=0;}
  loadedAudioMonth=monthIndex;
  monthAudio.src=month?`assets/audio/${month.music}`:"";
  musicToggle.setAttribute("aria-pressed","false");
  musicToggle.textContent="♫";
 }
 musicToggle.hidden=isCover;
 $("coverPage").hidden=!isCover;$("artworkPage").hidden=!isArtwork;$("monthPage").hidden=!isMonth;
 if(month){
  $("monthPage").style.setProperty("--month-artwork", `url("assets/artworks/${month.file}")`);
  const title=`${month.name} <small>2027</small>`;
  $("artPageMonth").innerHTML=title;$("monthTitle").innerHTML=title;
  $("artworkTitle").textContent=month.title;$("artistCredit").textContent=month.artist;
  $("ageCategory").textContent=month.age;$("quoteText").textContent=month.quote;
  const frame=$("artworkFrame"),image=$("artworkImage");
  const placeholder=$("artworkPlaceholder");
  frame.style.setProperty("--artwork-backdrop", `url("/assets/artworks/${encodeURIComponent(month.file)}")`);

  // Apply the gentle motion assigned to each month in MONTHS.
  // The image itself remains uncropped and keeps its original aspect ratio.
  image.className = `artwork-image ${month.motion || "motion-drift"}`;
  image.decoding = "async";
  image.loading = "eager";
  if ("fetchPriority" in image) image.fetchPriority = "high";

  placeholder.hidden=false;
  image.onload=()=>{
   placeholder.hidden=true;
   frame.classList.add("has-image");
   image.style.display="block";
   image.classList.add("artwork-motion-active");
  };
  image.onerror=()=>{
   placeholder.hidden=false;
   frame.classList.remove("has-image");
   image.classList.remove("artwork-motion-active");
   image.style.display="none";
  };
  image.alt=`${month.name} 2027 featured artwork from Vidul Art Competition 2026`;
  // Use an absolute same-origin URL and a version query to bypass stale
  // relative-path/service-worker image entries from earlier deployments.
  image.src=`/assets/artworks/${encodeURIComponent(month.file)}?v=20271126`;
  if(image.complete && image.naturalWidth>0) image.onload();
  $("pageNumber").textContent=`${String(pageIndex+1).padStart(2,"0")} / ${TOTAL_PAGES}`;
  $("monthPageNumber").textContent=`${String(pageIndex+1).padStart(2,"0")} / ${TOTAL_PAGES}`;
  $("nextBtn").textContent=`View ${month.name} Calendar ›`;
  $("monthNextBtn").textContent=monthIndex===11?"Back to Cover ›":"Next month ›";
  $("monthPrevBtn").textContent=`‹ ${month.name} Artwork`;
  if(isMonth)buildCalendar(monthIndex);
 }
 document.querySelectorAll(".month-tab").forEach(button=>{
  const selected=Number(button.dataset.page)===0?isCover:Math.floor((Number(button.dataset.page)-1)/2)===monthIndex;
  button.classList.toggle("active",selected);
 });
 $("calendarCard").style.animation="none";
 requestAnimationFrame(()=>$("calendarCard").style.animation="");
}
$("exploreBtn").addEventListener("click",()=>showPage(1));
$("homeLink").addEventListener("click",event=>{event.preventDefault();showPage(0);});
$("prevBtn").addEventListener("click",()=>showPage(pageIndex-1));
$("nextBtn").addEventListener("click",()=>showPage(pageIndex+1));
$("monthPrevBtn").addEventListener("click",()=>showPage(pageIndex-1));
$("monthNextBtn").addEventListener("click",()=>showPage(pageIndex===24?0:pageIndex+1));
$("fullBtn").addEventListener("click",async()=>{
 try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();}
 catch(error){console.warn("Fullscreen is not available.",error);}
});
musicToggle.addEventListener("click",async()=>{
 if(loadedAudioMonth<0)return;
 if(monthAudio.paused){
  try{
   await monthAudio.play();
   musicToggle.setAttribute("aria-pressed","true");
   musicToggle.textContent="Ⅱ";
   musicToggle.title=`Pause ${MONTHS[loadedAudioMonth].name} instrumental`;
   musicToggle.setAttribute("aria-label",`Pause ${MONTHS[loadedAudioMonth].name} instrumental`);
  }catch(error){
   console.warn("Monthly music could not be played.",error);
   musicToggle.setAttribute("aria-pressed","false");
  }
 }else{
  monthAudio.pause();
  musicToggle.setAttribute("aria-pressed","false");
  musicToggle.textContent="♫";
  musicToggle.title=`Play ${MONTHS[loadedAudioMonth].name} instrumental`;
  musicToggle.setAttribute("aria-label",`Play ${MONTHS[loadedAudioMonth].name} instrumental`);
 }
});
monthAudio.addEventListener("ended",()=>{
 musicToggle.setAttribute("aria-pressed","false");musicToggle.textContent="♫";
});
const installModal=$("installModal");
function openInstallHelp(){installModal.hidden=false;document.body.classList.add("modal-open");}
function closeInstallHelp(){installModal.hidden=true;document.body.classList.remove("modal-open");}
async function installCalendar(){
 if(deferredInstallPrompt){
  try{deferredInstallPrompt.prompt();const choice=await deferredInstallPrompt.userChoice;
   if(choice?.outcome==="accepted")closeInstallHelp();
  }catch(error){console.warn("Install prompt could not be opened.",error);openInstallHelp();}
  deferredInstallPrompt=null;return;
 }
 openInstallHelp();
}
["installBtn","sidebarInstallBtn"].forEach(id=>$(id).addEventListener("click",installCalendar));
$("installClose").addEventListener("click",closeInstallHelp);
installModal.addEventListener("click",event=>{if(event.target===installModal)closeInstallHelp();});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape")closeInstallHelp();
 if(event.key==="ArrowRight")showPage(pageIndex+1);
 if(event.key==="ArrowLeft")showPage(pageIndex-1);
 if(event.key==="Home")showPage(0);
 if(event.key==="End")showPage(TOTAL_PAGES-1);
});
window.addEventListener("beforeinstallprompt",event=>{
 event.preventDefault();deferredInstallPrompt=event;
 $("installBtn").classList.add("install-ready");$("sidebarInstallBtn").classList.add("install-ready");
 $("installBtn").title="Install Vidullanka Digital Calendar";
});
window.addEventListener("appinstalled",()=>{deferredInstallPrompt=null;closeInstallHelp();});
let touchStartX=0;
$("calendarCard").addEventListener("touchstart",event=>{touchStartX=event.changedTouches[0].screenX;},{passive:true});
$("calendarCard").addEventListener("touchend",event=>{
 const delta=event.changedTouches[0].screenX-touchStartX;if(Math.abs(delta)>65)showPage(pageIndex+(delta<0?1:-1));
},{passive:true});
if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1")){
 window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(error=>console.warn("Service worker registration failed",error)));
}
showPage(0);
