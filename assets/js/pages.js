/* Content rendering. Local script data works both on GitHub Pages and with file://. */
(() => {
  "use strict";
  const $ = s => document.querySelector(s);
  const config = window.ASE_CONFIG || {};
  const text = value => String(value ?? "").normalize("NFC");
  function el(tag, cls, value) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (value !== undefined) n.textContent = text(value);
    return n;
  }
  function externalLink(url, label, cls="ase-text-link") {
    try {
      const u = new URL(url); if (!["https:","http:"].includes(u.protocol)) return null;
      const a = el("a",cls,label); a.href=u.href; a.target="_blank"; a.rel="noopener noreferrer";
      return a;
    } catch (_) {return null;}
  }
  function newsText(source) {
    const doc = new DOMParser().parseFromString(text(source), "text/html");
    const result = document.createDocumentFragment();
    const allowed = new Set(["STRONG","B","EM","I","BR"]);
    const discard = new Set(["SCRIPT","STYLE","IFRAME","SVG","MATH","OBJECT","EMBED"]);
    function copy(node,parent) {
      if (node.nodeType===3) parent.append(document.createTextNode(text(node.textContent)));
      else if (node.nodeType===1 && !discard.has(node.tagName)) {
        const target = allowed.has(node.tagName) ? document.createElement(node.tagName.toLowerCase()) : parent;
        if (target!==parent) parent.append(target);
        node.childNodes.forEach(child=>copy(child,target));
      }
    }
    doc.body.childNodes.forEach(n=>copy(n,result)); return result;
  }
  function renderNews(target, limit) {
    if (!target) return;
    const rows = Array.isArray(window.ASE_NEWS)?window.ASE_NEWS:[];
    const fragment=document.createDocumentFragment();
    rows.slice(0,limit).forEach(row=>{
      const li=el("li","ase-news-item"); const meta=el("div","ase-news-meta");
      const time=el("time","ase-news-date",row.date);
      if (/^\d{4}[.-]\d{2}([.-]\d{2})?$/.test(text(row.date))) time.dateTime=text(row.date).replaceAll(".","-");
      meta.append(time,el("span","ase-news-tag",row.tag||"News"));
      const title=el("p","ase-news-title"); title.append(newsText(row.title));
      li.append(meta,title);fragment.append(li);
    });
    if (!rows.length) fragment.append(el("li","ase-news-item","등록된 소식이 없습니다."));
    target.replaceChildren(fragment);
  }
  renderNews($("#ase-latest-news"),Number.isInteger(config.newsLimit)&&config.newsLimit>0?config.newsLimit:5);
  renderNews($("#ase-all-news"),Infinity);

  function authorText(value) {
    const f=document.createDocumentFragment();
    text(value).split(/(Geumhwan Cho|조금환|Jeonil Ji|지전일|양희지|이정윤)/g).forEach(piece=>{
      if (/^(Geumhwan Cho|조금환|Jeonil Ji|지전일|양희지|이정윤)$/.test(piece)) f.append(el("strong","",piece));
      else f.append(document.createTextNode(piece));
    }); return f;
  }
  function renderPublications(region) {
    const target=$("#publication-list");if(!target)return;
    const all=Array.isArray(window.ASE_PUBLICATIONS)?window.ASE_PUBLICATIONS:[];
    const filtered=all.filter(p=>p.region===region);
    const groups=new Map();
    filtered.forEach(p=>{ if(!groups.has(p.year))groups.set(p.year,[]);groups.get(p.year).push(p); });
    const output=document.createDocumentFragment();
    [...groups.keys()].sort((a,b)=>b-a).forEach(year=>{
      const section=el("section","ase-publication-year");section.dataset.year=year;
      const h2=el("h2","ase-publication-year-title",year);section.append(h2);
      const list=el("ul","ase-paper-list"); const papers=groups.get(year);
      papers.forEach((p,i)=>{
        const li=el("li","ase-paper");li.dataset.region=region;
        const meta=el("div","ase-paper-meta");
        meta.append(el("span","ase-paper-number",`[${papers.length-i}]`),el("span","ase-paper-type"+(p.type==="Conference"?" is-conference":""),p.type));
        const content=el("div","ase-paper-content");content.append(el("h3","ase-paper-title",p.title));
        const details=el("div","ase-paper-details");
        const authors=el("div");authors.append(el("span","ase-detail-label","Authors"),authorText(p.authors));
        const venue=el("div");venue.append(el("span","ase-detail-label","Published in"),document.createTextNode(text(p.venue)));
        details.append(authors,venue);content.append(details);
        const foot=el("div","ase-paper-footer");foot.append(el("span","ase-paper-date",p.date));
        if(p.note)foot.append(el("span","ase-paper-note",p.note));
        const link=externalLink(p.url,"View paper ↗");if(link)foot.append(link);
        content.append(foot);li.append(meta,content);list.append(li);
      });
      section.append(list);output.append(section);
    });
    if(!filtered.length)output.append(el("p","ase-small-note","No publications in this category."));
    target.replaceChildren(output);
    const count=$("#publication-count"); if(count)count.textContent=`${filtered.length} publications`;
    document.querySelectorAll(".ase-filter-button[data-region]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.region===region)));
  }
  document.querySelectorAll(".ase-filter-button[data-region]").forEach(b=>b.addEventListener("click",()=>renderPublications(b.dataset.region)));
  renderPublications("INT");

  if($("#ongoing-projects")) {
    (Array.isArray(window.ASE_PROJECTS)?window.ASE_PROJECTS:[]).forEach(p=>{
      const target=p.status==="ongoing"?$("#ongoing-projects"):$("#past-projects");if(!target)return;
      const card=el("article","ase-project");card.lang="ko";
      card.append(el("h3","",p.title),el("p","",`${p.funder} · ${p.role}`),el("p","ase-project-period",p.period));target.append(card);
    });
  }
})();
