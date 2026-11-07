# Checks every external link on the built site and classifies it.
#
#   npm run build && node scripts/scan-site-links.mjs && python3 -I scripts/check-external-links.py
#
# Reads docs/site-links.json (from scan-site-links.mjs) and writes docs/external-links.json:
#   { checked, links: [{ url, class, why, pages }] }, class one of
#   ok          the link works (2xx or 3xx after redirects)
#   broken      404/410, or the host no longer exists
#   error       timeouts, refused connections, certificate problems, other 4xx and 5xx
#   unverified  the site blocks automated checks (dblp.org and its old uni-trier pages, the ACM DL and DOI links, 403/429)
# Pass --status <file.json> to classify the raw results of an earlier run instead of checking again.
import json, sys, re, ssl, socket, urllib.request, urllib.error, threading, collections, time, datetime, pathlib
from concurrent.futures import ThreadPoolExecutor

ROOT = pathlib.Path(__file__).resolve().parent.parent
scan = json.load(open(ROOT / "docs/site-links.json", encoding="utf-8"))
pages = scan["external"]  # url -> [page, ...]

# Hosts that answer scripts with a bot check whatever the URL: not checked, listed as unverified.
BLOCKS = re.compile(r"^https?://((www\.)?dblp\.(org|uni-trier\.de)|dl\.acm\.org|doi\.acm\.org|(dx\.)?doi\.org|portal\.acm\.org)(/|$)|^https?://www\.informatik\.uni-trier\.de/~ley/", re.I)
SKIP = re.compile(r"^https?://github\.com/sigmod-org/", re.I)  # our own repositories
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 sigmod-link-check"
ctx = ssl.create_default_context()
host_locks = collections.defaultdict(lambda: threading.Semaphore(2))

def fetch(u, method):
    req = urllib.request.Request(u, method=method, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
        if method == "GET":
            r.read(2048)
        return r.status, r.geturl()

def check(u):
    host = re.sub(r"^https?://([^/]+).*", r"\1", u).lower()
    with host_locks[host]:
        res = None
        for method in ("HEAD", "GET"):
            try:
                st, final = fetch(u, method)
                res = {"status": st, "final": final}
                break
            except urllib.error.HTTPError as e:
                res = {"status": e.code, "final": u}
                if e.code in (404, 410) and method == "GET":
                    break
                if e.code not in (400, 403, 404, 405, 406, 429, 500, 501, 503):
                    break
            except (urllib.error.URLError, socket.timeout, ssl.SSLError, ConnectionError, TimeoutError, ValueError) as e:
                reason = getattr(e, "reason", e)
                res = {"status": 0, "error": type(reason).__name__ + ": " + str(reason)[:120]}
            except Exception as e:  # noqa
                res = {"status": 0, "error": type(e).__name__ + ": " + str(e)[:120]}
        time.sleep(0.3)
        return u, res

def classify(u, r):
    if BLOCKS.match(u):
        return "unverified", "the site blocks automated checks"
    st, err = r.get("status", 0), r.get("error", "")
    if 200 <= st < 400:
        return "ok", str(st)
    if st in (403, 429):
        return "unverified", f"{st}: the site blocks automated checks"
    if st in (404, 410):
        return "broken", f"{st} Not Found" if st == 404 else "410 Gone"
    if st:
        return "error", f"{st} server error" if st >= 500 else f"{st} client error"
    if re.search(r"nodename nor servname|Name or service not known|getaddrinfo|No address associated|Could not resolve host", err):
        return "broken", "site no longer exists"
    if re.search(r"CERTIFICATE|SSL", err, re.I):
        return "error", "invalid HTTPS certificate"
    if re.search(r"timed out|timeout", err, re.I):
        return "error", "timed out"
    if re.search(r"refused", err, re.I):
        return "error", "connection refused"
    return "error", err[:80] or "no answer"

if "--status" in sys.argv:
    raw = json.load(open(sys.argv[sys.argv.index("--status") + 1]))
else:
    todo = [u for u in pages if not BLOCKS.match(u) and not SKIP.match(u)]
    raw = {}
    with ThreadPoolExecutor(16) as ex:
        for u, r in ex.map(check, todo):
            raw[u] = r

links = []
for u, ps in pages.items():
    if SKIP.match(u):
        continue
    cls, why = classify(u, raw.get(u, {"status": 0, "error": "not checked"}))
    links.append({"url": u, "class": cls, "why": why, "pages": ps})
out = {"checked": datetime.date.today().isoformat(), "links": links}
json.dump(out, open(ROOT / "docs/external-links.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print(len(links), "external links:", dict(collections.Counter(l["class"] for l in links).most_common()), "→ docs/external-links.json")
