/* Seminar data: existing public CSV source + optional local backup.
   Fetch failures are reported explicitly, never presented as an empty schedule. */
(() => {
  "use strict";
  const status=document.getElementById("seminar-status");if(!status)return;
  const speaker=document.getElementById("seminar-speaker");
  const period=document.getElementById("seminar-period");
  let records=[];
  const str=v=>String(v??"").trim().normalize("NFC");
  function csv(text) {
    const rows=[];let row=[],cell="",quoted=false;
    text=text.replace(/^\uFEFF/,"").replace(/\r\n?/g,"\n");
    for(let i=0;i<text.length;i++) {
      const c=text[i];
      if(c==='"') { if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted; }
      else if(c===','&&!quoted){row.push(cell);cell="";}
      else if(c==='\n'&&!quoted){row.push(cell);rows.push(row);row=[];cell="";}
      else cell+=c;
    }
    if(quoted)throw Error("CSV quotation is not closed");
    if(cell||row.length){row.push(cell);rows.push(row);}
    return rows;
  }
  function validDate(value) {
    const match=str(value).match(/^(\d{4})[-./](\d{1,2})[-./](\d{1,2})$/);if(!match)return null;
    const d=new Date(+match[1],+match[2]-1,+match[3]);
    return d.getFullYear()===+match[1]&&d.getMonth()===+match[2]-1&&d.getDate()===+match[3]?d:null;
  }
  function normalize(rows) {
    return rows.map(r=>({date:str(r.date),speaker:str(r.speaker),title:str(r.title),venue:str(r.venue)})).filter(r=>validDate(r.date));
  }
  function text(tag,value,cls) {const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;return e;}
  function table(target,rows,emptyMessage) {
    target.replaceChildren();
    if(!rows.length){target.append(text("p",emptyMessage,"ase-small-note"));return;}
    const table=document.createElement("table");table.className="ase-seminar-table";
    const head=document.createElement("thead"),hr=document.createElement("tr");
    ["Date","Speaker","Paper title","Venue"].forEach(v=>{const th=text("th",v);th.scope="col";hr.append(th);});head.append(hr);table.append(head);
    const body=document.createElement("tbody");
    rows.forEach(r=>{
      const tr=document.createElement("tr");
      tr.append(text("td",r.date.replaceAll("-","."),"ase-seminar-date"),text("td",r.speaker||"—","ase-seminar-speaker"),text("td",r.title,"ase-seminar-title"));
      const v=text("td",r.venue||"—","ase-seminar-venue");
      try {const url=new URL(r.venue);if(["http:","https:"].includes(url.protocol)){
        const a=text("a","Paper link ↗");a.href=url.href;a.target="_blank";a.rel="noopener noreferrer";v.replaceChildren(a);
      }} catch(_){}
      tr.append(v);body.append(tr);
    });table.append(body);target.append(table);
  }
  function todayInSeoul() {
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));return new Date(+p.year,+p.month-1,+p.day);
  }
  function render() {
    const today=todayInSeoul(),lastYear=new Date(today);lastYear.setFullYear(today.getFullYear()-1);
    const upcoming=records.filter(r=>validDate(r.date)>=today).sort((a,b)=>validDate(a.date)-validDate(b.date));
    const past=records.filter(r=>{
      const d=validDate(r.date);if(d>=today)return false;
      if(speaker.value!=="all"&&!r.speaker.split(',').map(str).includes(speaker.value))return false;
      return period.value==='all'||(period.value==='1year'?d>=lastYear:d.getFullYear()===+period.value);
    }).sort((a,b)=>validDate(b.date)-validDate(a.date));
    table(document.getElementById("upcoming-seminars-list"),upcoming,"No upcoming seminars scheduled.");
    table(document.getElementById("past-seminars-list"),past,"No seminars match the selected filters.");
  }
  function install(rows) {
    records=normalize(rows);speaker.length=1;period.length=2;
    [...new Set(records.flatMap(r=>r.speaker.split(',').map(str)).filter(x=>x&&x!=='-'))].sort().forEach(v=>{const o=text('option',v);o.value=v;speaker.append(o);});
    [...new Set(records.map(r=>validDate(r.date).getFullYear()))].sort((a,b)=>b-a).forEach(v=>{const o=text('option',v);o.value=v;period.append(o);});
    render();
  }
  speaker.addEventListener('change',render);period.addEventListener('change',render);
  async function load() {
    const local=Array.isArray(window.ASE_SEMINARS)?window.ASE_SEMINARS:[];
    const url=str((window.ASE_CONFIG||{}).seminarCsvUrl);
    if(!url){install(local);status.hidden=true;return;}
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);
    try {
      const u=new URL(url);if(!['http:','https:'].includes(u.protocol))throw Error('Unsupported URL');
      const response=await fetch(u.href,{signal:controller.signal,credentials:'omit'});
      if(!response.ok)throw Error('HTTP '+response.status);
      const raw=await response.text();if(/^\s*<!?html/i.test(raw))throw Error('HTML instead of CSV');
      const rows=csv(raw);if(!rows.length||rows[0].length<4)throw Error('Expected four CSV columns');
      const content=rows.slice(1).map(c=>({date:c[0],speaker:c[1],title:c[2],venue:c[3]}));
      install(content);status.hidden=true;document.body.dataset.seminarSource='csv';
    } catch(error) {
      status.classList.add('is-error');status.hidden=false;
      if(local.length){install(local);status.textContent='온라인 일정 연결에 실패해 로컬 보존본을 표시합니다.';document.body.dataset.seminarSource='local-fallback';}
      else {
        status.textContent='세미나 일정을 불러오지 못했습니다. 네트워크와 공개 CSV 주소의 접근 권한을 확인해 주세요.';
        document.getElementById('upcoming-seminars-list').replaceChildren();
        document.getElementById('past-seminars-list').replaceChildren();
        document.body.dataset.seminarSource='unavailable';
      }
    } finally {clearTimeout(timeout);}
  }
  load();
})();
