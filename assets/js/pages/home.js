let activeProduct=null,selectedColor=null,selectedSize=null;

function productVisual(p,c){
  const fallback=iconSvg(p.icon,c||p.colors?.[0]||'#111');
  if(!p.imageUrl)return fallback;
  return '<img src="'+p.imageUrl+'" alt="'+p.name.replace(/"/g,'&quot;')+'" loading="lazy" onerror="this.replaceWith(document.createRange().createContextualFragment('+JSON.stringify(fallback)+'))">';
}

function renderProducts(filter='all'){
  document.querySelectorAll('.category-block').forEach(block=>{
    const cat=block.dataset.category;
    const items=PRODUCTS.filter(p=>p.category===cat&&(filter==='all'||filter===cat));
    block.hidden=!items.length;
    block.querySelector('.product-grid').innerHTML=items.map(p=>`<article class="product" tabindex="0" role="button" aria-label="View ${p.name}" onclick="openProduct('${p.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')openProduct('${p.id}')"><div class="product-image">${p.badge?`<span class="product-badge">${p.badge}</span>`:''}${productVisual(p)}</div><div class="product-info"><div class="product-name">${p.name}</div><div class="product-price">KES ${p.price.toLocaleString()}</div><div class="product-colors">${(p.colors||[]).map(c=>`<span class="color-dot" style="background:${c}" aria-hidden="true"></span>`).join('')}</div></div></article>`).join('');
  });
}

function openProduct(id){
  const p=PRODUCTS.find(x=>x.id===id); if(!p)return;
  activeProduct=p; selectedColor=p.colors?.[0]||'#111'; selectedSize=p.sizes?.[0]||'ONE SIZE';
  document.getElementById('modalContent').innerHTML=`<div class="modal-image">${productVisual(p,selectedColor)}</div><div class="modal-info"><span class="modal-cat">${p.category.toUpperCase()}</span><h2 class="modal-name">${p.name}</h2><div class="modal-price">KES ${p.price.toLocaleString()}</div><p class="modal-desc">${p.desc||''}</p><div class="modal-label">COLOUR</div><div class="modal-colors">${(p.colors||[]).map((c,i)=>`<button class="modal-color ${!i?'active':''}" aria-label="Colour ${c}" style="background:${c}" onclick="pickColor('${c}',this)"></button>`).join('')}</div><div class="modal-label">SIZE</div><div class="modal-sizes">${(p.sizes||['ONE SIZE']).map((s,i)=>`<button class="modal-size ${!i?'active':''}" onclick="pickSize('${s}',this)">${s}</button>`).join('')}</div><div class="modal-actions"><button class="btn-add" onclick="addToCart()">ADD TO CART</button><button class="btn-wa-modal" onclick="askWhatsApp()">ASK ON WHATSAPP</button></div></div>`;
  document.getElementById('modalOverlay').classList.add('open'); document.body.style.overflow='hidden';
}
function pickColor(c,b){selectedColor=c;document.querySelectorAll('.modal-color').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('.modal-image').innerHTML=productVisual(activeProduct,c)}
function pickSize(s,b){selectedSize=s;document.querySelectorAll('.modal-size').forEach(x=>x.classList.remove('active'));b.classList.add('active')}
function closeModal(){document.getElementById('modalOverlay').classList.remove('open');document.body.style.overflow=''}
function addToCart(){if(!activeProduct)return;const key=activeProduct.id+'-'+selectedColor+'-'+selectedSize;const i=BLNX_CART.find(x=>x.key===key);if(i)i.qty++;else BLNX_CART.push({key,id:activeProduct.id,name:activeProduct.name,price:activeProduct.price,color:selectedColor,size:selectedSize,qty:1,icon:activeProduct.icon,imageUrl:activeProduct.imageUrl});saveBLNXCart();renderCart();closeModal();openCart()}
function renderCart(){const n=BLNX_CART.reduce((s,i)=>s+i.qty,0),sub=BLNX_CART.reduce((s,i)=>s+i.price*i.qty,0);document.getElementById('cartCount').textContent=n;document.getElementById('cartItems').innerHTML=BLNX_CART.map(i=>`<div class="cart-item"><div class="cart-item-img">${i.imageUrl?`<img src="${i.imageUrl}" alt="${i.name}" loading="lazy">`:iconSvg(i.icon,i.color)}</div><div class="cart-item-info"><div class="cart-item-name">${i.name}</div><div class="cart-item-meta">${i.color} · ${i.size}</div><div class="cart-qty"><button onclick="changeQty('${i.key}',-1)">−</button><span>${i.qty}</span><button onclick="changeQty('${i.key}',1)">+</button></div><div class="cart-item-price">KES ${(i.price*i.qty).toLocaleString()}</div></div><button class="cart-item-remove" onclick="removeCart('${i.key}')">Remove</button></div>`).join('');document.getElementById('cartEmpty').style.display=BLNX_CART.length?'none':'flex';document.getElementById('cartFooter').style.display=BLNX_CART.length?'block':'none';document.getElementById('cartSubtotal').textContent='KES '+sub.toLocaleString()}
function changeQty(k,d){const i=BLNX_CART.find(x=>x.key===k);if(!i)return;i.qty+=d;if(i.qty<1)removeCart(k);else{saveBLNXCart();renderCart()}}
function removeCart(k){BLNX_CART=BLNX_CART.filter(x=>x.key!==k);saveBLNXCart();renderCart()}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartOverlay').classList.add('open')}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartOverlay').classList.remove('open')}
function checkoutWhatsApp(){if(!BLNX_CART.length)return;let m="Hi, I'd like to place an order:\n\n";BLNX_CART.forEach((i,n)=>m+=(n+1)+'. *'+i.name+'* — '+i.qty+' × KES '+i.price.toLocaleString()+'\nColour: '+i.color+' | Size: '+i.size+'\n\n');m+='Total: KES '+BLNX_CART.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString()+'\n\nName:\nDelivery location:\nPreferred payment: M-Pesa';window.open('https://wa.me/254104273995?text='+encodeURIComponent(m),'_blank')}
function askWhatsApp(){if(!activeProduct)return;window.open('https://wa.me/254104273995?text='+encodeURIComponent("Hi, I'm interested in "+activeProduct.name+' (KES '+activeProduct.price.toLocaleString()+') — colour: '+selectedColor+', size: '+selectedSize+'. Is it available?'),'_blank')}
function toggleSearch(){const e=document.getElementById('searchOverlay');e.classList.toggle('open');if(e.classList.contains('open'))setTimeout(()=>document.getElementById('searchInput').focus(),50)}
function handleSearch(q){const r=document.getElementById('searchResults'),m=PRODUCTS.filter(p=>(p.name+' '+p.category).toLowerCase().includes(q.trim().toLowerCase()));r.innerHTML=q.trim()?m.map(p=>`<div class="search-result-item" role="button" tabindex="0" onclick="toggleSearch();openProduct('${p.id}')"><span>${p.name}</span><span>KES ${p.price.toLocaleString()}</span></div>`).join(''):'<div class="search-none">Start typing to search the collection.</div>'}

