import urllib.request,urllib.error,urllib.parse,json,concurrent.futures
from html.parser import HTMLParser
from pathlib import Path
base='https://realitni-agentura.mohaplmax7.workers.dev'
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.assets=set();self.links=set();self.meta=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t in ['img','script'] and d.get('src'):self.assets.add(d['src'])
  if t=='a' and d.get('href'):self.links.add(d['href'])
  if t=='link' and d.get('rel') in ['stylesheet','modulepreload','preload']:self.assets.add(d.get('href',''))
  if t=='meta':self.meta.append(d)
def get(path):
 import subprocess
 u=urllib.parse.urljoin(base,path)
 proc=subprocess.run(['curl','-sS','-L','--max-time','25','-D','-','--',u],capture_output=True)
 if proc.returncode:return {'url':u,'error':proc.stderr.decode()},b''
 raw=proc.stdout;head,b=raw.split(b'\r\n\r\n',1)
 headers={}
 for line in head.decode(errors='replace').splitlines()[1:]:
  if ':' in line:k,v=line.split(':',1);headers[k]=v.strip()
 return {'url':u,'status':int(head.split()[1]),'bytes':len(b),'headers':headers},b

routes=['/','/nabidka','/nase-sluzby','/o-nas','/nas-tym','/financovani','/projekty','/kontakt','/projekty/domy-ustin','/projekty/muslovske-vinohrady','/projekty/bell-house-brodek','/projekty/apartmany-ricky','/projekty/penzion-lansperk','/robots.txt','/sitemap.xml','/api/inquiries/config','/api/properties','/audit-neexistujici-stranka']
results=[];assets=set();links=set()
for route in routes:
 r,b=get(route);p=Parser();p.feed(b.decode('utf-8',errors='replace'));r['meta']=p.meta;r['assets']=sorted(p.assets);r['links']=sorted(p.links);assets.update(p.assets);links.update(p.links);results.append(r)
 if route in ['/robots.txt','/sitemap.xml','/api/inquiries/config','/api/properties']:r['preview']=b.decode('utf-8',errors='replace')[:1200]
asset_results=[]
def asset(path):
 r,b=get(path)
 if path.endswith('.js'):r['tracking_terms']=[x for x in ['document.cookie','localStorage','sessionStorage','google-analytics','googletagmanager','fbq(','mailto:','Připravit e-mail'] if x in b.decode(errors='replace')]
 return r
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:asset_results=list(pool.map(asset,[a for a in assets if a.startswith('/')]))
out={'pages':results,'assets':asset_results,'links':sorted(links)}
Path('audit-2026-10-05/live-http.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
print('PAGES',[(r['url'].removeprefix(base),r.get('status'),r.get('bytes')) for r in results])
print('LARGEST ASSETS',[(r['url'].removeprefix(base),r.get('bytes')) for r in sorted(asset_results,key=lambda r:r.get('bytes',0),reverse=True)[:18]])
print('JS SIGNALS',[(r['url'].removeprefix(base),r.get('tracking_terms')) for r in asset_results if r.get('tracking_terms')])
print('SET COOKIE',[(r['url'],r.get('headers',{}).get('Set-Cookie')) for r in results+asset_results if any(k.lower()=='set-cookie' for k in r.get('headers',{}))])
