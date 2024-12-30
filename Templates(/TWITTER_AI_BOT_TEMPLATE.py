import openai
import requests
from requests_oauthlib import OAuth1
import schedule
import time

# UNIFIED API KEY -- LABELED OPENAI DUE TO SERVER PROVIDER, BUT FUNCTIONAL WITH PoM API KEY
openai.api_key =" UNIFIED API KEY HERE"

# Twitter API Credentials for OAuth 1.0a




API_KEY="T7ZCB7iFvdNxYnqf0YjblIU2V"

API_SECRET_KEY="hnVE1J4DU6iSWbgF99O6p6UhMs0lRbyA1lomi1OhK5gSZJ35OA"



ACCESS_TOKEN="1870910284711211008-1FMUHrabY0dEetmhYqyoFBMNkDrpbP"

ACCESS_TOKEN_SECRET="VHvTMMfDgw8U8s8rOhgarkEaKIfmG2WqDO63DQwTlcHKz"

# Set up OAuth 1.0a Authentication
auth = OAuth1(API_KEY, API_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

def generate_tweet():
    """Generate a tweet using OpenAI API."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": """CONTEXT"""},
                {"role": "user", "content": """CONTEXT -- INSERT HERE PROMPT"""}
            ],
            temperature=0.7,
            max_tokens=50
        )
        tweet = response["choices"][0]["message"]["content"].strip()
        return tweet
    except Exception as e:
        print(f"Error generating tweet: {e}")
        return None

def post_tweet(tweet_text):
    """Post a tweet using Twitter API v2 with OAuth 1.0a."""
    url = "https://api.twitter.com/2/tweets"
    payload = {"text": tweet_text}

    try:
        response = requests.post(url, json=payload, auth=auth)
        if response.status_code == 201:
            print("Tweet posted successfully:", response.json())
        else:
            print("Error posting tweet:", response.status_code, response.json())
    except Exception as e:
        print(f"Error posting tweet: {e}")

def tweet_ai_content():
    """Generate and post a tweet."""
    tweet = generate_tweet()
    if tweet:
        post_tweet(tweet)

# Schedule the bot to tweet every 1 minute -- CHANGE WHENEVER
schedule.every(1).minutes.do(tweet_ai_content)

print("Twitter AI Bot is running...")
while True:
    schedule.run_pending()
    time.sleep(1)
