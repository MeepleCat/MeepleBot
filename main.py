import discord
import os
import random
import time

# from keep_alive import keep_alive

import gspread
from oauth2client.service_account import ServiceAccountCredentials

pingStart = "@"

scopes = [
'https://www.googleapis.com/auth/spreadsheets',
'https://www.googleapis.com/auth/drive'
]
credentials = ServiceAccountCredentials.from_json_keyfile_name("Google_Account.json", scopes) #access the json key you downloaded earlier 

file = gspread.authorize(credentials) # authenticate the JSON key with gspread
sheet = file.open("ConquistadorsWhitelist") #open sheet
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


@client.event
async def on_ready():
  print("We have logged in as {0.user}".format(client))


@client.event
async def on_message(message):
  message_lower = message.content.lower()

client.run(os.environ['TOKEN'])
