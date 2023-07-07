import discord
import os

from discord import HTTPException

from whitelist import whitelist
from change_username import change_username
from notify import notify
from whitelist_instructions import whitelist_instructions
from claimed_numbers import claimed_numbers
from claim_number import claim_number
from packager_instructions import packager_instructions
from keep_alive import keep_alive

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
previousMessagesUsernames = ["", "", "", "", "", "", "", "", "", ""]
previousMessagesPackagerNumbers = ["", "", "", "", "", "", "", "", "", ""]


@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))


@client.event
async def on_message(message):
    message_lower = message.content.lower()

    # prints the message and it's details to the console
    print(f"----------\nserver: {message.guild}\nchannel: {message.channel}\nauthor: {message.author}\ncontent: "
          f"{message.content}")

    # runs the code for messages in channels called "usernames"
    if str(message.channel) == "usernames":
        # determines the previous messages in the "usernames" channel
        global previousMessagesUsernames
        for i in range(9):
            previousMessagesUsernames[9 - i] = previousMessagesUsernames[8 - i]
        previousMessagesUsernames[0] = message.content

        # runs the code for the Whitelist command
        if message_lower.startswith("!meeplebot whitelist"):
            await message.channel.send(whitelist(message, sheet))

        # runs the code to allow the user to change their username
        if message_lower.startswith("!meeplebot change username"):
            await message.channel.send(change_username(message, sheet))

        # runs the code for the Notify command
        if message_lower.startswith("!meeplebot notify"):
            global pingStart
            await message.channel.send(notify(sheet, pingStart))

        # reposts the instructions message
        try:
            await message.channel.send(whitelist_instructions(previousMessagesUsernames))
        except HTTPException:
            return

    # runs the code for messages in channels called "packager-numbers"
    if str(message.channel) == "packager-numbers":
        # determines the previous messages in the "packager-numbers" channel
        global previousMessagesPackagerNumbers
        for i in range(9):
            previousMessagesPackagerNumbers[9 - i] = previousMessagesPackagerNumbers[8 - i]
        previousMessagesPackagerNumbers[0] = message.content

        # shows the claimed numbers
        if message_lower.startswith("!meeplebot claimed numbers"):
            await message.channel.send(claimed_numbers(sheet))

        # allows the user to claim a number
        if message_lower.startswith("!meeplebot claim number"):
            await message.channel.send(claim_number(message, sheet))

        # reposts the instructions message
        try:
            await message.channel.send(packager_instructions(previousMessagesPackagerNumbers))
        except HTTPException:
            return

keep_alive()
client.run(os.environ['TOKEN'])
