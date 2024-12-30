import sys

if sys.platform == "win32":
    import asyncio
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import discord
import openai
# Set your Discord bot token and Unified PoM API key -- OPENAI IS JUST THE VARIABLE NAME
DISCORD_TOKEN = 'DISCORD TOKEN'
OPENAI_API_KEY = 'PoM API KEY HERE (IGNORE OPENAI, JUST PROVIDER)'

# Initialize OpenAI
openai.api_key = OPENAI_API_KEY

# Initialize the Discord client
intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!ai'):
        user_input = message.content[len('!ai '):]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        reply = response['choices'][0]['message']['content']
        await message.channel.send(reply)

client.run(DISCORD_TOKEN)