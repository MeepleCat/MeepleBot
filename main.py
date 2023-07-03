import discord
import os
# import random
import time

from discord import HTTPException

from whitelist import whitelist
from notify import notify
from whitelist_instructions import whitelist_instructions
# from keep_alive import keep_alive

import gspread
from oauth2client.service_account import ServiceAccountCredentials

scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]
credentials = ServiceAccountCredentials.from_json_keyfile_name("Google_Account.json", scopes)
# access the json key you downloaded earlier

file = gspread.authorize(credentials)
# authenticate the JSON key with gspread
sheet = file.open("ConquistadorsWhitelist")
# open sheet
sheet = sheet.sheet1

intents = discord.Intents.all()
intents.message_content = True

client = discord.Client(intents=intents)

ignoredServers = []

timeStartedB = time.ctime()
timeStarted = time.time()
messagesSent = 0
timesSomeoneHasSaidArk = 0
timesSomeoneHasScreamedAtBot = 0
lastTimeSomeoneSaidArk = 0
lastMessageFromBot = ""

msg2ago = ""
msg1ago = ""
pingStart = "@"
previousMessages = ["", "", "", "", "", "", "", "", "", ""]


@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))


@client.event
async def on_message(message):
    message_lower = message.content.lower()

    # determines the previous messages
    global previousMessages
    for i in range(10):
        previousMessages[10-i] = previousMessages[9-i]
    previousMessages[0] = message

    if message.author == client.user:
        return

    # runs the code for messages in channels called "Usernames"
    if message.channel == "Usernames":
        # runs the code for the Whitelist command
        if message_lower.startswith("!meeplebot whitelist"):
            await message.channel.send(whitelist(message, sheet))

        # runs the code for the Notify command
        if message_lower.startswith("!meeplebot notify"):
            await message.channel.send(notify(message, sheet))

        # reposts the instructions message
        try:
            await message.channel.send(whitelist_instructions(previousMessages))
        except HTTPException:
            return

client.run(os.environ['TOKEN'])
