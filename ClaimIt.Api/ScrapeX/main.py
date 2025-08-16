import requests, json, time

BEARER_TOKEN = ""
url = "https://api.x.com/2/tweets/search/recent"
query = "from:asedd72 has:media"

params = {"query": query, "tweet.fields": "created_at", "max_results": 10}
headers = {"Authorization": f"Bearer {BEARER_TOKEN}"}

def fetch():
    while True:
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            data = response.json()
            with open("tweets.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4, ensure_ascii=False)
            print("✅ Tweets saved to tweets.json")
            break
        elif response.status_code == 429:
            reset = int(response.headers.get("x-rate-limit-reset", time.time()+60))
            wait_time = max(reset - int(time.time()), 10)
            print(f"⚠️ Rate limit hit. Waiting {wait_time}s…")
            time.sleep(wait_time)
        else:
            print(f"❌ Error {response.status_code}: {response.text}")
            break

fetch()
