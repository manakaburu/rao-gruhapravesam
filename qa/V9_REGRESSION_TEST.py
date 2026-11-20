"""Visual-harness checks of exact V9 stylesheet and art; not a Vite app integration test."""
from pathlib import Path
import base64
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
html=(root/'qa/V8_WATERCOLOR_VISUAL_HARNESS.html').read_text()
css=(root/'src/styles/invitation.css').read_text()
html=html.replace(html.split('<style>',1)[1].split('</style>',1)[0],css,1)
html=html.replace('1+3.3*d*e(b)','1+3.45*d*Math.pow(e(b),2.25)').replace('e((b-.23)/.16)*(1-e((b-.58)/.17))','e((b-.43)/.11)*(1-e((b-.66)/.12))').replace('1-e((b-.22)/.22)','1-e((b-.43)/.13)')
for name in ('watercolor-mask.png','watercolor-mask-clarity.png','paper-grain.png','paper-edge.png','entrance.webp','interior.webp'):
    p=root/'public/assets'/name
    uri=f"data:{'image/webp' if name.endswith('.webp') else 'image/png'};base64,"+base64.b64encode(p.read_bytes()).decode()
    html=html.replace('../public/assets/'+name,uri).replace('/assets/'+name,uri)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for w,h in [(1440,900),(390,844),(375,667)]:
        page=browser.new_page(viewport={'width':w,'height':h})
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.set_content(html,wait_until='load')
        page.evaluate('window.setProgress(0)')
        old=page.locator('.spread--entrance .plate').bounding_box()
        new=page.locator('.spread--welcome .plate').bounding_box()
        for progress in [0,.16,.32,.45,.58,.70,.85,1,.58,.32,0]:
            page.evaluate('window.setProgress(arguments[0])' if False else '(p)=>window.setProgress(p)',progress)
            a=page.locator('.spread--welcome').evaluate('(el)=>parseFloat(getComputedStyle(el).maskSize)')
            assert a>0,(w,h,progress,'mask-size not set')
            if .45<progress<.60:
                op=page.locator('.chapter-portal__caption').evaluate('(el)=>+getComputedStyle(el).opacity')
                assert op>=.05,(w,h,progress,op)
            assert page.locator('.spread--entrance .plate').bounding_box()==old,'Departing painting moved'
            assert page.locator('.spread--welcome .plate').bounding_box()==new,'Incoming painting moved'
        assert not errors,(w,h,errors)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'),(w,h,'horizontal overflow')
        page.close()
        print(f'{w}x{h}: forward/reverse matte, centered-title phase, artwork coordinates, JS errors, horizontal overflow PASS')
    browser.close()
