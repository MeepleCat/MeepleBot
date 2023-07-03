import discord
import os
# import random
import time

from discord import HTTPException

from whitelist import whitelist
from notify import notify
from whitelist_instructions import whitelist_instructions
from claimed_numbers import claimed_numbers
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

    # prints the message and it's details to the console
    print(f"----------\nserver: {message.guild}\nchannel: {message.channel}\nauthor: {message.author}\ncontent: "
          f"{message.content}")

    # determines the previous messages
    global previousMessages
    for i in range(9):
        previousMessages[9-i] = previousMessages[8-i]
    previousMessages[0] = message

    if message.author == client.user:
        return

    # runs the code for messages in channels called "usernames"
    if message.channel == "Usernames":
        # runs the code for the Whitelist command
        if message_lower.startswith("!meeplebot whitelist"):
            await message.channel.send(whitelist(message, sheet))

        # runs the code for the Notify command
        if message_lower.startswith("!meeplebot notify"):
            global pingStart
            await message.channel.send(notify(sheet, pingStart))

        # reposts the instructions message
        try:
            await message.channel.send(whitelist_instructions(previousMessages))
        except HTTPException:
            return

    # runs the code for messages in channels called "packager-numbers"
    if str(message.channel) == "packager-numbers":
        # shows the claimed numbers
        if message_lower.startswith("!meeplebot claimed numbers"):
            await message.channel.send(claimed_numbers(sheet))

client.run(os.environ['TOKEN'])
