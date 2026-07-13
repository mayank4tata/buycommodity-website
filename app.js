const DEFAULT_SETTINGS={phone:'+91 99101 56202',phone2:'+91 88514 24339',phone3:'',email:'ankit@buycommodity.com',website:'www.buycommodity.in',address:'Wing A, 5th Floor Statesmen House, Connaught Place, New Delhi - 110001',corporateAddress:'Wing A, 5th Floor Statesmen House, Connaught Place, New Delhi - 110001',gstAddress:'Wing A, 5th Floor Statesmen House, Connaught Place, New Delhi - 110001',whatsapp:'+91 99101 56202',workingHours:'Mon - Sat: 9:30 AM - 6:30 PM | Sunday: Closed'};

const DEFAULT_CATALOG=[
{cat:'Mild Steel (MS)',name:'HR Coil',type:'Hot Rolled Coil',thickness:'1.6 - 16 mm',width:'900 - 1850 mm',length:'Full Size',grade:'Grade 1 (IS10748) | Grade 2 (IS1079DD) | E250/E350 (IS2062) | SAPH440 | BSK 46 | IS1079'},
{cat:'Mild Steel (MS)',name:'HR Sheets',type:'Hot Rolled Sheets',thickness:'1.6 - 4 mm',width:'900 - 1850 mm',length:'1500 - 6300 mm',grade:'Grade 1 (IS10748) | Grade 2 (IS1079DD) | E250/E350 | SAPH440 | BSK 46 | IS1079'},
{cat:'Mild Steel (MS)',name:'HR Plates',type:'Hot Rolled Plates',thickness:'5 - 10 mm',width:'1250 - 1850 mm',length:'2500 - 12000 mm',grade:'E250/E350 (IS2062), IS1079 and as required'},
{cat:'Mild Steel (MS)',name:'CR Coil',type:'Cold Rolled Coil',thickness:'0.5 - 2.5 mm',width:'900 - 1520 mm',length:'Full Size',grade:'CR2 (D) | CR3 (DD) | CR4 (EDD)'},
{cat:'Mild Steel (MS)',name:'CR Sheet',type:'Cold Rolled Sheet',thickness:'0.5 - 2.5 mm',width:'900 - 1520 mm',length:'1500 - 6300 mm',grade:'CR2 (D) | CR3 (DD) | CR4 (EDD)'},
{cat:'Structural Steel',name:'Flat',type:'MS Flat',thickness:'5 - 65 mm',width:'25 - 500 mm',length:'Standard / Custom',grade:'IS2062 and commercial grades'},
{cat:'Structural Steel',name:'Angle',type:'MS Angle',thickness:'3 - 20 mm',width:'20 - 200 mm',length:'Standard / Custom',grade:'IS2062, E250, E350 and commercial grades'},
{cat:'Structural Steel',name:'Channel',type:'MS Channel',thickness:'As per section',width:'75x40 | 100x50 | 125x65 | 150x75 | 175x75 | 200x75 | 225x80 | 250x80 | 300x90 | 350x100 | 400x100',length:'Standard / Custom',grade:'IS2062, E250, E350'},
{cat:'Structural Steel',name:'Beam',type:'I Beam / H Beam',thickness:'As per section',width:'100x50 | 125x70 | 150x75 | 175x85 | 200x100 | 225x110 | 250x125 | 300x140 | 350x140 | 400x140 | 450x150 | 500x180 | 550x190 | 600x210',length:'6 m - 12 m',grade:'IS2062, E250, E350'},
{cat:'Structural Steel',name:'Round Bar',type:'MS Round Bar',thickness:'16 | 18 | 20 | 22 | 25 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 45 | 47 | 50 | 56 | 60 | 63 | 66 | 71 | 75 | 80 | 85 | 90 | 100 | 110 | 118 | 125 | 130 | 155 mm',width:'Diameter sizes',length:'Standard Length',grade:'Commercial / IS grades'},
{cat:'Structural Steel',name:'Square Bar',type:'MS Square Bar',thickness:'6 | 16 | 18 | 20 | 22 | 25 | 28 | 32 | 36 | 40 | 45 | 50 | 55 mm',width:'Square sizes',length:'Standard Length',grade:'Commercial / IS grades'},
{cat:'Structural Steel',name:'Round / Square Hollow Pipe',type:'Hollow Sections',thickness:'As per pipe',width:'0.5" | 0.75" | 1.00" | 1.25" | 1.50" | 2.00"',length:'Standard Length',grade:'MS / Structural Pipe grades'},
{cat:'Structural Steel',name:'TMT',type:'TMT Bar',thickness:'6 | 8 | 10 | 12 | 16 | 20 | 22 | 25 | 28 | 32 | 36 | 40 mm',width:'Diameter sizes',length:'Standard Length',grade:'Fe 500 / Fe 550 and as required'},
{cat:'Stainless Steel (SS)',name:'SS Coil',type:'Stainless Steel Coil',thickness:'2.0 - 12.0 mm',width:'1250 mm',length:'Coil',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'},
{cat:'Stainless Steel (SS)',name:'SS Sheet',type:'Stainless Steel Sheet',thickness:'0.5 - 6.0 mm',width:'1250 mm',length:'Blank / Sheet',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'},
{cat:'Stainless Steel (SS)',name:'SS Plate',type:'Stainless Steel Plate',thickness:'8.0 - 80.0 mm',width:'1250 mm',length:'Plate',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'},
{cat:'Stainless Steel (SS)',name:'SS HRAP Coil',type:'SS HRAP Coil',thickness:'2.0 - 6.0 mm',width:'1250 mm',length:'Coil',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'},
{cat:'Stainless Steel (SS)',name:'SS CRAP Coil',type:'SS CRAP Coil',thickness:'0.5 - 3.0 mm',width:'1250 mm',length:'Coil',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'},
{cat:'Stainless Steel (SS)',name:'SS Slab',type:'Stainless Steel Slab',thickness:'Maximum 200 mm',width:'1285 mm',length:'Slab',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'},
{cat:'Stainless Steel (SS)',name:'SS Round Bar',type:'SS Round Bar',thickness:'5.0 - 350.0 mm',width:'Diameter sizes',length:'Standard Length',grade:'304 / 202 and as required'},
{cat:'Stainless Steel (SS)',name:'SS Pipe',type:'Round / Square / Rectangle SS Pipe',thickness:'As per section',width:'Standard sizes',length:'Standard Length',grade:'202 | 304'}
];

const IMAGE_OPTIONS=[
{file:'enq-coils-real.jpg',label:'Coils'},
{file:'enq-sheets-real.jpg',label:'Sheets'},
{file:'enq-pipes-real.jpg',label:'Pipes - Round & Square'},
{file:'enq-round-pipes-real.jpg',label:'Round Pipes'},
{file:'enq-square-pipes-real.jpg',label:'Square Pipes'},
{file:'enq-rectangular-pipes-real.jpg',label:'Rectangular Pipes'},
{file:'enq-rounds-real.jpg',label:'Rounds'},
{file:'enq-square-bars-real.jpg',label:'Square Bars'},
{file:'enq-flat-bars-real.jpg',label:'Flat Bars'},
{file:'enq-angles-real.jpg',label:'Angles'},
{file:'enq-channel-real.jpg',label:'Channel'},
{file:'enq-beams-real.jpg',label:'Beam'},
{file:'enq-tmt-real.jpg',label:'TMT Bars'}
];

const DEFAULT_RATECARDS=[
{category:'Coils',displayName:'Coils',image:'enq-coils-real.jpg',productType:'MS / SS',processType:'HR / CR / SS',grade:'IS10748, IS1079, CR2, CR3, SS304 etc.',specification:'Thickness, width and coil weight as required',rate:'On Request',validUpto:'07 Days',availability:'Ex-works / Delivered'},
{category:'Sheets',displayName:'Sheets',image:'enq-sheets-real.jpg',productType:'MS / SS',processType:'HR / CR / SS',grade:'IS10748, IS2062, CR2, CR3, SS304 etc.',specification:'Thickness, width, length and sheet weight as required',rate:'On Request',validUpto:'07 Days',availability:'Custom cutting available'},
{category:'Pipes',displayName:'Pipes',image:'enq-pipes-real.jpg',productType:'MS / SS',processType:'Round / Square Pipes',grade:'IS1239, IS4923, 202, 304 etc.',specification:'Round and square pipes in different sizes, thicknesses and lengths',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Round Pipes',displayName:'Round Pipes',image:'enq-round-pipes-real.jpg',productType:'MS / SS',processType:'Round Pipes',grade:'IS1239, IS4923, 202, 304 etc.',specification:'MS / SS round pipes in different sizes, thicknesses and lengths',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Square Pipes',displayName:'Square Pipes',image:'enq-square-pipes-real.jpg',productType:'MS / SS',processType:'Square Pipes',grade:'IS4923, 202, 304 etc.',specification:'MS / SS square pipes in different sizes, thicknesses and lengths',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Rectangular Pipes',displayName:'Rectangular Pipes',image:'enq-rectangular-pipes-real.jpg',productType:'MS / SS',processType:'Rectangular Pipes',grade:'IS4923, 202, 304 etc.',specification:'MS / SS rectangular pipes in different sizes, thicknesses and lengths',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Rounds',displayName:'Rounds',image:'enq-rounds-real.jpg',productType:'MS / SS',processType:'Round Bars',grade:'Commercial / IS / SS grades',specification:'Different diameters and standard lengths as required',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Square Bars',displayName:'Square Bars',image:'enq-square-bars-real.jpg',productType:'MS / SS',processType:'Square Bars',grade:'Commercial / IS / SS grades',specification:'Square bars in different sizes and standard lengths as required',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Flat Bars',displayName:'Flat Bars',image:'enq-flat-bars-real.jpg',productType:'MS / SS',processType:'Flat Bars',grade:'Commercial / IS / SS grades',specification:'Flat bars in different widths, thicknesses and standard/custom lengths',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Angles',displayName:'Angles',image:'enq-angles-real.jpg',productType:'MS',processType:'MS Angles',grade:'IS2062, E250, E350 etc.',specification:'Angles in different thicknesses and sizes',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Channel',displayName:'Channel',image:'enq-channel-real.jpg',productType:'MS',processType:'MS Channels',grade:'IS2062, E250, E350 etc.',specification:'Channels in different thicknesses and sizes',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'Beam',displayName:'Beam',image:'enq-beams-real.jpg',productType:'MS',processType:'I / H / NPV Beams',grade:'IS2062, E250, E350 etc.',specification:'I / H / NPV beams for structural applications',rate:'On Request',validUpto:'07 Days',availability:'Pan India'},
{category:'TMT Bars',displayName:'TMT Bars',image:'enq-tmt-real.jpg',productType:'MS',processType:'TMT Bars',grade:'Fe 500 / Fe 550 and as required',specification:'Different diameters and standard lengths as required',rate:'On Request',validUpto:'07 Days',availability:'Pan India'}
];

const HOME_CATEGORIES=[
{title:'Coils',desc:'Hot Rolled / Cold Rolled / Stainless Steel Coils',img:'enq-coils-real.jpg',icon:'coil',link:'enquiry.html?product=Coils'},
{title:'Sheets / Plates',desc:'HR, CR and Stainless Steel Sheets / Plates',img:'enq-sheets-real.jpg',icon:'plates',link:'enquiry.html?product=Sheets'},
{title:'Angles',desc:'MS angles in different thicknesses and sizes',img:'enq-angles-real.jpg',icon:'angle',link:'enquiry.html?product=Angles'},
{title:'Channels & Beams',desc:'MS Channels, I Beams and H Beams for structural use',img:'enq-beams-real.jpg',icon:'channel',link:'enquiry.html?product=Beam'},
{title:'Pipes',desc:'Round, Square and Rectangular Pipes',img:'enq-pipes-real.jpg',icon:'pipes',link:'enquiry.html?product=Pipes'},
{title:'Rounds & Flats',desc:'MS Rounds, Flats and Square Bars',img:'enq-rounds-real.jpg',icon:'pipes',link:'enquiry.html?product=Rounds'}
];

const IMAGE_MIGRATION={
'enq-coils.svg':'enq-coils-real.jpg',
'enq-sheets.svg':'enq-sheets-real.jpg',
'enq-pipes-round.svg':'enq-pipes-real.jpg',
'enq-pipes-square.svg':'enq-pipes-real.jpg',
'enq-pipes-rectangular.svg':'enq-pipes-real.jpg',
'enq-angles.svg':'enq-angles-real.jpg',
'enq-channels.svg':'enq-channel-real.jpg',
'enq-round-bars.svg':'enq-rounds-real.jpg',
'enq-square-bars.svg':'enq-rounds-real.jpg',
'enq-tmt.svg':'enq-tmt-real.jpg',
'enq-pipes-round-real.jpg':'enq-round-pipes-real.jpg',
'enq-pipes-square-real.jpg':'enq-square-pipes-real.jpg',
'enq-pipes-rectangular-real.jpg':'enq-rectangular-pipes-real.jpg',
'enq-channels-real.jpg':'enq-channel-real.jpg',
'enq-round-bars-real.jpg':'enq-rounds-real.jpg',
'enq-square-bars-real.jpg':'enq-rounds-real.jpg',
'product-coils.svg':'enq-coils-real.jpg',
'product-sheets.svg':'enq-sheets-real.jpg',
'product-pipes.svg':'enq-pipes-real.jpg',
'product-angle.svg':'enq-angles-real.jpg',
'product-channel.svg':'enq-channel-real.jpg',
'product-bars.svg':'enq-rounds-real.jpg',
'product-tmt.svg':'enq-tmt-real.jpg'
};
function normalizeRateCards(cards){return (cards||[]).map(x=>({...x,image:IMAGE_MIGRATION[x.image]||x.image||'enq-coils-real.jpg'}))}
function getRateCards(){let stored=JSON.parse(localStorage.getItem('bc_ratecards')||'null');let cards=normalizeRateCards(stored&&stored.length?stored:DEFAULT_RATECARDS);let seen=new Set(cards.map(x=>String(x.displayName||x.category||'').toLowerCase()));DEFAULT_RATECARDS.forEach(d=>{let key=String(d.displayName||d.category||'').toLowerCase();if(!seen.has(key)){cards.push(d);seen.add(key)}});return cards}
function saveRateCards(p){localStorage.setItem('bc_ratecards',JSON.stringify(normalizeRateCards(p)))}
function getSettings(){return {...DEFAULT_SETTINGS,...(JSON.parse(localStorage.getItem('bc_settings')||'{}'))}}
function saveSettings(s){localStorage.setItem('bc_settings',JSON.stringify(s))}
function cleanName(s){return String(s||'').toLowerCase().replace(/&/g,'and').replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')}
function imgPath(file){file=file||'enq-coils-real.jpg';return file.startsWith('assets/')?file:'assets/products/'+file}

function renderBasics(){
 const s=getSettings();
 document.querySelectorAll('[data-phone]').forEach(e=>e.textContent=s.phone);
 document.querySelectorAll('[data-phone2]').forEach(e=>e.textContent=s.phone2);
 document.querySelectorAll('[data-email]').forEach(e=>e.textContent=s.email);
 document.querySelectorAll('[data-website]').forEach(e=>e.textContent=s.website);
 document.querySelectorAll('[data-address]').forEach(e=>e.textContent=s.address);
 document.querySelectorAll('[data-corporate-address]').forEach(e=>e.textContent=s.corporateAddress||s.address);
 document.querySelectorAll('[data-gst-address]').forEach(e=>e.textContent=s.gstAddress||s.address);
 document.querySelectorAll('[data-whatsapp]').forEach(e=>e.textContent=s.whatsapp);
 document.querySelectorAll('[data-working-hours]').forEach(e=>e.textContent=s.workingHours||'Mon - Sat: 9:30 AM - 6:30 PM | Sunday: Closed');
 document.querySelectorAll('[data-call]').forEach(e=>e.href='tel:'+s.phone.replace(/\s/g,''));
 document.querySelectorAll('[data-whatsapp-link]').forEach(e=>e.href='https://wa.me/'+String(s.whatsapp||'').replace(/[^0-9]/g,''));
 document.querySelectorAll('[data-website-link]').forEach(e=>{e.href=(String(s.website||'').startsWith('http')?s.website:'https://'+s.website);});
}


function productIcon(type){
 const icons={
  coil:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="25" cy="32" r="17"></circle><circle cx="25" cy="32" r="7"></circle><circle cx="43" cy="32" r="17"></circle><circle cx="43" cy="32" r="7"></circle></svg>`,
  plates:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 26l19-9 19 9-19 9-19-9z"></path><path d="M13 36l19 9 19-9"></path><path d="M13 45l19 9 19-9"></path></svg>`,
  angle:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 14v34h30"></path><path d="M27 22v17h21"></path><path d="M18 48l8-8"></path><path d="M30 48l8-8"></path><path d="M42 48l8-8"></path></svg>`,
  channel:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 16h30v10H28v12h19v10H17V16z"></path><path d="M20 52h28"></path><path d="M25 56h18"></path></svg>`,
  pipes:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="20" cy="20" r="8"></circle><circle cx="36" cy="20" r="8"></circle><circle cx="52" cy="20" r="8"></circle><circle cx="20" cy="38" r="8"></circle><circle cx="36" cy="38" r="8"></circle><circle cx="52" cy="38" r="8"></circle></svg>`
 };
 return icons[type] || icons.coil;
}

function renderHome(){
 let el=document.getElementById('featuredProducts'); if(!el)return;
 el.innerHTML=HOME_CATEGORIES.map(x=>`<a class="home-cat-card" data-product="${x.title}" href="${x.link}" title="Open ${x.title} details" aria-label="Open ${x.title} product details"><div class="home-cat-visual ${x.icon==='angle'?'home-angle-visual':''}"><img src="assets/products/${x.img}" alt="${x.title}" loading="eager"></div><span class="home-icon" aria-hidden="true">${productIcon(x.icon)}</span><div class="home-cat-body"><h3>${x.title}</h3><p>${x.desc}</p><span class="card-arrow">↗</span></div></a>`).join('');
 const shell=el.closest('.segment-carousel-shell');
 const prev=shell?.querySelector('.segment-prev'), next=shell?.querySelector('.segment-next');
 const step=()=>Math.max(280,el.clientWidth*.82);
 if(prev)prev.onclick=()=>el.scrollBy({left:-step(),behavior:'smooth'});
 if(next)next.onclick=()=>el.scrollBy({left:step(),behavior:'smooth'});
 const update=()=>{if(!prev||!next)return;prev.disabled=el.scrollLeft<8;next.disabled=el.scrollLeft+el.clientWidth>=el.scrollWidth-8;};
 el.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update); setTimeout(update,80);
}

function renderProducts(){
 const wrap=document.getElementById('allProducts'); if(!wrap)return;
 const groups=[
  {id:'coils',title:'Coils',desc:'Hot Rolled, Cold Rolled and Stainless Steel coils for industrial procurement.',items:['HR Coil','CR Coil','SS Coil']},
  {id:'plates-sheets',title:'Sheets / Plates',desc:'HR, CR and Stainless Steel Sheets / Plates.',items:['HR Sheets / Plates','CR Sheet','SS Sheets / Plates','SS Slab']},
  {id:'angles-flats',title:'Angles & Flats',desc:'MS angles and flats in standard and requirement-specific sizes.',items:['Angle','Flat']},
  {id:'channels-beams',title:'Channels & Beams',desc:'MS Channels, I / H / NPV Beams for fabrication, construction and engineering use.',items:['Channel','I / H / NPV Beams']},
  {id:'pipes',title:'MS Pipes & Hollow Sections',desc:'MS Round / Square / Rectangular Pipes and Hollow Sections, plus stainless steel pipe options.',items:['MS Round / Square / Rectangular Hollow Pipe','SS Pipe']},
  {id:'bars-tmt',title:'Bars & TMT',desc:'Round bars, square bars and TMT bars in standard sizes and grades.',items:['Round Bar','Square Bar','SS Round Bar','TMT']}
 ];
 const byName=Object.fromEntries(DEFAULT_CATALOG.map(x=>[x.name,x]));
 byName['HR Sheets / Plates']={cat:'Mild Steel (MS)',name:'HR Sheets / Plates',type:'Hot Rolled Sheets / Plates',thickness:'1.6 - 60 mm',width:'900 - 1850 mm / as per requirement',length:'1500 - 12000 mm / custom',grade:'Grade 1 (IS10748) | Grade 2 (IS1079DD) | E250/E350 (IS2062) | SAPH440 | BSK 46 | IS1079'};
 byName['SS Sheets / Plates']={cat:'Stainless Steel (SS)',name:'SS Sheets / Plates',type:'Stainless Steel Sheets / Plates',thickness:'0.50 - 80 mm',width:'1250 mm / as per requirement',length:'Blank / Sheet / Plate',grade:'304 | JT | SDM | DD | CU | J4 | JSL-AUS'};
 byName['I / H / NPV Beams']={cat:'Structural Steel',name:'I / H / NPV Beams',type:'I / H / NPV Beams',thickness:'As per section',width:'100x50 | 125x70 | 150x75 | 175x85 | 200x100 | 225x110 | 250x125 | 300x140 | 350x140 | 400x140 | 450x150 | 500x180 | 550x190 | 600x210 and NPV sections',length:'6 m - 12 m',grade:'IS2062, E250, E350'};
 byName['MS Round / Square / Rectangular Hollow Pipe']={cat:'Structural Steel',name:'MS Round / Square / Rectangular Hollow Pipe',type:'MS Pipes & Hollow Sections',thickness:'As per pipe / section',width:'Round, Square and Rectangular sections',length:'Standard / Custom Length',grade:'MS / Structural Pipe grades'};
 wrap.innerHTML=groups.map(g=>`<section class="catalog-section" id="${g.id}"><div class="catalog-head"><span>Product Segment</span><h2>${g.title}</h2><p>${g.desc}</p><a class="btn btn-outline segment-enquiry" href="enquiry.html?segment=${encodeURIComponent(g.title)}">Check Prices & Enquiry →</a></div><div class="catalog-list">${g.items.map(n=>byName[n]).filter(Boolean).map(x=>`<article class="catalog-row" id="${cleanName(x.name)}"><div class="catalog-name"><b>${x.name}</b><small>${x.cat}</small><em>${x.type}</em></div><div><span>Thickness / Size</span><p>${x.thickness}</p></div><div><span>Width / Section</span><p>${x.width}</p></div><div><span>Length</span><p>${x.length}</p></div><div class="catalog-grade"><span>Grade</span><p>${x.grade}</p></div></article>`).join('')}</div></section>`).join('')+
 `<section class="catalog-note"><b>Customisation:</b> blank sizes, slitting, cutting and sizing can be provided as per requirement, subject to availability and commercial confirmation.</section>`;
 const filter=document.getElementById('catFilter');
 if(filter){filter.innerHTML='<option value="all">All Product Groups</option>'+groups.map(g=>`<option value="${g.id}">${g.title}</option>`).join('');filter.onchange=()=>{document.querySelectorAll('.catalog-section').forEach(sec=>{sec.style.display=(filter.value==='all'||filter.value===sec.id)?'block':'none'})}}
}

function rateCardHTML(x,i){
 return `<article class="rate-card" data-product="${x.displayName}"><div class="rate-visual"><img src="${imgPath(x.image)}" alt="${x.displayName}" loading="lazy"></div><div class="rate-body"><h3>${x.displayName}</h3><div class="spec-grid"><div><span>Product Type</span><b>${x.productType||''}</b></div><div><span>Type</span><b>${x.processType||''}</b></div><div><span>Grade</span><b>${x.grade||''}</b></div><div><span>Specification</span><b>${x.specification||''}</b></div></div><div class="price-line"><strong>${x.rate||'On Request'}</strong><small>Valid up to: ${x.validUpto||'07 Days'}</small></div><button class="btn btn-outline wide enqPick" data-product="${x.displayName}">Create Enquiry →</button></div></article>`;
}

function renderEnquiry(){
 const cards=getRateCards();
 let grid=document.getElementById('enquiryProducts'); if(grid)grid.innerHTML=cards.map(rateCardHTML).join('');
 let formBox=document.querySelector('.formbox');
 let sel=document.getElementById('productSelect');
 if(sel){sel.innerHTML='<option value="">Select Product</option>'+cards.map(x=>`<option>${x.displayName}</option>`).join('');}
 const showForm=(product)=>{
   if(sel && product) sel.value=product;
   if(formBox){formBox.classList.add('active'); formBox.scrollIntoView({behavior:'smooth',block:'start'});}
 };
 const q=new URLSearchParams(location.search).get('product');
 if(q) setTimeout(()=>showForm(q),50);
 document.querySelectorAll('.enqPick').forEach(btn=>btn.onclick=()=>showForm(btn.dataset.product));
 const close=document.getElementById('closeEnqForm'); if(close) close.onclick=()=>formBox?.classList.remove('active');
 let form=document.getElementById('enqForm'); if(form)form.onsubmit=e=>{
   e.preventDefault();
   let s=getSettings();
   let data=Object.fromEntries(new FormData(form).entries());
   let rows=[
     ['Name',data.name||''],['Company',data.company||''],['GST No.',data.gst||''],['City / Delivery Location',data.city||''],
     ['Mobile',data.mobile||''],['Email',data.email||''],['Product',data.product||''],['Requirement / Specifications',data.requirement||'']
   ];
   let table=rows.map(r=>`${r[0]}: ${r[1]}`).join('%0A');
   let msg=`Product Enquiry - Buy Commodity%0A%0A${table}%0A%0A---%0AThis enquiry was generated from the Buy Commodity website.`;
   location.href=`mailto:${encodeURIComponent(s.email)}?subject=${encodeURIComponent('Product Enquiry - '+(data.product||''))}&body=${msg}`;
 }
}

function admin(){
 let login=document.getElementById('loginBox'),panel=document.getElementById('adminPanel'); if(!login)return;
 function show(){login.style.display='none';panel.style.display='block';drawAdmin()}
 if(sessionStorage.getItem('bc_admin')==='1')show();
 document.getElementById('loginBtn').onclick=()=>{if(document.getElementById('uid').value==='admin'&&document.getElementById('pwd').value==='BCSPL@2026'){sessionStorage.setItem('bc_admin','1');show()}else alert('Invalid login')};
}

function drawAdmin(){
 let rows=getRateCards(),s=getSettings();
 ['phone','phone2','email','website','workingHours','address','corporateAddress','gstAddress','whatsapp'].forEach(k=>{let e=document.getElementById('set_'+k);if(e)e.value=s[k]||''});
 let imageHelp=document.getElementById('imageOptions'); if(imageHelp) imageHelp.innerHTML=IMAGE_OPTIONS.map(o=>`<span><img src="assets/products/${o.file}" alt="${o.label}">${o.label}<code>${o.file}</code></span>`).join('');
 let tbody=document.getElementById('adminRows'); if(!tbody)return;
 tbody.innerHTML=rows.map((p,i)=>`<tr><td>${i+1}</td>${['category','displayName','productType','processType','grade','specification','rate','validUpto','availability'].map(k=>`<td><input data-i="${i}" data-k="${k}" value="${String(p[k]||'').replace(/"/g,'&quot;')}"></td>`).join('')}<td><select data-i="${i}" data-k="image">${IMAGE_OPTIONS.map(o=>`<option value="${o.file}" ${p.image===o.file?'selected':''}>${o.label}</option>`).join('')}</select></td><td><button onclick="deleteRow(${i})">Delete</button></td></tr>`).join('')
}
window.deleteRow=i=>{let p=getRateCards();p.splice(i,1);saveRateCards(p);drawAdmin()}
function rateCardsFromInputs(){let p=getRateCards();document.querySelectorAll('#adminRows input,#adminRows select').forEach(inp=>p[inp.dataset.i][inp.dataset.k]=inp.value);return p}
function parseCsv(text){let rows=[],row=[],cur='',q=false;for(let i=0;i<text.length;i++){let c=text[i],n=text[i+1];if(c==='"'){if(q&&n==='"'){cur+='"';i++}else q=!q}else if(c===','&&!q){row.push(cur);cur=''}else if((c==='\n'||c==='\r')&&!q){if(cur||row.length){row.push(cur);rows.push(row);row=[];cur=''} if(c==='\r'&&n==='\n')i++}else cur+=c} if(cur||row.length){row.push(cur);rows.push(row)} let cols=rows.shift()||[];return rows.filter(r=>r.length).map(r=>Object.fromEntries(cols.map((c,i)=>[c,r[i]||'']))) }
function bindAdmin(){
 if(!document.getElementById('adminPanel'))return;
 document.getElementById('saveAll').onclick=()=>{let p=rateCardsFromInputs();saveRateCards(p);let s={};['phone','phone2','email','website','workingHours','address','corporateAddress','gstAddress','whatsapp'].forEach(k=>{let e=document.getElementById('set_'+k); if(e) s[k]=e.value;});saveSettings(s);alert('Saved in this browser. Download Excel/JSON for backup.')};
 document.getElementById('addRow').onclick=()=>{let p=getRateCards();p.unshift({category:'New Product',displayName:'New Product',image:'enq-coils-real.jpg',productType:'MS / SS',processType:'',grade:'',specification:'',rate:'On Request',validUpto:'07 Days',availability:''});saveRateCards(p);drawAdmin()};
 document.getElementById('exportJson').onclick=()=>{download('buycommodity-ratecards-backup.json',JSON.stringify({settings:getSettings(),rateCards:rateCardsFromInputs()},null,2),'application/json')};
 document.getElementById('exportCsv').onclick=()=>{let p=rateCardsFromInputs(),cols=['category','displayName','image','productType','processType','grade','specification','rate','validUpto','availability'];if(window.XLSX){let wb=XLSX.utils.book_new();let ws=XLSX.utils.json_to_sheet(p,{header:cols});XLSX.utils.book_append_sheet(wb,ws,'Enquiry_Rates');XLSX.writeFile(wb,'buycommodity-enquiry-rates.xlsx');}else{let csv=[cols.join(',')].concat(p.map(r=>cols.map(c=>'"'+String(r[c]||'').replace(/"/g,'""')+'"').join(','))).join('\n');download('buycommodity-enquiry-rates.csv',csv,'text/csv')}};
 document.getElementById('importFile').onchange=e=>{let f=e.target.files[0]; if(!f)return; let r=new FileReader(); r.onload=()=>{try{let lower=f.name.toLowerCase(); if(lower.endsWith('.json')){let o=JSON.parse(r.result); if(o.rateCards)saveRateCards(o.rateCards); if(o.products)saveRateCards(o.products); if(o.settings)saveSettings(o.settings);} else if((lower.endsWith('.xlsx')||lower.endsWith('.xls'))&&window.XLSX){let data=new Uint8Array(r.result);let wb=XLSX.read(data,{type:'array'});let ws=wb.Sheets[wb.SheetNames[0]];let rows=XLSX.utils.sheet_to_json(ws,{defval:''});saveRateCards(rows);} else {saveRateCards(parseCsv(r.result));} drawAdmin();alert('Imported successfully. Click Save Changes to confirm settings if needed.')}catch(err){console.error(err);alert('Could not import file. Please use the downloaded Excel/CSV/JSON format.')}}; if(f.name.toLowerCase().endsWith('.xlsx')||f.name.toLowerCase().endsWith('.xls'))r.readAsArrayBuffer(f); else r.readAsText(f)};
 document.getElementById('resetData').onclick=()=>{if(confirm('Reset enquiry rate cards and contact details to defaults?')){localStorage.removeItem('bc_ratecards');localStorage.removeItem('bc_settings');drawAdmin()}}
}

function searchableItems(){
 const rateItems=getRateCards().map(x=>({
  title:x.displayName||x.category||'Product',
  group:x.category||'',
  type:x.productType||'',
  process:x.processType||'',
  grade:x.grade||'',
  spec:x.specification||'',
  rate:x.rate||'On Request',
  valid:x.validUpto||'07 Days',
  availability:x.availability||'',
  link:'enquiry.html?product='+encodeURIComponent(x.displayName||x.category||''),
  image:x.image||'enq-coils-real.jpg'
 }));
 return rateItems;
}
function renderSearchResults(q){
 const box=document.getElementById('homeSearchResults'); if(!box)return;
 q=String(q||'').trim().toLowerCase();
 if(!q){box.className='hero-search-results'; box.innerHTML=''; return;}
 const words=q.split(/\s+/).filter(Boolean);
 const found=searchableItems().map(item=>{
  const hay=[item.title,item.group,item.type,item.process,item.grade,item.spec,item.rate,item.valid,item.availability].join(' ').toLowerCase();
  const score=words.reduce((a,w)=>a+(hay.includes(w)?1:0),0)+(hay.includes(q)?2:0);
  return {item,score};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,10).map(x=>x.item);
 box.className='hero-search-results active';
 if(!found.length){
  box.innerHTML='<div class="search-no-result">No exact match found. Please share your requirement and our team will help you identify the right product. <a href="enquiry.html">Send Enquiry →</a></div>';
  return;
 }
 box.innerHTML=found.map(x=>`<a class="search-product-tile" href="${x.link}"><div class="search-product-img"><img src="${imgPath(x.image)}" alt="${x.title}" loading="lazy"></div><div class="search-product-body"><h4>${x.title}</h4><p>${x.type||x.group||'Product'}</p><small>${x.rate||'On Request'} • Valid: ${x.valid||'07 Days'}</small><span>Enquire →</span></div></a>`).join('');
}
function bindHomeSearch(){
 const input=document.getElementById('homeSearch'); if(!input)return;
 const btn=document.getElementById('homeSearchBtn'), clear=document.getElementById('homeSearchClear');
 const run=()=>renderSearchResults(input.value);
 input.addEventListener('input',()=>{ if(input.value.trim().length>=2) run(); else renderSearchResults(''); });
 input.addEventListener('keydown',e=>{ if(e.key==='Enter'){e.preventDefault();run();} });
 if(btn)btn.onclick=run;
 if(clear)clear.onclick=()=>{input.value='';renderSearchResults('');input.focus();};
 document.querySelectorAll('#homeSearchChips button').forEach(chip=>chip.onclick=()=>{input.value=chip.dataset.q||chip.textContent;run();});
}

function download(n,t,type){let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type}));a.download=n;a.click()}


/* FINAL MOBILE-FIRST RATE TABLE IMPLEMENTATION */
const DEFAULT_RATE_ROWS = [
 {productId:'HR-SHEETS',category:'Sheets',displayName:'HR Sheets',image:'enq-sheets-real.jpg',processType:'HR',grade:'IS 10748 / IS 2062',specification:'Thickness, width and sheet weight as required',size:'2.5 - 10.0 mm',rate:'54000',unit:'₹/MT',validUpto:'07 Days',remarks:'Ex-works'},
 {productId:'HR-SHEETS',category:'Sheets',displayName:'HR Sheets',image:'enq-sheets-real.jpg',processType:'HR',grade:'IS 10748 / IS 2062',specification:'Thickness, width and sheet weight as required',size:'1.6 mm',rate:'61000',unit:'₹/MT',validUpto:'07 Days',remarks:'Subject to stock'},
 {productId:'HR-SHEETS',category:'Sheets',displayName:'HR Sheets',image:'enq-sheets-real.jpg',processType:'HR',grade:'IS 10748 / IS 2062',specification:'Thickness, width and sheet weight as required',size:'2.0 mm',rate:'62000',unit:'₹/MT',validUpto:'07 Days',remarks:'Ex-works'},
 {productId:'CR-SHEETS',category:'Sheets',displayName:'CR Sheets',image:'enq-sheets-real.jpg',processType:'CR',grade:'CR2 / CR3 / CR4 / IS 513',specification:'Thickness, width, length and blank size as required',size:'1.0 - 2.0 mm',rate:'63000',unit:'₹/MT',validUpto:'07 Days',remarks:'Ex-works'},
 {productId:'COILS',category:'Coils',displayName:'Coils',image:'enq-coils-real.jpg',processType:'HR / CR / SS',grade:'IS10748, IS1079, CR2, CR3, SS304 etc.',specification:'Thickness, width and coil weight as required',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'PIPES',category:'Pipes',displayName:'Pipes',image:'enq-pipes-real.jpg',processType:'Round / Square',grade:'IS1239, IS4923, 202, 304 etc.',specification:'Round and square pipes in different sizes, thicknesses and lengths',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'ROUND-PIPES',category:'Pipes',displayName:'Round Pipes',image:'enq-round-pipes-real.jpg',processType:'Round Pipes',grade:'IS1239 / IS4923',specification:'MS round pipes in different sizes and thicknesses',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'SQUARE-PIPES',category:'Pipes',displayName:'Square Pipes',image:'enq-square-pipes-real.jpg',processType:'Square Pipes',grade:'IS4923',specification:'MS square pipes in different sizes and thicknesses',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'RECT-PIPES',category:'Pipes',displayName:'Rectangular Pipes',image:'enq-rectangular-pipes-real.jpg',processType:'Rectangular Pipes',grade:'IS4923',specification:'MS rectangular pipes in different sizes and thicknesses',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'ROUNDS',category:'Bars',displayName:'Rounds',image:'enq-rounds-real.jpg',processType:'Round Bars',grade:'Commercial / IS grades',specification:'Different diameters and standard lengths as required',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'SQUARE-BARS',category:'Bars',displayName:'Square Bars',image:'enq-square-bars-real.jpg',processType:'Square Bars',grade:'Commercial / IS grades',specification:'Square bars in different sizes and standard lengths',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'FLAT-BARS',category:'Bars',displayName:'Flat Bars',image:'enq-flat-bars-real.jpg',processType:'Flat Bars',grade:'Commercial / IS grades',specification:'Flat bars in different widths, thicknesses and lengths',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'ANGLES',category:'Structural',displayName:'Angles',image:'enq-angles-real.jpg',processType:'MS Angles',grade:'IS2062, E250, E350 etc.',specification:'Angles in different thicknesses and sizes',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'CHANNELS',category:'Structural',displayName:'Channel',image:'enq-channel-real.jpg',processType:'MS Channels',grade:'IS2062, E250, E350 etc.',specification:'Channels in different thicknesses and sizes',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'BEAMS',category:'Structural',displayName:'Beam',image:'enq-beams-real.jpg',processType:'I / H / NPV Beams',grade:'IS2062, E250, E350 etc.',specification:'I / H / NPV beams for structural applications',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'},
 {productId:'TMT',category:'TMT',displayName:'TMT Bars',image:'enq-tmt-real.jpg',processType:'TMT Bars',grade:'Fe 500 / Fe 550',specification:'Different diameters and standard lengths as required',size:'Standard sizes',rate:'On Request',unit:'',validUpto:'07 Days',remarks:'Subject to availability'}
];
function toRateRows(rows){
 const src=(rows&&rows.length)?rows:null;
 let out=(src||DEFAULT_RATE_ROWS).flatMap(x=>{
  if(Array.isArray(x.rates)) return x.rates.map(r=>({...x,...r,productId:x.productId||cleanName(x.displayName||x.category).toUpperCase()}));
  return [{...x,productId:x.productId||x['Product ID']||cleanName(x.displayName||x.category).toUpperCase(),size:x.size||x['Size / Thickness']||x.thickness||'',unit:x.unit||x.Unit||'₹/MT',remarks:x.remarks||x.Remarks||x.availability||''}];
 });
 return out.map(x=>({
  productId:x.productId||x['Product ID']||cleanName(x.displayName||x['Product Name']||x.category).toUpperCase(),
  category:x.category||x.Category||'', displayName:x.displayName||x['Product Name']||x.category||'Product',
  image:IMAGE_MIGRATION[x.image]||IMAGE_MIGRATION[x['Image Key']]||x.image||x['Image Key']||'enq-coils-real.jpg',
  processType:x.processType||x.Type||x.type||'', grade:x.grade||x['Grade Summary']||'', specification:x.specification||x.Specification||'',
  size:x.size||x['Size / Thickness']||'', rate:x.rate||x.Rate||'On Request', unit:x.unit||x.Unit||'₹/MT',
  validUpto:x.validUpto||x['Valid Up To']||'07 Days', remarks:x.remarks||x.Remarks||x.availability||''
 }));
}
function getRateCards(){let stored=JSON.parse(localStorage.getItem('bc_ratecards')||'null');return toRateRows(stored&&stored.length?stored:DEFAULT_RATE_ROWS)}
function saveRateCards(p){localStorage.setItem('bc_ratecards',JSON.stringify(toRateRows(p)))}
function groupRateRows(rows=getRateCards()){
 const map=new Map();
 rows.forEach(r=>{let id=r.productId||cleanName(r.displayName).toUpperCase(); if(!map.has(id)) map.set(id,{...r,rates:[]}); let g=map.get(id); ['category','displayName','image','processType','grade','specification'].forEach(k=>{if(r[k]&&!g[k])g[k]=r[k]}); g.rates.push({size:r.size,grade:r.grade,rate:r.rate,unit:r.unit,validUpto:r.validUpto,remarks:r.remarks});});
 return [...map.values()];
}
function fmtRate(r){return String(r||'').toLowerCase().includes('request')?'On Request':('₹ '+String(r).replace(/^₹\s*/,'').replace(/\/\s?mt$/i,'') );}
function ratesTable(rows,limit){let visible=limit?rows.slice(0,limit):rows;return `<table class="mini-rates"><thead><tr><th>Size</th><th>Grade</th><th>Rate</th></tr></thead><tbody>${visible.map(r=>`<tr><td><span class="cell-clamp">${r.size||'As required'}</span></td><td><span class="cell-clamp">${r.grade||'As required'}</span></td><td><span class="cell-clamp rate-cell"><b>${fmtRate(r.rate||'On Request')}</b> ${r.unit||''}</span></td></tr>`).join('')}</tbody></table>`}
function rateCardHTML(x,i){const rates=x.rates||[{size:x.size,grade:x.grade,rate:x.rate,unit:x.unit,validUpto:x.validUpto,remarks:x.remarks}];const more=rates.length>1?`<button class="viewRates" type="button" data-i="${i}">+ ${rates.length-1} more rates · View All Rates ↓</button>`:`<span class="viewRates viewRates-placeholder" aria-hidden="true">&nbsp;</span>`;return `<article class="rate-card compact-rate-card rate-card-v2" data-product="${x.displayName}"><div class="rate-top"><div class="rate-visual"><img src="${imgPath(x.image)}" alt="${x.displayName}" loading="lazy"></div><div class="rate-summary"><h3>${x.displayName}</h3><div class="rate-meta"><b>${x.processType||''}</b><span>${x.specification||''}</span></div></div></div><div class="rate-table-block">${ratesTable(rates,1)}${more}<div class="all-rates" id="rates_${i}"><div class="all-rates-head"><b>Full Rate List</b><button type="button" class="viewLess" data-i="${i}">View Less ↑</button></div>${ratesTable(rates,0)}</div></div><button class="btn btn-outline wide enqPick" data-product="${x.displayName}">Create Enquiry →</button></article>`}
function renderEnquiry(){
 const groups=groupRateRows(); let grid=document.getElementById('enquiryProducts'); if(grid){grid.innerHTML=groups.map(rateCardHTML).join('')+`<div class="custom-requirement-note"><div><b>Can’t find your required size or grade?</b><p>For different size specifications, custom requirements or bulk orders, please contact our team.</p></div><a href="index.html#contact">Contact Us →</a></div>`;}
 let formBox=document.querySelector('.formbox'); let sel=document.getElementById('productSelect'); if(sel){sel.innerHTML='<option value="">Select Product</option>'+groups.map(x=>`<option>${x.displayName}</option>`).join('');}
 document.querySelectorAll('.viewRates').forEach(btn=>btn.onclick=()=>{document.getElementById('rates_'+btn.dataset.i)?.classList.add('active');btn.closest('.rate-card-v2')?.classList.add('expanded');btn.style.display='none'});
 document.querySelectorAll('.viewLess').forEach(btn=>btn.onclick=()=>{document.getElementById('rates_'+btn.dataset.i)?.classList.remove('active');btn.closest('.rate-card-v2')?.classList.remove('expanded');let b=document.querySelector(`.viewRates[data-i="${btn.dataset.i}"]`); if(b)b.style.display='inline-flex'});
 const showForm=(product)=>{ if(sel&&product) sel.value=product; if(formBox){formBox.classList.add('active'); formBox.scrollIntoView({behavior:'smooth',block:'start'});} };
 const q=new URLSearchParams(location.search).get('product'); if(q) setTimeout(()=>showForm(q),50);
 document.querySelectorAll('.enqPick').forEach(btn=>btn.onclick=()=>showForm(btn.dataset.product)); const close=document.getElementById('closeEnqForm'); if(close) close.onclick=()=>formBox?.classList.remove('active');
 let form=document.getElementById('enqForm'); if(form)form.onsubmit=e=>{e.preventDefault();let s=getSettings();let data=Object.fromEntries(new FormData(form).entries());let rows=[['Name',data.name||''],['Company',data.company||''],['GST No.',data.gst||''],['City / Delivery Location',data.city||''],['Mobile',data.mobile||''],['Email',data.email||''],['Product',data.product||''],['Requirement / Specifications',data.requirement||'']];let table=rows.map(r=>`${r[0]}: ${r[1]}`).join('%0A');let msg=`Product Enquiry - Buy Commodity%0A%0A${table}%0A%0A---%0AThis enquiry was generated from the Buy Commodity website.`;location.href=`mailto:${encodeURIComponent(s.email)}?subject=${encodeURIComponent('Product Enquiry - '+(data.product||''))}&body=${msg}`;}
}
function drawAdmin(){let rows=getRateCards(),s=getSettings();['phone','phone2','email','website','workingHours','address','corporateAddress','gstAddress','whatsapp'].forEach(k=>{let e=document.getElementById('set_'+k);if(e)e.value=s[k]||''});let imageHelp=document.getElementById('imageOptions'); if(imageHelp) imageHelp.innerHTML=IMAGE_OPTIONS.map(o=>`<span><img src="assets/products/${o.file}" alt="${o.label}">${o.label}<code>${o.file}</code></span>`).join('');let tbody=document.getElementById('adminRows'); if(!tbody)return;const keys=['productId','category','displayName','processType','grade','specification','size','rate','unit','validUpto','remarks'];tbody.innerHTML=rows.map((p,i)=>`<tr><td>${i+1}</td>${keys.map(k=>`<td><input data-i="${i}" data-k="${k}" value="${String(p[k]||'').replace(/"/g,'&quot;')}"></td>`).join('')}<td><select data-i="${i}" data-k="image">${IMAGE_OPTIONS.map(o=>`<option value="${o.file}" ${p.image===o.file?'selected':''}>${o.label}</option>`).join('')}</select></td><td><button onclick="deleteRow(${i})">Delete</button></td></tr>`).join('')}
function rateCardsFromInputs(){let p=getRateCards();document.querySelectorAll('#adminRows input,#adminRows select').forEach(inp=>p[inp.dataset.i][inp.dataset.k]=inp.value);return p}
function bindAdmin(){if(!document.getElementById('adminPanel'))return;document.getElementById('saveAll').onclick=()=>{let p=rateCardsFromInputs();saveRateCards(p);let s={};['phone','phone2','email','website','workingHours','address','corporateAddress','gstAddress','whatsapp'].forEach(k=>{let e=document.getElementById('set_'+k); if(e) s[k]=e.value;});saveSettings(s);alert('Saved in this browser. Download Excel/JSON for backup.')};document.getElementById('addRow').onclick=()=>{let p=getRateCards();p.unshift({productId:'NEW-PRODUCT',category:'New',displayName:'New Product',image:'enq-coils-real.jpg',processType:'',grade:'',specification:'',size:'',rate:'On Request',unit:'₹/MT',validUpto:'07 Days',remarks:''});saveRateCards(p);drawAdmin()};document.getElementById('exportJson').onclick=()=>download('buycommodity-ratecards-backup.json',JSON.stringify({settings:getSettings(),rateCards:rateCardsFromInputs()},null,2),'application/json');document.getElementById('exportCsv').onclick=()=>{let p=rateCardsFromInputs(),cols=['productId','category','displayName','image','processType','grade','specification','size','rate','unit','validUpto','remarks'];if(window.XLSX){let wb=XLSX.utils.book_new();let ws=XLSX.utils.json_to_sheet(p,{header:cols});XLSX.utils.book_append_sheet(wb,ws,'Enquiry_Rates');XLSX.writeFile(wb,'buycommodity-enquiry-rates.xlsx')}else{let csv=[cols.join(',')].concat(p.map(r=>cols.map(c=>'"'+String(r[c]||'').replace(/"/g,'""')+'"').join(','))).join('\n');download('buycommodity-enquiry-rates.csv',csv,'text/csv')}};document.getElementById('importFile').onchange=e=>{let f=e.target.files[0]; if(!f)return; let r=new FileReader(); r.onload=()=>{try{let lower=f.name.toLowerCase(); if(lower.endsWith('.json')){let o=JSON.parse(r.result); if(o.rateCards)saveRateCards(o.rateCards); if(o.products)saveRateCards(o.products); if(o.settings)saveSettings(o.settings)} else if((lower.endsWith('.xlsx')||lower.endsWith('.xls'))&&window.XLSX){let data=new Uint8Array(r.result);let wb=XLSX.read(data,{type:'array'});let ws=wb.Sheets[wb.SheetNames[0]];let rows=XLSX.utils.sheet_to_json(ws,{defval:''});saveRateCards(rows)} else {saveRateCards(parseCsv(r.result))} drawAdmin();alert('Imported successfully. Repeated Product ID rows will appear as one product card with multiple rates.')}catch(err){console.error(err);alert('Could not import file. Please use the downloaded Excel/CSV/JSON format.')}}; if(f.name.toLowerCase().endsWith('.xlsx')||f.name.toLowerCase().endsWith('.xls'))r.readAsArrayBuffer(f); else r.readAsText(f)};document.getElementById('resetData').onclick=()=>{if(confirm('Reset enquiry rate cards and contact details to defaults?')){localStorage.removeItem('bc_ratecards');localStorage.removeItem('bc_settings');drawAdmin()}}}
function searchableItems(){return groupRateRows().map(x=>({title:x.displayName||x.category||'Product',group:x.category||'',type:x.processType||'',process:x.processType||'',grade:x.grade||'',spec:x.specification||'',rate:(x.rates&&x.rates[0]&&x.rates[0].rate)||'On Request',valid:(x.rates&&x.rates[0]&&x.rates[0].validUpto)||'07 Days',availability:x.remarks||'',link:'enquiry.html?product='+encodeURIComponent(x.displayName||x.category||''),image:x.image||'enq-coils-real.jpg'}))}



/* SUPABASE LIVE BACKEND OVERRIDE - Version 1.0 */
function bcHasSupabase(){ return !!window.supabaseClient; }
function bcCleanId(v){ return String(v||'PRODUCT').trim().toUpperCase().replace(/[^A-Z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'PRODUCT'; }
function bcProductPayload(row, idx){
  return {
    product_id: row.productId || row.product_id || bcCleanId(row.displayName || row.category),
    product_name: row.displayName || row.product_name || row.name || 'Product',
    category: row.category || '',
    image_key: row.image || row.image_key || 'enq-coils-real.jpg',
    display_order: idx + 1,
    is_active: true
  };
}
function bcRatePayload(row, idx){
  const p = bcProductPayload(row, idx);
  return {
    product_id: p.product_id,
    type: row.processType || row.productType || row.type || '',
    grade: row.grade || '',
    specification: row.specification || '',
    size_thickness: row.size || row.size_thickness || '',
    rate: row.rate || 'On Request',
    unit: row.unit || '₹/MT',
    valid_upto: row.validUpto || row.valid_upto || '07 Days',
    remarks: row.remarks || '',
    display_order: idx + 1,
    is_active: true
  };
}
function bcRowsFromDb(products, rates){
  const byId = new Map((products||[]).map(p=>[p.product_id,p]));
  const rows = (rates||[]).map(r=>{
    const p = byId.get(r.product_id) || {};
    return {
      productId: r.product_id || p.product_id || '',
      category: p.category || r.category || '',
      displayName: p.product_name || r.product_name || r.display_name || r.product_id || 'Product',
      image: p.image_key || r.image_key || 'enq-coils-real.jpg',
      processType: r.type || r.product_type || r.process_type || '',
      grade: r.grade || '',
      specification: r.specification || '',
      size: r.size_thickness || r.size || '',
      rate: r.rate || 'On Request',
      unit: r.unit || '₹/MT',
      validUpto: r.valid_upto || r.validUpto || '07 Days',
      remarks: r.remarks || ''
    };
  });
  return rows.length ? rows : null;
}
async function bcLoadRatesFromSupabase(){
  if(!bcHasSupabase()) return false;
  try{
    let pr = await supabaseClient.from('products').select('*');
    if(pr.error) throw pr.error;
    let rr = await supabaseClient.from('product_rates').select('*');
    if(rr.error) throw rr.error;
    let products=(pr.data||[]).filter(x=>x.is_active!==false).sort((a,b)=>(a.display_order||0)-(b.display_order||0));
    let rates=(rr.data||[]).filter(x=>x.is_active!==false).sort((a,b)=>(a.display_order||0)-(b.display_order||0));
    const rows=bcRowsFromDb(products,rates);
    if(rows && rows.length){ localStorage.setItem('bc_ratecards', JSON.stringify(rows)); return true; }
  }catch(e){ console.error('Supabase load failed:', e); }
  return false;
}
async function bcSaveSettingsToSupabase(settings){
  if(!bcHasSupabase()) return;
  try{
    const rows = Object.entries(settings).map(([k,v])=>({setting_key:k, setting_value:String(v||'')}));
    const res = await supabaseClient.from('site_settings').upsert(rows, {onConflict:'setting_key'});
    if(res.error) console.warn('Settings save skipped:', res.error.message);
  }catch(e){ console.warn('Settings save skipped:', e.message); }
}
async function bcLoadSettingsFromSupabase(){
  if(!bcHasSupabase()) return false;
  try{
    const res = await supabaseClient.from('site_settings').select('*');
    if(res.error) throw res.error;
    const s={};
    (res.data||[]).forEach(r=>{ if(r.setting_key) s[r.setting_key]=r.setting_value; });
    if(Object.keys(s).length){ localStorage.setItem('bc_settings', JSON.stringify({...getSettings(),...s})); return true; }
  }catch(e){ console.warn('Settings load skipped:', e.message); }
  return false;
}
async function bcSaveRatesToSupabase(rows){
  if(!bcHasSupabase()) throw new Error('Supabase client is not loaded. Open through VS Code Live Server, not file://');
  const normalized = toRateRows(rows);
  const productMap = new Map();
  normalized.forEach((r,i)=>productMap.set(bcProductPayload(r,i).product_id, bcProductPayload(r,i)));
  let res = await supabaseClient.from('products').upsert([...productMap.values()], {onConflict:'product_id'});
  if(res.error) throw res.error;
  res = await supabaseClient.from('product_rates').delete().neq('product_id','__never__');
  if(res.error) throw res.error;
  res = await supabaseClient.from('product_rates').insert(normalized.map(bcRatePayload));
  if(res.error) throw res.error;
}
async function bcRefreshPublicFromSupabase(){
  const ok1 = await bcLoadRatesFromSupabase();
  const ok2 = await bcLoadSettingsFromSupabase();
  if(ok1 || ok2){
    try{ renderBasics(); renderHome(); bindHomeSearch(); renderProducts(); renderEnquiry(); }catch(e){ console.warn(e); }
  }
}
function admin(){
  const login=document.getElementById('loginBox'), panel=document.getElementById('adminPanel');
  if(!login) return;
  const uid=document.getElementById('uid'), pwd=document.getElementById('pwd'), btn=document.getElementById('loginBtn');
  if(uid){ uid.placeholder='Admin Email'; uid.type='email'; }
  if(pwd){ pwd.placeholder='Password'; }
  const notice=document.querySelector('.notice');
  if(notice) notice.innerHTML='<b>Connected mode:</b> Login and saving are connected to Supabase. Use your Supabase admin email and password.';
  async function showPanel(){
    login.style.display='none'; panel.style.display='block';
    await bcLoadSettingsFromSupabase();
    await bcLoadRatesFromSupabase();
    drawAdmin();
  }
  if(!bcHasSupabase()){
    if(btn) btn.onclick=()=>alert('Supabase is not loaded. Please open this folder using VS Code Live Server and make sure internet is working.');
    return;
  }
  supabaseClient.auth.getSession().then(({data})=>{ if(data && data.session) showPanel(); });
  if(btn) btn.onclick=async ()=>{
    const email=(uid?.value||'').trim(); const password=pwd?.value||'';
    if(!email || !password){ alert('Please enter admin email and password.'); return; }
    btn.disabled=true; btn.textContent='Logging in...';
    try{
      const {error}=await supabaseClient.auth.signInWithPassword({email,password});
      if(error) throw error;
      await showPanel();
    }catch(e){ alert('Login failed: '+e.message); }
    finally{ btn.disabled=false; btn.textContent='Login'; }
  };
}
function bindAdmin(){
  if(!document.getElementById('adminPanel')) return;
  const save=document.getElementById('saveAll');
  if(save) save.onclick=async ()=>{
    save.disabled=true; save.textContent='Saving...';
    try{
      const p=rateCardsFromInputs(); saveRateCards(p);
      let s={}; ['phone','phone2','email','website','workingHours','address','corporateAddress','gstAddress','whatsapp'].forEach(k=>{let e=document.getElementById('set_'+k); if(e) s[k]=e.value;});
      saveSettings(s);
      await bcSaveRatesToSupabase(p);
      await bcSaveSettingsToSupabase(s);
      alert('Saved to Supabase successfully. Public website will now read these rates.');
    }catch(e){ console.error(e); alert('Could not save to Supabase: '+e.message); }
    finally{ save.disabled=false; save.textContent='Save Changes'; }
  };
  const add=document.getElementById('addRow');
  if(add) add.onclick=()=>{let p=getRateCards();p.unshift({productId:'NEW-PRODUCT',category:'New',displayName:'New Product',image:'enq-coils-real.jpg',processType:'',grade:'',specification:'',size:'',rate:'On Request',unit:'₹/MT',validUpto:'07 Days',remarks:''});saveRateCards(p);drawAdmin()};
  const expj=document.getElementById('exportJson'); if(expj) expj.onclick=()=>download('buycommodity-ratecards-backup.json',JSON.stringify({settings:getSettings(),rateCards:rateCardsFromInputs()},null,2),'application/json');
  const exp=document.getElementById('exportCsv'); if(exp) exp.onclick=()=>{let p=rateCardsFromInputs(),cols=['productId','category','displayName','image','processType','grade','specification','size','rate','unit','validUpto','remarks'];if(window.XLSX){let wb=XLSX.utils.book_new();let ws=XLSX.utils.json_to_sheet(p,{header:cols});XLSX.utils.book_append_sheet(wb,ws,'Enquiry_Rates');XLSX.writeFile(wb,'buycommodity-enquiry-rates.xlsx')}else{let csv=[cols.join(',')].concat(p.map(r=>cols.map(c=>'"'+String(r[c]||'').replace(/"/g,'""')+'"').join(','))).join('\n');download('buycommodity-enquiry-rates.csv',csv,'text/csv')}};
  const imp=document.getElementById('importFile'); if(imp) imp.onchange=e=>{let f=e.target.files[0]; if(!f)return; let r=new FileReader(); r.onload=()=>{try{let lower=f.name.toLowerCase(); if(lower.endsWith('.json')){let o=JSON.parse(r.result); if(o.rateCards)saveRateCards(o.rateCards); if(o.products)saveRateCards(o.products); if(o.settings)saveSettings(o.settings)} else if((lower.endsWith('.xlsx')||lower.endsWith('.xls'))&&window.XLSX){let data=new Uint8Array(r.result);let wb=XLSX.read(data,{type:'array'});let ws=wb.Sheets[wb.SheetNames[0]];let rows=XLSX.utils.sheet_to_json(ws,{defval:''});saveRateCards(rows)} else {saveRateCards(parseCsv(r.result))} drawAdmin();alert('Imported successfully. Click Save Changes to push it to Supabase.')}catch(err){console.error(err);alert('Could not import file. Please use the downloaded Excel/CSV/JSON format.')}}; if(f.name.toLowerCase().endsWith('.xlsx')||f.name.toLowerCase().endsWith('.xls'))r.readAsArrayBuffer(f); else r.readAsText(f)};
  const reset=document.getElementById('resetData'); if(reset) reset.onclick=()=>{if(confirm('Reset local data to defaults? This will not delete Supabase data until you click Save Changes.')){localStorage.removeItem('bc_ratecards');localStorage.removeItem('bc_settings');drawAdmin()}};
}



/* FINAL GO-LIVE PATCH - Supabase login, save/load, enquiries */
async function bcInsertEnquiry(data){
  if(!bcHasSupabase()) throw new Error('Supabase is not loaded');
  const payload={
    name:data.name||'',
    company:data.company||'',
    gst:data.gst||'',
    city:data.city||'',
    mobile:data.mobile||'',
    email:data.email||'',
    product:data.product||'',
    requirement:data.requirement||''
  };
  let res=await supabaseClient.from('enquiries').insert(payload);
  if(res.error) throw res.error;
}
async function bcLoadEnquiries(){
  const tbody=document.getElementById('enquiryRows');
  if(!tbody || !bcHasSupabase()) return;
  tbody.innerHTML='<tr><td colspan="7">Loading enquiries...</td></tr>';
  try{
    const res=await supabaseClient.from('enquiries').select('*').order('created_at',{ascending:false}).limit(100);
    if(res.error) throw res.error;
    const rows=res.data||[];
    if(!rows.length){ tbody.innerHTML='<tr><td colspan="7">No enquiries yet.</td></tr>'; return; }
    tbody.innerHTML=rows.map(r=>`<tr><td>${new Date(r.created_at||Date.now()).toLocaleString()}</td><td>${r.name||''}</td><td>${r.company||''}</td><td>${r.mobile||''}</td><td>${r.email||''}</td><td>${r.product||''}</td><td>${r.requirement||''}</td></tr>`).join('');
  }catch(e){
    console.error(e);
    tbody.innerHTML='<tr><td colspan="7">Could not load enquiries: '+String(e.message||e)+'</td></tr>';
  }
}
function renderEnquiry(){
 const groups=groupRateRows();
 let grid=document.getElementById('enquiryProducts');
 if(grid){grid.innerHTML=groups.map(rateCardHTML).join('')+`<div class="custom-requirement-note"><div><b>Can’t find your required size or grade?</b><p>For different size specifications, custom requirements or bulk orders, please contact our team.</p></div><a href="index.html#contact">Contact Us →</a></div>`;}
 let formBox=document.querySelector('.formbox'); let sel=document.getElementById('productSelect');
 if(sel){sel.innerHTML='<option value="">Select Product</option>'+groups.map(x=>`<option>${x.displayName}</option>`).join('');}
 document.querySelectorAll('.viewRates').forEach(btn=>btn.onclick=()=>{document.getElementById('rates_'+btn.dataset.i)?.classList.add('active');btn.closest('.rate-card-v2')?.classList.add('expanded');btn.style.display='none'});
 document.querySelectorAll('.viewLess').forEach(btn=>btn.onclick=()=>{document.getElementById('rates_'+btn.dataset.i)?.classList.remove('active');btn.closest('.rate-card-v2')?.classList.remove('expanded');let b=document.querySelector(`.viewRates[data-i="${btn.dataset.i}"]`); if(b)b.style.display='inline-flex'});
 const showForm=(product)=>{ if(sel&&product) sel.value=product; if(formBox){formBox.classList.add('active'); formBox.scrollIntoView({behavior:'smooth',block:'start'});} };
 const q=new URLSearchParams(location.search).get('product'); if(q) setTimeout(()=>showForm(q),50);
 document.querySelectorAll('.enqPick').forEach(btn=>btn.onclick=()=>showForm(btn.dataset.product)); const close=document.getElementById('closeEnqForm'); if(close) close.onclick=()=>formBox?.classList.remove('active');
 let form=document.getElementById('enqForm');
 if(form)form.onsubmit=async e=>{
   e.preventDefault();
   let data=Object.fromEntries(new FormData(form).entries());
   const submit=form.querySelector('button[type="submit"],button.btn-gold');
   if(submit){ submit.disabled=true; submit.textContent='Submitting...'; }
   try{
     await bcInsertEnquiry(data);
     alert('Thank you. Your enquiry has been submitted successfully.');
     form.reset(); formBox?.classList.remove('active');
   }catch(err){
     console.error(err);
     const s=getSettings();
     let rows=[['Name',data.name||''],['Company',data.company||''],['GST No.',data.gst||''],['City / Delivery Location',data.city||''],['Mobile',data.mobile||''],['Email',data.email||''],['Product',data.product||''],['Requirement / Specifications',data.requirement||'']];
     let table=rows.map(r=>`${r[0]}: ${r[1]}`).join('%0A');
     let msg=`Product Enquiry - Buy Commodity%0A%0A${table}%0A%0A---%0AThis enquiry was generated from the Buy Commodity website.`;
     alert('Online submission failed. Your email app will open as fallback.');
     location.href=`mailto:${encodeURIComponent(s.email)}?subject=${encodeURIComponent('Product Enquiry - '+(data.product||''))}&body=${msg}`;
   }finally{
     if(submit){ submit.disabled=false; submit.textContent='Send Enquiry →'; }
   }
 }
}
function admin(){
  const login=document.getElementById('loginBox'), panel=document.getElementById('adminPanel');
  if(!login) return;
  const uid=document.getElementById('uid'), pwd=document.getElementById('pwd'), btn=document.getElementById('loginBtn');
  const status=document.getElementById('adminStatus');
  if(uid){ uid.placeholder='Admin Email'; uid.type='email'; }
  if(pwd){ pwd.placeholder='Password'; }
  const notice=document.querySelector('.notice');
  if(notice) notice.innerHTML='<b>Connected mode:</b> Login and saving are connected to Supabase. Use your Supabase admin email and password.';
  function setStatus(msg){ if(status) status.textContent=msg; }
  async function showPanel(){
    login.style.display='none'; panel.style.display='block'; setStatus('Loading data...');
    await bcLoadSettingsFromSupabase();
    await bcLoadRatesFromSupabase();
    drawAdmin(); await bcLoadEnquiries(); setStatus('Connected to Supabase');
  }
  if(!bcHasSupabase()){
    setStatus('Supabase not loaded');
    if(btn) btn.onclick=()=>alert('Supabase is not loaded. Please check internet connection and open from a website URL, not file://');
    return;
  }
  supabaseClient.auth.getSession().then(({data})=>{ if(data && data.session) showPanel(); else setStatus('Please login'); });
  if(btn) btn.onclick=async ()=>{
    const email=(uid?.value||'').trim(); const password=pwd?.value||'';
    if(!email || !password){ alert('Please enter admin email and password.'); return; }
    btn.disabled=true; btn.textContent='Logging in...'; setStatus('Logging in...');
    try{ const {error}=await supabaseClient.auth.signInWithPassword({email,password}); if(error) throw error; await showPanel(); }
    catch(e){ setStatus('Login failed'); alert('Login failed: '+e.message); }
    finally{ btn.disabled=false; btn.textContent='Login'; }
  };
  const logout=document.getElementById('logoutBtn');
  if(logout) logout.onclick=async()=>{ await supabaseClient.auth.signOut(); location.reload(); };
}
function bindAdmin(){
  if(!document.getElementById('adminPanel')) return;
  const save=document.getElementById('saveAll');
  if(save) save.onclick=async ()=>{
    save.disabled=true; save.textContent='Saving...';
    try{
      const p=rateCardsFromInputs(); saveRateCards(p);
      let s={}; ['phone','phone2','email','website','workingHours','address','corporateAddress','gstAddress','whatsapp'].forEach(k=>{let e=document.getElementById('set_'+k); if(e) s[k]=e.value;});
      saveSettings(s);
      await bcSaveRatesToSupabase(p);
      await bcSaveSettingsToSupabase(s);
      alert('Saved to Supabase successfully. Public website will now show these rates.');
    }catch(e){ console.error(e); alert('Could not save to Supabase: '+e.message); }
    finally{ save.disabled=false; save.textContent='Save Changes'; }
  };
  const refresh=document.getElementById('refreshEnquiries'); if(refresh) refresh.onclick=bcLoadEnquiries;
  const add=document.getElementById('addRow');
  if(add) add.onclick=()=>{let p=getRateCards();p.unshift({productId:'NEW-PRODUCT',category:'New',displayName:'New Product',image:'enq-coils-real.jpg',processType:'',grade:'',specification:'',size:'',rate:'On Request',unit:'₹/MT',validUpto:'07 Days',remarks:''});saveRateCards(p);drawAdmin()};
  const expj=document.getElementById('exportJson'); if(expj) expj.onclick=()=>download('buycommodity-ratecards-backup.json',JSON.stringify({settings:getSettings(),rateCards:rateCardsFromInputs()},null,2),'application/json');
  const exp=document.getElementById('exportCsv'); if(exp) exp.onclick=()=>{let p=rateCardsFromInputs(),cols=['productId','category','displayName','image','processType','grade','specification','size','rate','unit','validUpto','remarks'];if(window.XLSX){let wb=XLSX.utils.book_new();let ws=XLSX.utils.json_to_sheet(p,{header:cols});XLSX.utils.book_append_sheet(wb,ws,'Enquiry_Rates');XLSX.writeFile(wb,'buycommodity-enquiry-rates.xlsx')}else{let csv=[cols.join(',')].concat(p.map(r=>cols.map(c=>'"'+String(r[c]||'').replace(/"/g,'""')+'"').join(','))).join('\n');download('buycommodity-enquiry-rates.csv',csv,'text/csv')}};
  const imp=document.getElementById('importFile'); if(imp) imp.onchange=e=>{let f=e.target.files[0]; if(!f)return; let r=new FileReader(); r.onload=()=>{try{let lower=f.name.toLowerCase(); if(lower.endsWith('.json')){let o=JSON.parse(r.result); if(o.rateCards)saveRateCards(o.rateCards); if(o.products)saveRateCards(o.products); if(o.settings)saveSettings(o.settings)} else if((lower.endsWith('.xlsx')||lower.endsWith('.xls'))&&window.XLSX){let data=new Uint8Array(r.result);let wb=XLSX.read(data,{type:'array'});let ws=wb.Sheets[wb.SheetNames[0]];let rows=XLSX.utils.sheet_to_json(ws,{defval:''});saveRateCards(rows)} else {saveRateCards(parseCsv(r.result))} drawAdmin();alert('Imported successfully. Click Save Changes to push it to Supabase.')}catch(err){console.error(err);alert('Could not import file. Please use the downloaded Excel/CSV/JSON format.')}}; if(f.name.toLowerCase().endsWith('.xlsx')||f.name.toLowerCase().endsWith('.xls'))r.readAsArrayBuffer(f); else r.readAsText(f)};
  const reset=document.getElementById('resetData'); if(reset) reset.onclick=()=>{if(confirm('Reset local data to defaults? This will not delete Supabase data until you click Save Changes.')){localStorage.removeItem('bc_ratecards');localStorage.removeItem('bc_settings');drawAdmin()}};
}

document.addEventListener('DOMContentLoaded',()=>{renderBasics();renderHome();bindHomeSearch();renderProducts();renderEnquiry();admin();bindAdmin(); if(!document.getElementById('adminPanel')) bcRefreshPublicFromSupabase();});

/* FINAL NAV ACTIVE + CONTACT SCROLL FIX */
(function(){
  function setActiveNav(target){
    const links=document.querySelectorAll('.menu a');
    links.forEach(a=>a.classList.remove('active'));
    let match=null;
    links.forEach(a=>{
      const href=a.getAttribute('href')||'';
      if(target==='contact' && href.includes('#contact')) match=a;
      else if(target==='about' && href.includes('#about')) match=a;
      else if(target==='products' && href.includes('products.html')) match=a;
      else if(target==='enquiry' && href.includes('enquiry.html')) match=a;
      else if(target==='home' && href==='index.html') match=a;
    });
    if(match) match.classList.add('active');
  }
  function scrollToContact(){
    const el=document.getElementById('contact');
    const header=document.querySelector('.topbar');
    if(!el) return;
    const headerH=header?header.offsetHeight:76;
    const y=el.getBoundingClientRect().top + window.pageYOffset - headerH;
    window.scrollTo({top:y,behavior:'smooth'});
    setActiveNav('contact');
    try{history.replaceState(null,'','#contact')}catch(e){}
  }
  function scrollToAbout(){
    const el=document.getElementById('about');
    const header=document.querySelector('.topbar');
    if(!el) return;
    const headerH=header?header.offsetHeight:76;
    const y=el.getBoundingClientRect().top + window.pageYOffset - headerH;
    window.scrollTo({top:y,behavior:'smooth'});
    setActiveNav('about');
    try{history.replaceState(null,'','#about')}catch(e){}
  }
  document.addEventListener('click',function(e){
    const a=e.target.closest('a'); if(!a) return;
    const href=a.getAttribute('href')||'';
    if(href.endsWith('#contact') || href==='#contact'){
      if(document.getElementById('contact')){e.preventDefault();scrollToContact();}
    }
    if(href.endsWith('#about') || href==='#about'){
      if(document.getElementById('about')){e.preventDefault();scrollToAbout();}
    }
  });
  document.addEventListener('DOMContentLoaded',function(){
    const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(location.hash==='#contact') setTimeout(scrollToContact,120);
    else if(location.hash==='#about') setTimeout(scrollToAbout,120);
    else if(path==='products.html') setActiveNav('products');
    else if(path==='enquiry.html') setActiveNav('enquiry');
    else setActiveNav('home');
  });
})();
