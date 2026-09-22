/* ==========================================================
   NURA — Interacciones (landing + página de producto)
   ========================================================== */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const isSolid = nav && nav.classList.contains("solid");
  const onScroll = () => nav && !isSolid && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Links de contacto ---------- */
  function bindContact(root = document) {
    $$("[data-wa]", root).forEach((a) => {
      a.href = nuraWhatsapp(a.dataset.wa);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  $$("#igLink, .ig-link").forEach((a) => (a.href = NURA_CONFIG.instagram));
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Tarjetas de recetas ---------- */
  const arrow = '<svg><use href="#i-arrow"/></svg>';
  function cardReceta(p, i = 0) {
    return `
      <article class="receta reveal d${i % 3}" style="--c:${p.color};--cs:${p.colorSuave}">
        <a class="cover" href="producto.html?p=${p.id}" aria-label="Ver receta ${p.nombre}"></a>
        <div class="receta-img">
          <span class="receta-tag">${p.corto}</span>
          <img src="${p.bolsa}" alt="Bolsa NURA ${p.nombre} ${p.peso}" loading="lazy" />
        </div>
        <div class="receta-body">
          <h3>${p.nombre}</h3>
          <div class="receta-base">${p.base}</div>
          <p>${p.bajada}</p>
          <div class="receta-stats">
            <div><b>${p.nutricion.proteina}</b>Proteína</div>
            <div><b>${p.nutricion.energia.replace(" kcal", "")}</b>kcal</div>
            <div><b>${p.peso.replace(" grs", " g")}</b>Bolsa</div>
          </div>
          <div class="receta-link">Ver receta completa <span class="arrow">${arrow}</span></div>
        </div>
      </article>`;
  }

  const grid = $("#recetasGrid");
  if (grid) grid.innerHTML = NURA_PRODUCTOS.map(cardReceta).join("");

  const footerRecetas = $("#footerRecetas");
  if (footerRecetas)
    footerRecetas.innerHTML = NURA_PRODUCTOS.map(
      (p) => `<li><a href="producto.html?p=${p.id}">${p.nombre}</a></li>`
    ).join("");

  /* ---------- Marquee (duplicar para loop infinito) ---------- */
  const mq = $("#marquee");
  if (mq) mq.innerHTML += mq.innerHTML;

  /* ---------- Guía de porciones + calculadora ---------- */
  const tabla = $("#tablaPorciones");
  const perros = ["perro-xs", "perro-s", "perro-m", "perro-l"];
  const alturas = [40, 50, 60, 70];
  if (tabla) {
    tabla.innerHTML = NURA_PORCIONES.map(
      (f, i) => `
      <div class="fila-porcion reveal d${i}" data-i="${i}">
        <div class="perro"><img src="assets/img/${perros[i]}.png" alt="" style="height:${alturas[i]}px;width:auto" /></div>
        <div><h4>${f.tamano}</h4><small>${f.rango}</small></div>
        <div class="gr">${f.gramos}</div>
      </div>`
    ).join("");
  }

  const peso = $("#peso");
  if (peso) {
    const interp = (kg) => {
      const c = NURA_CURVA;
      for (let i = 1; i < c.length; i++) {
        if (kg <= c[i][0]) {
          const [x0, y0] = c[i - 1], [x1, y1] = c[i];
          return y0 + ((kg - x0) * (y1 - y0)) / (x1 - x0);
        }
      }
      return c[c.length - 1][1];
    };
    const categoria = (kg) => (kg <= 5 ? 0 : kg <= 10 ? 1 : kg <= 25 ? 2 : 3);
    const update = () => {
      const kg = +peso.value;
      const g = Math.round(interp(kg) / 5) * 5;
      const bolsas = Math.ceil((g * 7) / 400);
      $("#pesoOut").textContent = kg;
      $("#gramosOut").textContent = `${g} g`;
      $("#bolsasOut").textContent = bolsas;
      peso.style.setProperty("--p", `${((kg - 1) / 39) * 100}%`);
      const cat = categoria(kg);
      $$(".fila-porcion").forEach((f) => f.classList.toggle("activa", +f.dataset.i === cat));
      $("#calcWa").href = nuraWhatsapp(
        `Hola NURA! Mi perro pesa ${kg} kg. Quiero armar un plan a medida (la calculadora me dio ~${g} g por día) 🐶`
      );
      $("#calcWa").target = "_blank";
    };
    peso.addEventListener("input", update);
    update();
  }

  /* ---------- Página de producto ---------- */
  const prodRoot = $("#producto");
  if (prodRoot) renderProducto(prodRoot);

  function renderProducto(root) {
    const id = new URLSearchParams(location.search).get("p");
    const p = NURA_PRODUCTOS.find((x) => x.id === id) || NURA_PRODUCTOS[0];
    document.title = `NURA ${p.nombre} · ${p.base} | Nutrición para mascotas`;
    document.documentElement.style.setProperty("--c", p.color);
    document.documentElement.style.setProperty("--cs", p.colorSuave);

    const n = p.nutricion;
    const filas = [
      ["i-drop", "Humedad", n.humedad],
      ["i-leaf", "Materia seca", n.materiaSeca],
      ["i-bolt", "Energía", n.energia],
      ["i-muscle", "Proteína", n.proteina],
      ["i-drop", "Grasa total", n.grasa],
      ["i-wheat", "Hidratos de carbono", n.hidratos],
      ["i-leaf", "Fibra bruta", n.fibra],
    ];
    const iconosCons = { frio: "i-snow", vacio: "i-box", temp: "i-temp", olla: "i-bowl", cal: "i-cal", reloj: "i-clock" };
    const fotos = [p.bolsa, ...p.fotos];

    root.innerHTML = `
      <section class="prod-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Ruta"><a href="index.html">Inicio</a><span>/</span><a href="index.html#recetas">Recetas</a><span>/</span><span>${p.nombre}</span></nav>
          <div class="prod-grid">
            <div>
              <div class="prod-visual" id="prodVisual">
                <div class="badge-kcal"><b>${n.energia.replace(" kcal", "")}</b>kcal / 100 g</div>
                <img class="bolsa" id="prodImg" src="${p.bolsa}" alt="Bolsa NURA ${p.nombre}" />
              </div>
              <div class="prod-thumbs">
                ${fotos
                  .map((f, i) => `<button class="${i === 0 ? "activo" : ""}" data-src="${f}" aria-label="Ver imagen ${i + 1}"><img src="${f}" alt="" loading="lazy" /></button>`)
                  .join("")}
              </div>
            </div>
            <div class="prod-info">
              <span class="receta-tag" style="background:${p.color}">Receta ${p.corto}</span>
              <h1>${p.nombre}</h1>
              <div class="base">${p.base}</div>
              <p class="desc">${p.descripcion}</p>
              <div class="prod-checks">
                <span><svg><use href="#i-check"/></svg> 100% natural</span>
                <span><svg><use href="#i-check"/></svg> Balanceado</span>
                <span><svg><use href="#i-check"/></svg> Máxima frescura</span>
                <span><svg><use href="#i-check"/></svg> Salud digestiva</span>
              </div>
              <div class="prod-compra">
                <div class="fila">
                  <div class="peso">Bolsa de ${p.peso.replace(" grs", " g")}<small>Envasado al vacío · Mantener refrigerado</small></div>
                  <div class="cantidad">
                    <button type="button" id="menos" aria-label="Restar">−</button>
                    <output id="cant">4</output>
                    <button type="button" id="mas" aria-label="Sumar">+</button>
                  </div>
                </div>
                <a class="btn btn-verde" id="pedirBtn" href="#" target="_blank" rel="noopener"><svg><use href="#i-whatsapp"/></svg> Pedir por WhatsApp</a>
                <div class="envio"><svg><use href="#i-truck"/></svg> Entrega al día siguiente en ${NURA_CONFIG.zona}.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section prod-detalle">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow reveal" style="color:${p.color}">Ingredientes</span>
            <h2 class="reveal d1">Lo que ves es lo que come.</h2>
            <p class="reveal d2">Ingredientes frescos de calidad humana, cocidos al vapor. Sin colorantes ni saborizantes artificiales.</p>
          </div>
          <div class="ingredientes-grid">
            ${p.ingredientes
              .map((ing, i) => `<div class="ingrediente reveal d${i % 4}"><div class="n">${String(i + 1).padStart(2, "0")}</div><h4>${ing.nombre}</h4><p>${ing.detalle}</p></div>`)
              .join("")}
          </div>

          <div class="info-grid">
            <div class="info-card reveal">
              <h3>Información nutricional</h3>
              <div class="sub">Por cada 100 gramos</div>
              <table class="tabla-nutri">
                ${filas.map(([ic, k, v]) => `<tr><td><svg><use href="#${ic}"/></svg>${k}</td><td>${v}</td></tr>`).join("")}
              </table>
              <div class="sin-color">Sin colorantes ni saborizantes artificiales</div>
            </div>
            <div class="info-card reveal d1">
              <h3>Conservación</h3>
              <div class="sub">Para que llegue fresco a su plato</div>
              <ul class="conservacion">
                ${NURA_CONSERVACION.map((c) => `<li><svg><use href="#${iconosCons[c.icono]}"/></svg>${c.texto}</li>`).join("")}
              </ul>
              <p class="con-amor">Hecha con amor, pensada para ellos ♥</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section porciones">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow reveal">Guía de porciones</span>
            <h2 class="reveal d1">¿Cuánto darle por día?</h2>
            <p class="reveal d2">Referencia para un perro adulto con nivel de actividad normal. Podemos elaborar un plan a medida con el peso exacto y el nivel de actividad.</p>
          </div>
          <div class="tabla-porciones" id="tablaPorcionesProd">
            ${NURA_PORCIONES.map(
              (f, i) => `
              <div class="fila-porcion reveal d${i}">
                <div class="perro"><img src="assets/img/${perros[i]}.png" alt="" style="height:${alturas[i]}px;width:auto" /></div>
                <div><h4>${f.tamano}</h4><small>${f.rango}</small></div>
                <div class="gr">${f.gramos}</div>
              </div>`
            ).join("")}
          </div>
        </div>
      </section>

      <section class="section otras">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow reveal">Sumá variedad</span>
            <h2 class="reveal d1">Probá también</h2>
          </div>
          <div class="recetas-grid">${NURA_PRODUCTOS.filter((x) => x.id !== p.id).map(cardReceta).join("")}</div>
        </div>
      </section>`;

    // Galería
    const img = $("#prodImg");
    $$(".prod-thumbs button", root).forEach((b) =>
      b.addEventListener("click", () => {
        $$(".prod-thumbs button", root).forEach((x) => x.classList.remove("activo"));
        b.classList.add("activo");
        const esBolsa = b.dataset.src === p.bolsa;
        img.src = b.dataset.src;
        img.classList.toggle("bolsa", esBolsa);
        img.style.cssText = esBolsa ? "" : "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";
      })
    );

    // Cantidad + pedido
    let cant = 4;
    const out = $("#cant");
    const pedir = $("#pedirBtn");
    const sync = () => {
      out.textContent = cant;
      pedir.href = nuraWhatsapp(`Hola NURA! Quiero pedir ${cant} bolsa${cant > 1 ? "s" : ""} de ${p.nombre} (${p.peso}) 🐶`);
    };
    $("#menos").addEventListener("click", () => { cant = Math.max(1, cant - 1); sync(); });
    $("#mas").addEventListener("click", () => { cant = Math.min(50, cant + 1); sync(); });
    sync();
  }

  bindContact();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Video: pausar si no está a la vista ---------- */
  const video = $(".hero-video");
  if (video) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause())).observe(video);
  }
})();
