/**
 * Runs inline in <head> before first paint so a stored or requested theme
 * applies without a flash. `?theme=light` / `?theme=dark` overrides the stored
 * choice (handy for sharing a comparison link). Dark is the brand default.
 */
export const themeInitScript = `(function(){try{var q=new URLSearchParams(location.search).get('theme');var t=(q==='light'||q==='dark')?q:localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme='light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#F7F8FB');}}catch(e){}})();`;
