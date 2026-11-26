CHAT_ID = os.environ.get("CHAT_ID", "")

def process_two_way():
    deals = []
    for u in get_updates():
        txt = u.get("message", {}).get("text", "")
        urls = re.findall(r'https?://\S+', txt)
        if urls:
            deals.append({"name": txt.replace(urls[0], "").strip() or "New Deal", "price": "₹299", "url": urls[0]})
    with open("deals.json", "w") as f:
        json.dump(deals[-10:], f, indent=2)
    if CHAT_ID and TOKEN and deals:
        msg = f"✅ {len(deals)}টি ডিল 3D মলে সিঙ্ক হয়েছে!"
        urllib.request.urlopen(f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={urllib.parse.quote(msg)}")

if __name__ == "__main__":
    import urllib.parse
    process_two_way()
