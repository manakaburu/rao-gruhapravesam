from pathlib import Path
import base64,re
from PIL import Image,ImageDraw
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
html=(root/'qa/V8_WATERCOLOR_VISUAL_HARNESS.html').read_text()
css=(root/'src/styles/invitation.css').read_text()
# Match current project's CSS exactly, without relying on a live HTTP address.
html=html.replace(html.split('<style>',1)[1].split('</style>',1)[0], css,1)
html=html.replace('1+3.3*d*e(b)','1+3.45*d*Math.pow(e(b),2.25)')
html=html.replace('e((b-.23)/.16)*(1-e((b-.58)/.17))','e((b-.43)/.11)*(1-e((b-.66)/.12))')
html=html.replace('1-e((b-.22)/.22)','1-e((b-.43)/.13)')
for filename in ('watercolor-mask.png','watercolor-mask-clarity.png','paper-grain.png','paper-edge.png','entrance.webp','interior.webp'):
    path=root/'public/assets'/filename
    typ='image/webp' if filename.endswith('.webp') else 'image/png'
    data='data:'+typ+';base64,'+base64.b64encode(path.read_bytes()).decode()
    html=html.replace('../public/assets/'+filename,data)
    html=html.replace('/assets/'+filename,data)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for w,h in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
        errors=[]
        page.on('pageerror',lambda err:errors.append(str(err)))
        page.set_content(html,wait_until='load',timeout=30000)
        page.wait_for_timeout(200)
        for b in (0,.16,.32,.45,.58,.70,.85,1):
            page.evaluate('(b)=>window.setProgress(b)',b)
            page.wait_for_timeout(90)
            page.screenshot(path=str(root/f'qa/V9_{w}_{round(b*100):02d}.jpg'),type='jpeg',quality=83)
            if b==.45:
                print('viewport',w,'maskSize',page.locator('.spread--welcome').evaluate('(el)=>getComputedStyle(el).maskSize'), 'title', page.locator('.chapter-portal__caption').evaluate('(el)=>getComputedStyle(el).opacity'))
        print('Browser errors:',errors)
        assert not errors
        page.close()
    browser.close()
for w,h in [(1440,900),(390,844)]:
    inds=[0,16,32,45,58,70,85,100]
    ims=[]
    for b in inds:
        im=Image.open(root/f'qa/V9_{w}_{b:02d}.jpg').convert('RGB')
        im.thumbnail((460,320))
        ims.append(im)
    maxw=max(i.width for i in ims);maxh=max(i.height for i in ims)
    canvas=Image.new('RGB',(maxw*4,(maxh+26)*2),(246,238,221));d=ImageDraw.Draw(canvas)
    for i,(im,b) in enumerate(zip(ims,inds)):
        x=(i%4)*maxw;y=(i//4)*(maxh+26)
        canvas.paste(im,(x,y+26));d.text((x+10,y+5),f'V9 {b}% reveal',fill=(46,46,46))
    canvas.save(root/f'qa/V9_{w}_CONTACT.jpg',quality=89)
print('created QA contacts')
