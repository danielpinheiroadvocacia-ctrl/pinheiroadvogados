/* Pinheiro Advogados — conteúdo dinâmico (publicações e equipe).
   Os dados ficam em /data/artigos.json e /data/equipe.json e são editados pelo painel /admin. */
(function () {
  var ROOT = document.body.getAttribute('data-root') || '';
  var AREAS = {
    'direito-publico': 'Direito Público',
    'direito-civil': 'Direito Civil',
    'direito-tributario': 'Direito Tributário',
    'direito-do-consumidor': 'Direito do Consumidor',
    'familia-e-sucessoes': 'Família e Sucessões',
    'direito-imobiliario': 'Direito Imobiliário, Real e Possessório',
    'direito-trabalhista': 'Direito Trabalhista',
    'direito-do-servidor-publico': 'Direito do Servidor Público',
    'direito-previdenciario': 'Direito Previdenciário',
    'direito-empresarial': 'Direito Empresarial',
    'direito-criminal': 'Direito Criminal'
  };
  var SIMBOLO = document.getElementById('tpl-simbolo') ? document.getElementById('tpl-simbolo').innerHTML : '';

  // Menu móvel
  var btn = document.getElementById('menu-btn'), nav = document.getElementById('menu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.dataset.open !== 'true';
      nav.dataset.open = open; btn.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.dataset.open = 'false'; btn.setAttribute('aria-expanded', 'false'); });
    });
  }
  var ano = document.getElementById('ano'); if (ano) ano.textContent = new Date().getFullYear();

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function dataBR(iso) {
    if (!iso) return '';
    var m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? m[3] + '/' + m[2] + '/' + m[1] : esc(iso);
  }
  function img(src) { if (!src) return ''; return /^(https?:)?\//.test(src) ? src : ROOT + src; }
  function getJSON(file) {
    var reserva = (window.DADOS || {})[file];
    return fetch(ROOT + 'data/' + file, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .catch(function () { if (reserva) return reserva; throw 0; });
  }
  function artigos() {
    return getJSON('artigos.json').then(function (d) {
      var l = (d && d.artigos) || [];
      return l.filter(function (a) { return a && a.titulo && a.slug; })
              .sort(function (a, b) { return String(b.data || '').localeCompare(String(a.data || '')); });
    }).catch(function () { return []; });
  }
  function vazio(titulo, texto) {
    return '<div class="vazio"><div class="simb">' + SIMBOLO + '</div><strong>' + titulo + '</strong><p>' + texto + '</p></div>';
  }
  function itemPub(a, mostrarArea) {
    return '<a class="pub" href="' + ROOT + 'artigo.html?id=' + encodeURIComponent(a.slug) + '">' +
      '<div class="meta"><b>' + dataBR(a.data) + '</b>' + (mostrarArea ? '<span>' + esc(AREAS[a.area] || '') + '</span>' : '') + (a.autor ? '<span>' + esc(a.autor) + '</span>' : '') + '</div>' +
      '<div><h3>' + esc(a.titulo) + '</h3>' + (a.resumo ? '<p>' + esc(a.resumo) + '</p>' : '') + '</div></a>';
  }

  // Página inicial: contagem por área + publicações recentes
  var recentes = document.getElementById('pub-recentes');
  if (recentes || document.querySelector('[data-qtd]')) {
    artigos().then(function (l) {
      document.querySelectorAll('[data-qtd]').forEach(function (el) {
        var n = l.filter(function (a) { return a.area === el.getAttribute('data-qtd'); }).length;
        el.textContent = n === 0 ? '' : n === 1 ? '1 publicação' : n + ' publicações';
      });
      if (recentes) {
        recentes.innerHTML = l.length
          ? '<div class="lista-pub">' + l.slice(0, 4).map(function (a) { return itemPub(a, true); }).join('') + '</div>'
          : vazio('Publicações em breve', 'Artigos e informativos sobre as áreas de atuação do escritório serão publicados aqui.');
      }
    });
  }

  // Página de área
  var listaArea = document.getElementById('pub-area');
  if (listaArea) {
    var slug = listaArea.getAttribute('data-area');
    artigos().then(function (l) {
      var f = l.filter(function (a) { return a.area === slug; });
      listaArea.innerHTML = f.length
        ? '<div class="lista-pub">' + f.map(function (a) { return itemPub(a, false); }).join('') + '</div>'
        : vazio('Ainda não há publicações nesta área', 'Em breve, artigos e orientações sobre ' + esc(AREAS[slug]) + ' estarão disponíveis aqui.');
    });
  }

  // Página de artigo
  var art = document.getElementById('artigo');
  if (art) {
    var id = new URLSearchParams(location.search).get('id');
    artigos().then(function (l) {
      var a = l.filter(function (x) { return x.slug === id; })[0];
      var titulo = document.getElementById('art-titulo'), meta = document.getElementById('art-meta'), mig = document.getElementById('art-area');
      if (!a) {
        titulo.textContent = 'Publicação não encontrada';
        art.innerHTML = vazio('Não encontramos este conteúdo', 'Ele pode ter sido removido ou o endereço está incorreto.') + '<a class="voltar" href="' + ROOT + 'index.html#areas">Ver áreas de atuação</a>';
        return;
      }
      document.title = a.titulo + ' · Pinheiro Advogados';
      titulo.textContent = a.titulo;
      mig.innerHTML = '<a href="' + ROOT + 'areas/' + a.area + '.html">' + esc(AREAS[a.area] || '') + '</a>';
      meta.textContent = [dataBR(a.data), a.autor].filter(Boolean).join(' · ');
      var html = window.marked ? window.marked.parse(a.corpo || '') : '<p>' + esc(a.corpo || '') + '</p>';
      if (window.DOMPurify) html = window.DOMPurify.sanitize(html);
      art.innerHTML = (a.imagem ? '<img class="capa" src="' + esc(img(a.imagem)) + '" alt="">' : '') +
        '<div class="corpo">' + html + '</div>' +
        '<a class="voltar" href="' + ROOT + 'areas/' + a.area + '.html">Mais conteúdos de ' + esc(AREAS[a.area] || 'a área') + '</a>';
    });
  }

  // Novidades e informações jurídicas
  var CATS = {
    'legislacao': 'Legislação',
    'jurisprudencia': 'Jurisprudência',
    'noticias': 'Notícias jurídicas',
    'prazos': 'Prazos e calendário',
    'escritorio': 'Comunicados do escritório'
  };
  function novidades() {
    return getJSON('novidades.json').then(function (d) {
      var l = (d && d.novidades) || [];
      return l.filter(function (a) { return a && a.titulo && a.slug; })
              .sort(function (a, b) { return String(b.data || '').localeCompare(String(a.data || '')); });
    }).catch(function () { return []; });
  }
  function cardNov(n) {
    return '<a class="nov" href="' + ROOT + 'novidade.html?id=' + encodeURIComponent(n.slug) + '">' +
      (n.imagem ? '<img src="' + esc(img(n.imagem)) + '" alt="">' : '') +
      '<div class="nov-txt"><div class="nov-meta"><span class="cat">' + esc(CATS[n.categoria] || 'Informação') + '</span><span>' + dataBR(n.data) + '</span></div>' +
      '<h3>' + esc(n.titulo) + '</h3>' + (n.resumo ? '<p>' + esc(n.resumo) + '</p>' : '') + '<span class="ler">Ler mais</span></div></a>';
  }
  var novRec = document.getElementById('nov-recentes');
  if (novRec) novidades().then(function (l) {
    novRec.innerHTML = l.length ? '<div class="nov-grid">' + l.slice(0, 3).map(cardNov).join('') + '</div>'
      : vazio('Novidades em breve', 'Notícias do escritório, mudanças na legislação e decisões relevantes serão publicadas aqui.');
  });
  var novLista = document.getElementById('nov-lista');
  if (novLista) novidades().then(function (l) {
    var botoes = document.querySelectorAll('.filtro');
    function render(cat) {
      var f = cat ? l.filter(function (n) { return n.categoria === cat; }) : l;
      botoes.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cat') === cat ? 'true' : 'false'); });
      novLista.innerHTML = f.length ? '<div class="nov-grid">' + f.map(cardNov).join('') + '</div>'
        : vazio(l.length ? 'Nada nesta categoria por enquanto' : 'Novidades em breve', 'Notícias do escritório, mudanças na legislação e decisões relevantes serão publicadas aqui.');
    }
    botoes.forEach(function (b) { b.addEventListener('click', function () { render(b.getAttribute('data-cat')); }); });
    var inicial = (location.hash || '').slice(1);
    render(CATS[inicial] ? inicial : '');
  });
  var novEl = document.getElementById('novidade');
  if (novEl) {
    var nid = new URLSearchParams(location.search).get('id');
    novidades().then(function (l) {
      var n = l.filter(function (x) { return x.slug === nid; })[0];
      var t = document.getElementById('nov-titulo');
      if (!n) {
        t.textContent = 'Conteúdo não encontrado';
        novEl.innerHTML = vazio('Não encontramos este conteúdo', 'Ele pode ter sido removido ou o endereço está incorreto.') + '<a class="voltar" href="' + ROOT + 'novidades.html">Ver todas as novidades</a>';
        return;
      }
      document.title = n.titulo + ' · Pinheiro Advogados';
      t.textContent = n.titulo;
      document.getElementById('nov-cat').innerHTML = '<a href="' + ROOT + 'novidades.html">Novidades</a> · <a href="' + ROOT + 'novidades.html#' + esc(n.categoria || '') + '">' + esc(CATS[n.categoria] || 'Informação') + '</a>';
      document.getElementById('nov-meta').textContent = [dataBR(n.data), n.autor].filter(Boolean).join(' · ');
      var html = window.marked ? window.marked.parse(n.corpo || '') : '<p>' + esc(n.corpo || '') + '</p>';
      if (window.DOMPurify) html = window.DOMPurify.sanitize(html);
      var fonte = n.fonte_url ? '<p class="fonte">Fonte: <a href="' + esc(n.fonte_url) + '" target="_blank" rel="noopener">' + esc(n.fonte_nome || n.fonte_url) + '</a></p>' : '';
      novEl.innerHTML = (n.imagem ? '<img class="capa" src="' + esc(img(n.imagem)) + '" alt="">' : '') + '<div class="corpo">' + html + '</div>' + fonte +
        '<a class="voltar" href="' + ROOT + 'novidades.html">Ver todas as novidades</a>';
    });
  }

  // Equipe jurídica
  var eq = document.getElementById('equipe');
  if (eq) {
    getJSON('equipe.json').then(function (d) { return (d && d.membros) || []; }).catch(function () { return []; }).then(function (l) {
      l = l.filter(function (m) { return m && m.nome; });
      if (!l.length) { eq.innerHTML = vazio('Equipe em atualização', 'Os perfis dos profissionais do escritório serão apresentados aqui.'); return; }
      eq.innerHTML = '<div class="equipe-grid' + (l.length === 1 ? ' solo' : '') + '">' + l.map(function (m, i) {
        var areas = (m.areas || []).map(function (s) { return '<span>' + esc(AREAS[s] || s) + '</span>'; }).join('');
        var esp = (m.especializacoes || []).filter(Boolean);
        return '<article class="membro' + (m.foto ? '' : ' sem-foto') + (i === 0 && l.length > 1 ? ' destaque' : '') + '">' +
          (m.foto ? '<img class="foto" src="' + esc(img(m.foto)) + '" alt="Foto de ' + esc(m.nome) + '">' : '') +
          '<div class="info"><span class="cargo">' + esc(m.cargo || '') + '</span><h3>' + esc(m.nome) + '</h3>' +
          (m.oab ? '<span class="oab">' + esc(m.oab) + '</span>' : '') +
          (m.titulacao ? '<p class="titulacao">' + esc(m.titulacao) + '</p>' : '') +
          (esp.length ? '<ul class="especializacoes">' + esp.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' : '') +
          (m.bio ? '<p>' + esc(m.bio) + '</p>' : '') +
          (areas ? '<div class="tags">' + areas + '</div>' : '') +
          (m.email ? '<a class="mail" href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>' : '') +
          '</div></article>';
      }).join('') + '</div>';
    });
  }

})();
