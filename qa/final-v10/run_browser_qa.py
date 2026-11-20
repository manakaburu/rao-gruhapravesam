"""Source CSS and source-asset Chromium harness. Uses set_content because localhost/file URLs may be restricted."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image,ImageDraw
import re,base64,json
root=Path(__file__).resolve().parents[2]
out=root/'qa/final-v10'
css=(root/'src/styles/invitation.css').read_text()
base=root/'public'

def data_for(path):
 p=base/path.lstrip('/')
 if not p.exists():return 'none'
 suffix=p.suffix.lower(); media='image/png' if suffix=='.png' else 'image/webp' if suffix=='.webp' else 'image/svg+xml'
 return f'data:{media};base64,'+base64.b64encode(p.read_bytes()).decode('ascii')

# Replace actual CSS asset references, keeping all declarations unchanged.
css=re.sub(r'''url\(\s*(['"]?)(/assets/[^'"\)]+)\1\s*\)''', lambda m:'url("'+data_for(m.group(2))+'")', css)
fixture=(out/'TRANSITION_PREVIEW.html').read_text()
fixture=fixture.replace('<link rel="stylesheet" href="/src/styles/invitation.css"/>','<style>'+css+'</style>')
fixture=re.sub(r'''src="(/assets/[^"]+)"''',lambda m:'src="'+data_for(m.group(1))+'"',fixture)
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width,height in [(1440,900),(390,844),(375,667),(1714,900),(1366,768),(320,568)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  errors=[];page.on('pageerror', lambda e:errors.append(str(e)))
  for target in ['feast','closing']:
   for k in [0.18,0.35,0.53,0.71,0.88,1.0]:
    html=fixture.replace('new URLSearchParams(location.search)',f'new URLSearchParams("?target={target}&blend={k}")')
    page.goto('about:blank');page.set_content(html,wait_until='load');page.wait_for_timeout(70)
    state=page.evaluate('''() => {let inc=document.querySelector('#in'),out=document.querySelector('#out'),veil=document.querySelector('#veil');let img=inc.querySelector('img');let a=inc.getBoundingClientRect(), b=out.getBoundingClientRect();return {w:innerWidth,h:innerHeight,bodyWidth:document.documentElement.scrollWidth,inc:[a.x,a.y,a.width,a.height],out:[b.x,b.y,b.width,b.height],mask:getComputedStyle(inc).maskImage,edge:getComputedStyle(veil,'::before').maskImage,edgeOpacity:getComputedStyle(veil,'::before').opacity,titleOpacity:getComputedStyle(inc.querySelector('.heading-block')).opacity,imgVisible:!!img,imgLoaded: img?.complete ?? true}}''')
    assert state['bodyWidth']<=width+1,(width,height,target,k,'horizontal overflow',state)
    assert state['imgLoaded'],(width,height,target,k,'image not loaded')
    assert 'data:image/png' in state['mask'],(width,height,target,k,'mask missing')
    assert 'data:image/png' in state['edge'],(width,height,target,k,'edge missing')
    assert not errors,(width,height,target,k,'errors',errors)
    if width==1440:page.screenshot(path=str(out/f'{target}_{width}_{k:.2f}.png'))
    results.append({'viewport':f'{width}x{height}','target':target,'blend':k,'widthOverflow':state['bodyWidth']-width,'headVisible':state['titleOpacity']})
  page.close()
 browser.close()
(out/'browser_qa_results.json').write_text(json.dumps(results,indent=2))
thumbs=[]
for target in ['feast','closing']:
 for k in [0.18,0.35,0.53,0.71,0.88,1.0]:
  im=Image.open(out/f'{target}_1440_{k:.2f}.png').convert('RGB');im.thumbnail((480,300))
  item=Image.new('RGB',(500,340),'#f5ecdd');item.paste(im,((500-im.width)//2,30));ImageDraw.Draw(item).text((12,10),f'{target.upper()} - {int(k*100)}% opening',fill='#482c20');thumbs.append(item)
comp=Image.new('RGB',(3000,680),'#f5ecdd')
for i,img in enumerate(thumbs):comp.paste(img,((i%6)*500,(i//6)*340))
comp.save(out/'LAST_TWO_CONTACT_SHEET.jpg',quality=88)
print('Browser QA PASS',len(results),'frames across 6 viewports and 2 final transitions')
