import discord
import os

from discord import HTTPException

from whitelist import whitelist
from notify import notify
from whitelist_instructions import whitelist_instructions
from claimed_numbers import claimed_numbers
from claim_number import claim_number
from packager_instructions import packager_instructions

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

pingStart = "@"
previousMessages = ["", "", "", "", "", "", "", "", "", ""]


@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))
    global previousMessages


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
    previousMessages[0] = message.content

    if message.author == client.user:
        return

    # runs the code for messages in channels called "usernames"
    if str(message.channel) == "usernames":
        # runs the code for the Whitelist command
        if message_lower.startswith("!meeplebot whitelist"):
            print(99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999)
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

        # allows the user to claim a number
        if message_lower.startswith("!meeplebot claim number"):
            await message.channel.send(claim_number(message, sheet))

        # reposts the instructions message
        try:
            await message.channel.send(packager_instructions(previousMessages))
        except HTTPException:
            return
client.run(os.environ['TOKEN'])
