#!/usr/bin/env python3
"""One-time import of original portrait files, with no site/runtime dependency.
Run from any directory:
  python3 tools/import-photos.py --source /path/to/old/repository
  python3 tools/import-photos.py --source /path/to/downloaded-old-repository.zip
  python3 tools/import-photos.py --download
Only the seven expected image basenames are copied. Nothing is uploaded/deleted.
"""
from __future__ import annotations
import argparse, json, urllib.request, urllib.error, zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
NAMES=json.loads((ROOT/'tools/member-photos.json').read_text())
DEST=ROOT/'assets/images/members'
BASE='https://raw.githubusercontent.com/uselab-kus/uselab-kus.github.io/main/members/images/'
def valid_image(b:bytes)->bool:
 return b.startswith(b'\x89PNG\r\n\x1a\n') or b.startswith(b'\xff\xd8\xff')
def main()->int:
 parser=argparse.ArgumentParser(description=__doc__)
 group=parser.add_mutually_exclusive_group(required=True)
 group.add_argument('--source',type=Path);group.add_argument('--download',action='store_true')
 parser.add_argument('--overwrite',action='store_true',help='Replace existing destination portraits')
 args=parser.parse_args();DEST.mkdir(parents=True,exist_ok=True);failures=[]
 source=args.source.expanduser().resolve() if args.source else None
 archive=zipfile.ZipFile(source) if source and zipfile.is_zipfile(source) else None
 try:
  for name in NAMES:
   dest=DEST/name
   if dest.exists() and not args.overwrite:
    print('KEEP',name);continue
   try:
    if args.download:
     req=urllib.request.Request(BASE+name,headers={'User-Agent':'ASELab-photo-import/1.0'})
     with urllib.request.urlopen(req,timeout=25) as res:payload=res.read(20*1024*1024+1)
    elif archive:
     options=[p for p in archive.namelist() if p.endswith('/members/images/'+name) or p=='members/images/'+name]
     if len(options)!=1:raise FileNotFoundError('No unique members/images/'+name+' in archive')
     payload=archive.read(options[0])
    else:
     candidates=[source/'members/images'/name,source/name]
     if source.is_dir(): candidates.extend(source.glob('*/members/images/'+name))
     found=next((p for p in candidates if p.is_file()),None)
     if not found:raise FileNotFoundError(name)
     payload=found.read_bytes()
    if len(payload)>20*1024*1024 or not valid_image(payload):raise ValueError('Not a supported PNG/JPEG image or size exceeds 20 MB')
    tmp=dest.with_suffix(dest.suffix+'.tmp');tmp.write_bytes(payload);tmp.replace(dest)
    print('IMPORTED',name)
   except (OSError,ValueError,urllib.error.URLError) as exc:
    failures.append(name);print('MISSING',name,':',exc)
 finally:
  if archive:archive.close()
 print('\nComplete. Imported files are local and do not depend on the previous website.')
 if failures:print('Not imported:',', '.join(failures),'— copy these originals manually before publishing.')
 return 1 if failures else 0
if __name__=='__main__':raise SystemExit(main())
