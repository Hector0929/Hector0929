// Hector's Lab 子頁外框：在每個工具頁頂部加一條固定的返回列。
// 用法：在 <head> 放 <script src="assets/js/lab-shell.js"></script>（子資料夾用 ../assets/...）。
// 必須同步載入（不要 defer），才能在第一次繪製前先把頁面往下推，避免跳動。
(function () {
  if (window.__labShell) return;
  window.__labShell = true;

  var BAR = 48;
  var script = document.currentScript;
  // 網站根目錄 = 這支 script 的位置往上兩層（assets/js/）
  var root = new URL('../../', script.src).href;
  var doc = document.documentElement;
  doc.style.setProperty('--lab-bar', BAR + 'px');
  doc.classList.add('lab-shelled');

  var css = [
    'html.lab-shelled{padding-top:var(--lab-bar)!important;box-sizing:border-box;scroll-padding-top:var(--lab-bar)}',
    'html.lab-shelled body.min-h-screen{min-height:calc(100vh - var(--lab-bar))!important}',
    'html.lab-shelled body.h-screen{height:calc(100vh - var(--lab-bar))!important}',
    '.lab-shell{all:initial;position:fixed;top:0;left:0;right:0;z-index:1000;box-sizing:border-box;height:calc(var(--lab-bar) + env(safe-area-inset-top,0px));padding:env(safe-area-inset-top,0px) max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));display:flex;align-items:center;gap:12px;',
    'background:rgba(243,243,246,.88);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);box-shadow:0 1px 0 rgba(0,0,0,.06),0 6px 20px rgba(20,30,60,.06);',
    'font:500 14px/1.2 -apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang TC","Noto Sans TC",system-ui,sans-serif;color:#1d1d1f;-webkit-font-smoothing:antialiased;letter-spacing:0}',
    '.lab-shell *{box-sizing:border-box;font:inherit;letter-spacing:inherit;margin:0;padding:0}',
    '.lab-shell a{color:inherit;text-decoration:none}',
    '.lab-shell a:focus-visible{outline:2px solid #0a72e8;outline-offset:2px;border-radius:8px}',
    '.lab-shell__home{display:flex;align-items:center;gap:8px;font-weight:700;white-space:nowrap}',
    '.lab-shell__home i{width:20px;height:20px;border-radius:6px;background:linear-gradient(135deg,#1fa98a,#0a72e8);display:block;flex:none}',
    '.lab-shell__crumb{display:flex;align-items:center;gap:8px;min-width:0;color:#6b6f76}',
    '.lab-shell__crumb a:hover,.lab-shell__home:hover{color:#0a72e8}',
    '.lab-shell__crumb b{color:#1d1d1f;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.lab-shell__sep{color:#8e9198}',
    '.lab-shell__seg{margin-left:auto;display:flex;gap:2px;padding:3px;border-radius:10px;background:rgba(0,0,0,.06);overflow-x:auto;scrollbar-width:none;max-width:60%;flex:none}',
    '.lab-shell__seg::-webkit-scrollbar{display:none}',
    '.lab-shell__seg a{padding:6px 12px;border-radius:8px;color:#6b6f76;font-size:13px;white-space:nowrap}',
    '.lab-shell__seg a:hover{color:#1d1d1f}',
    '.lab-shell__seg a[aria-current]{background:#fff;color:#1d1d1f;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.1)}',
    '@media (max-width:640px){.lab-shell__home span,.lab-shell__cat,.lab-shell__sep.c{display:none}.lab-shell__seg{max-width:62%}}'
  ].join('');
  var style = document.createElement('style');
  style.id = 'lab-shell-style';
  style.textContent = css;
  (document.head || doc).appendChild(style);

  function here() {
    // 相對於網站根目錄的路徑，例如 "pages/scan.html"
    var p = decodeURIComponent(location.href.split(/[?#]/)[0]);
    return p.indexOf(root) === 0 ? p.slice(root.length) : p.split('/').pop();
  }

  function findApp(lab, path) {
    for (var i = 0; i < lab.apps.length; i++) {
      var a = lab.apps[i];
      if (a.href === path || (a.also && a.also.indexOf(path) >= 0)) return { app: a };
      if (a.modes) {
        for (var j = 0; j < a.modes.length; j++) if (a.modes[j].href === path) return { app: a, mode: a.modes[j] };
      }
    }
    return null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function render() {
    if (!window.LAB || !document.body || document.querySelector('.lab-shell')) return;
    var hit = findApp(window.LAB, here());
    var cat = hit && window.LAB.categories.filter(function (c) { return c.id === hit.app.cat; })[0];
    var title = hit ? hit.app.title : document.title;

    var html = '<a class="lab-shell__home" href="' + root + 'index.html" aria-label="回到 Hector\'s Lab 首頁"><i></i><span>Hector\'s Lab</span></a>' +
      '<nav class="lab-shell__crumb" aria-label="目前位置">' +
      (cat ? '<span class="lab-shell__sep c">›</span><a class="lab-shell__cat" href="' + root + 'index.html#' + cat.id + '">' + esc(cat.name) + '</a>' : '') +
      '<span class="lab-shell__sep">›</span><b>' + esc(title) + '</b></nav>';

    if (hit && hit.app.modes) {
      html += '<div class="lab-shell__seg" role="navigation" aria-label="切換模式">' +
        hit.app.modes.map(function (m) {
          return '<a href="' + root + m.href + '"' + (hit.mode === m ? ' aria-current="page"' : '') + '>' + esc(m.label) + '</a>';
        }).join('') + '</div>';
    }

    var bar = document.createElement('header');
    bar.className = 'lab-shell';
    bar.innerHTML = html;
    document.body.appendChild(bar);
    fitViewport();
  }

  // 頁面自己寫了 height/min-height: 100vh 的話，扣掉外框高度，免得多出一段捲動
  function fitViewport() {
    var b = document.body;
    if (!b) return;
    var cs = getComputedStyle(b);
    var vh = window.innerHeight;
    var near = function (v) { return Math.abs(parseFloat(v) - vh) < 2; };
    if (near(cs.minHeight)) b.style.setProperty('min-height', 'calc(100vh - var(--lab-bar))', 'important');
    if (near(cs.height) && cs.overflow === 'hidden') b.style.setProperty('height', 'calc(100vh - var(--lab-bar))', 'important');
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  if (window.LAB) {
    whenReady(render);
  } else {
    var s = document.createElement('script');
    s.src = root + 'assets/js/lab-apps.js';
    s.onload = function () { whenReady(render); };
    (document.head || doc).appendChild(s);
  }
  // Tailwind CDN 會在載入後才產生樣式，load 時再校正一次高度
  window.addEventListener('load', fitViewport);
})();
