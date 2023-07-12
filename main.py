import discord
import os

from discord import HTTPException
from discord import app_commands
from discord.ext import commands

from whitelist import whitelist_func
from change_username import change_username_func
from notify import notify_func
from whitelist_instructions import whitelist_instructions
from claimed_numbers import claimed_numbers_func
from claim_number import claim_number_func
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

client = commands.Bot(command_prefix="!", intents=discord.Intents.all())

pingStart = "@"
previousMessagesUsernames = ["", "", "", "", "", "", "", "", "", ""]
previousMessagesPackagerNumbers = ["", "", "", "", "", "", "", "", "", ""]


@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))
    try:
        synced = await client.tree.sync()
        print(f"Synced {len(synced)} commands(s)")
    except Exception as e:
        print(e)


@client.tree.command(name="whitelist")
@app_commands.describe(username="username")
async def whitelist(interaction: discord.Interaction, username: str):
    await interaction.response.send_message("Thinking...")
    await interaction.channel.send(whitelist_func(interaction, username, sheet))
    await interaction.edit_original_response(content="Done!")
    

@client.tree.command(name="change_username")
@app_commands.describe(new_username="new username")
async def change_username(interaction: discord.Interaction, new_username: str):
    await interaction.response.send_message(change_username_func(interaction, new_username, sheet))


@client.tree.command(name="notify")
async def notify(interaction: discord.Interaction):
    await interaction.response.send_message("Thinking...")
    await interaction.channel.send(notify_func(sheet, pingStart))
    await interaction.edit_original_response(content="Done!")


@client.tree.command(name="claimed_numbers")
async def claimed_numbers(interaction: discord.Interaction):
    await interaction.response.send_message(claimed_numbers_func(sheet))


@client.tree.command(name="claim_number")
@app_commands.describe(shuttle="# of packagers to put on shuttle", thruster="# of packagers to put on thruster")
async def claim_number(interaction: discord.Interaction, shuttle: int, thruster: int):
    await interaction.response.send_message(claim_number_func(interaction, shuttle, thruster, sheet))


@client.tree.command(name="random")
async def random(interaction: discord.Interaction):
    import random
    await interaction.response.send_message(random.randint(0, 1000000))


@client.tree.command(name="help")
async def help(interaction: discord.Interaction):
    await interaction.response.send_message("## List of commands (all commands start with the \/ prefix):\n### whitelist: adds your username to the queue.\n### change_username: changes the username recored.\n### claim_number: allows you to claim a packager number to put on your rocket and thruster.\n### claimed_numbers: shows the claimed packager numbers.")


@client.event
async def on_message(message):
    return
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
