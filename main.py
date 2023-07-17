import discord
import os
import asyncio
# from discord import HTTPException
from discord import app_commands
from discord.ext import commands
from discord import Embed
from discord import Color
from determine_sheet import determine_sheet
from whitelist import whitelist_func
from change_username import change_username_func
from notify import notify_func
# from whitelist_instructions import whitelist_instructions
from claimed_numbers import claimed_numbers_func
from claim_number import claim_number_func
# from packager_instructions import packager_instructions
from keep_alive import keep_alive
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from dotenv import load_dotenv
load_dotenv()

scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]
credentials = ServiceAccountCredentials.from_json_keyfile_name("Google_Account.json", scopes)
# access the json key you downloaded earlier

file = gspread.authorize(credentials)
# authenticate the JSON key with gspread

testingSheet = file.open("TestingSpreadsheet")
testingSheet = testingSheet.sheet1

conquistadorsSheet = file.open("ConquistadorsWhitelist")
conquistadorsSheet = conquistadorsSheet.sheet1

lilUniverseSheet = file.open("LilUniverseWhitelist")
lilUniverseSheet = lilUniverseSheet.sheet1

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
    await interaction.response.defer()
    sheet = determine_sheet(interaction, testingSheet, conquistadorsSheet, lilUniverseSheet)
    await interaction.followup.send(embed = whitelist_func(interaction, username, sheet))


@client.tree.command(name="change_username")
@app_commands.describe(new_username="new username")
async def change_username(interaction: discord.Interaction, new_username: str):
    await interaction.response.defer()
    sheet = determine_sheet(interaction, testingSheet, conquistadorsSheet, lilUniverseSheet)
    await interaction.followup.send(embed = change_username_func(interaction, new_username, sheet))


@client.tree.command(name="notify")
async def notify(interaction: discord.Interaction):
    await interaction.response.defer()
    sheet = determine_sheet(interaction, testingSheet, conquistadorsSheet, lilUniverseSheet)
    await interaction.followup.send(embed = notify_func(sheet, pingStart))
    


@client.tree.command(name="claimed_numbers")
async def claimed_numbers(interaction: discord.Interaction):
    await interaction.response.defer()
    sheet = determine_sheet(interaction, testingSheet, conquistadorsSheet, lilUniverseSheet)
    await interaction.followup.send(embed = claimed_numbers_func(sheet))
    


@client.tree.command(name="claim_number")
@app_commands.describe(shuttle="# of packagers to put on shuttle", thruster="# of packagers to put on thruster")
async def claim_number(interaction: discord.Interaction, shuttle: int, thruster: int):
    await interaction.response.defer()
    sheet = determine_sheet(interaction, testingSheet, conquistadorsSheet, lilUniverseSheet)
    await interaction.followup.send(embed = claim_number_func(interaction, shuttle, thruster, sheet))
    


@client.tree.command(name="random")
async def random(interaction: discord.Interaction):
    import random
    await interaction.response.send_message(random.randint(0, 1000000))


@client.tree.command(name="express_rage")
async def express_rage(interaction: discord.Interaction):
    await interaction.response.send_message("**I am going to implode.**")


@client.tree.command(name="bot_help")
async def bot_help(interaction: discord.Interaction):
    embed = Embed(
        description="## List of commands (all commands start with the / prefix):\n### "
                                            "whitelist: adds your username to the queue.\n### change_username: "
                                            "changes the username recorded.\n### claim_number: allows you to claim a "
                                            "packager number to put on your rocket and thruster.\n### claimed_"
                                            "numbers: shows the claimed packager numbers.",
        color=Color.green()
    )
    await interaction.response.send_message(embed = embed)


keep_alive()
client.run(os.environ['TOKEN'])