document.querySelectorAll('.shop-categories a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const f=a.dataset.filter||'all';document.querySelectorAll('.shop-categories a').forEach(x=>x.classList.remove('active'));a.classList.add('active');renderProducts(f);if(f!=='all')document.getElementById(f+'Section')?.scrollIntoView({behavior:'smooth',block:'start'})}));

function renderLookbook(){
  const grid=document.getElementById('lookbookGrid');
  if(!grid)return;
  const looks=[
    {category:'hoodies',title:'THE EVERYDAY LAYER',count:3},
    {category:'sneakers',title:'BUILT FOR THE PAVEMENT',count:3},
    {category:'tees',title:'THE FOUNDATION',count:3}
  ];
  grid.innerHTML=looks.map(look=>{
    const products=PRODUCTS.filter(p=>p.category===look.category);
    if(!products.length)return '';
    const lead=products[0];
    const pieces=products.slice(0,look.count).flatMap(p=>{
      const urls=(p.imageUrls&&p.imageUrls.length?p.imageUrls:[p.imageUrl]).filter(Boolean);
      return urls.slice(0,1).map(url=>`<button class="look-piece" type="button" aria-label="View ${p.name}" onclick="openProduct('${p.id}')"><img src="${url}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML=iconSvg('${p.icon}','${p.colors?.[0]||'#111'}')"></button>`);
    });
    return `<article class="look-card"><div class="look-card-image" style="--look-piece-count:${pieces.length||1}">${pieces.join('')}</div><div class="look-card-copy"><h3>${look.title}</h3><div class="look-shop-label">SHOP THE LOOK</div><div class="look-card-links">${products.slice(0,look.count).map(p=>`<a href="#" onclick="event.preventDefault();openProduct('${p.id}')">${p.name}</a>`).join('')}</div></div></article>`;
  }).join('');
}

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeCart();const s=document.getElementById('searchOverlay');if(s?.classList.contains('open'))s.classList.remove('open')}});
renderProducts();renderLookbook();renderCart();