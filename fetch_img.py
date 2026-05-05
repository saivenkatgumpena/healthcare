import urllib.request
import re

url = "https://chatgpt.com/s/m_69d228addc64819199f8b654b2f7187b"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'<meta property="og:image" content="(.*?)"', html)
    if match:
        img_url = match.group(1)
        print("Found image URL:", img_url)
        urllib.request.urlretrieve(img_url, r"c:\Users\nihar\Music\MERN-Stack-Hospital-Management-System-Web-Application-main\frontend\public\logo.png")
        urllib.request.urlretrieve(img_url, r"c:\Users\nihar\Music\MERN-Stack-Hospital-Management-System-Web-Application-main\dashboard\public\logo.png")
        print("Done downloading.")
    else:
        print("No og:image found.")
except Exception as e:
    print(f"Error: {e}")
