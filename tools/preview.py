#!/usr/bin/env python3
"""Local-only preview: python3 tools/preview.py [--port 8000]. Ctrl+C to stop."""
import argparse,http.server,functools,webbrowser
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8000);a=p.parse_args()
root=Path(__file__).resolve().parents[1]
handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(root))
with http.server.ThreadingHTTPServer(('127.0.0.1',a.port),handler) as server:
 url=f'http://127.0.0.1:{a.port}/';print(url);webbrowser.open(url)
 try:server.serve_forever()
 except KeyboardInterrupt:pass
