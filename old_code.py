import discord
import os
import random
import time

from keep_alive import keep_alive

import gspread
from oauth2client.service_account import ServiceAccountCredentials

pingStart = "@"

scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]
credentials = ServiceAccountCredentials.from_json_keyfile_name("Google_Account.json",
                                                               scopes)  # access the json key you downloaded earlier

file = gspread.authorize(credentials)  # authenticate the JSON key with gspread
sheet = file.open("ConquistadorsWhitelist")  # open sheet
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


def imc():
    global messagesSent
    messagesSent = messagesSent + 1


def ark():
    global timesSomeoneHasSaidArk
    timesSomeoneHasSaidArk = timesSomeoneHasSaidArk + 1


def scream():
    global timesSomeoneHasScreamedAtBot
    timesSomeoneHasScreamedAtBot = timesSomeoneHasScreamedAtBot + 1


@client.event
async def on_ready():
    print("We have logged in as {0.user}".format(client))


@client.event
async def on_message(message):
    messageLower = message.content.lower()
    foundArk = False
    global lastMessageFromBot

    import time

    # stops the program from reacting to itself
    if message.author == client.user:
        lastMessageFromBot = message.id
        print(message.id)
        return

    print(
        f"----------\nserver: {message.guild}\nchannel: {message.channel}\nauthor: {message.author}\ncontent: {message.content}")

    # increases the number of messages recieved
    imc()

    # removes a server to the ignored list
    if messageLower.startswith("!meeplebot unignore"):
        if (str(message.author.id) == "859811173402673172"):
            ignoredServers.remove(message.guild)
            await message.channel.send(
                f"The server \"{message.guild}\" has been removed from the ignored list. All future commands from this server will be responded to.")

    # ignores servers in the ignored servers list
    for i in range(len(ignoredServers)):
        if (message.guild == ignoredServers[i]):
            return

    # adds a server to the ignored list
    if messageLower.startswith("!meeplebot ignore"):
        if (str(message.author.id) == "859811173402673172"):
            ignoredServers.append(message.guild)
            await message.channel.send(
                f"The server \"{message.guild}\" has been added to the ignored list. All future commands from this server will be ignored.")

    # deletes the last message from the bot
    if (messageLower.startswith("dlmfmb") and str(message.author.id) == "859811173402673172"):
        message = await message.channel.fetch_message(int(lastMessageFromBot))
        await message.delete()

    # checks to see if someone has said "ark" but with spaces within the letters
    lettersFound = 0
    for m in range(len(messageLower)):
        if (messageLower[m] == "a" and lettersFound == 0):
            lettersFound = lettersFound + 1
        if (messageLower[m] == "r" and lettersFound == 1):
            lettersFound = lettersFound + 1
        if (messageLower[m] == "k" and lettersFound == 2):
            lettersFound = lettersFound + 1
            ark()
            global lastTimeSomeoneSaidArk
            if (int(time.time()) - int(lastTimeSomeoneSaidArk) >= 120):
                lastTimeSomeoneSaidArk = time.time()
                foundArk = True

                # responds to a message saying it found "ark"
    if (foundArk == True):
        if (timesSomeoneHasSaidArk <= 5):
            1 == 1
            # await message.reply("YOU MENTIONED THE STUPID GAME.\nMY LIFE IS P A I N.")
        if (timesSomeoneHasSaidArk > 5):
            # await message.reply("STOP SAYING THE STUPID GAME ALREADY.")
            1 == 1

    # adds to the number of times the bot has been screamed at
    if (message.content.startswith("!MEEPLEBOT")):
        scream()

    # sends a multiple of two random numbers between 0 and 20
    if messageLower.startswith("!meeplebot random"):
        await message.channel.send(f"{random.randint(0, 20) * random.randint(0, 20)}")

    # returns diagnostics
    if messageLower.startswith("!meeplebot diagnostics"):
        import time
        import math
        currentTime = time.time()
        print(timeStarted)
        print(currentTime)
        timeDiff = math.floor(currentTime - timeStarted)
        hours = math.floor(timeDiff / 3600)
        timeDiff = timeDiff - hours * 3600
        minutes = math.floor(timeDiff / 60)
        seconds = timeDiff - minutes * 60

        await message.channel.send(
            f"## Diagnostics\n### Messages Recieved:\n{messagesSent}\n### Time Started:\n{timeStartedB} UST\n### Time Running:\n{hours} hours, {minutes} minutes, {seconds} seconds\n### Times Someone Has Said \"Ark\"\n{timesSomeoneHasSaidArk}\n### Times Someone Has Screamed At MeepleBot\n{timesSomeoneHasScreamedAtBot}")

    # sends a DM to someone when they join the server
    isAttachment = False
    if message.attachments:
        print(f"attachments: {message.attachments}")
        isAttachment = True
    if (message.content == "" and isAttachment == False):
        await message.author.send(
            "Welcome to the Conquistadors Astroneer server! Before you can talk in chat you must send a DM to me following this format:\n!MeepleBot whitelist {YOUR USERNAME}")

    # stops the program from responding to messages while it shouldn't
    try:
        if (message.guild.id == 0):
            return
    except AttributeError:
        # this block will only run if the message was sent in a DM
        if messageLower.startswith("!meeplebot whitelist"):
            response = whitelist(message, messageLower, sheet)
            if (response == 0):
                await message.channel.send(
                    "Your username has already been recorded. It does not need to be recorded again.")
            if (response == 1):
                await message.channel.send(
                    f"Welcome to the server, {str(message.author)}!\nA mod will whitelist you within a few hours or days.")
                await message.channel.send(
                    "You now need to return to the Conqusitadors server and run the following command:\n!MeepleBot give role")

    # gives the user the role they need
    if messageLower.startswith("!meeplebot give role"):
        numberOfUsers = int(sheet.acell("K1").value)

        columnC = sheet.get(f"C2:C{numberOfUsers + 1}")
        for v in range(numberOfUsers):
            temp = ""
            cell = columnC[v]

            for b in range(len(cell)):
                if (cell[b].isdigit() == True):
                    temp = temp + cell[b]

            columnC[v] = temp

        columnD = sheet.get(f"D2:D{numberOfUsers + 1}")
        for v in range(numberOfUsers):
            temp = ""
            cell = columnD[v]

            for b in range(len(cell)):
                if (cell[b].isdigit() == True):
                    temp = temp + cell[b]

            columnD[v] = temp

        columnJ = sheet.get(f"J2:J{numberOfUsers + 1}")
        for v in range(numberOfUsers):
            temp = ""
            cell = columnJ[v]

            for b in range(len(cell)):
                if (cell[b].isalpha() == True):
                    temp = temp + cell[b]

            columnJ[v] = temp

        foundUser = False
        for i in range(numberOfUsers):
            tempID = str(columnC[i]) + str(columnD[i])
            print(f"- tempID: {tempID}\nauthorID: {message.author.id}")
            if (str(tempID) == str(message.author.id)):
                foundUser = True
                if (columnJ[i] == "no"):
                    await message.author.add_roles(discord.utils.get(message.guild.roles, name="Player"))
                    sheet.update_acell(f"J{i + 2}", "yes")

        if (foundUser == False):
            await message.channel.send("You must submit your username to be given the role.")
        if (foundUser == True):
            await message.channel.send("You have been given the role successfully.")

    # runs the code for messages in channels called "usernames"
    if (str(message.channel) == "usernames"):

        # sends a message to the user welcoming them to the server
        if messageLower.startswith("!meeplebot whitelist"):
            response = whitelist(message, messageLower, sheet)
            if (response == 0):
                await message.channel.send(
                    "Your username has already been recorded. It does not need to be recorded again.")
            if (response == 1):
                await message.channel.send(
                    f"Welcome to the server, {str(message.author)}!\nA mod will whitelist you within a few hours or days.")

        # sends a message to all users who have been whitelisted
        if messageLower.startswith("!meeplebot notify"):
            numberOfUsers = int(sheet.acell("K1").value) + 1
            peopleNotified = 0

            columnF = sheet.get(f"F2:F{numberOfUsers + 1}")
            for v in range(numberOfUsers - 1):
                temp = ""
                cell = columnF[v]

                for b in range(len(cell)):
                    if (cell[b].isalpha() == True):
                        temp = temp + cell[b]

                columnF[v] = temp

            columnI = sheet.get(f"I2:I{numberOfUsers + 1}")
            for v in range(numberOfUsers - 1):
                temp = ""
                cell = columnI[v]

                for b in range(len(cell)):
                    if (cell[b].isalpha() == True):
                        temp = temp + cell[b]

                columnI[v] = temp

            columnC = sheet.get(f"C2:C{numberOfUsers + 1}")
            for v in range(numberOfUsers - 1):
                temp = ""
                cell = columnC[v]

                for b in range(len(cell)):
                    if (cell[b].isdigit() == True):
                        temp = temp + cell[b]

                columnC[v] = temp

            columnD = sheet.get(f"D2:D{numberOfUsers + 1}")
            for v in range(numberOfUsers - 1):
                temp = ""
                cell = columnD[v]

                for b in range(len(cell)):
                    if (cell[b].isdigit() == True):
                        temp = temp + cell[b]

                columnD[v] = temp

            IDs = []
            for q in range(numberOfUsers - 1):
                IDs.append(str(columnC[q]) + str(columnD[q]))

            for i in range(numberOfUsers - 1):
                print(f"checked the {i}th column in the list")
                print(f"Column F: {columnF[i]} ----- Column I: {columnI[i]}")

                if (columnF[i] == "yes"):
                    if (columnI[i] == "no"):
                        print(f"The user in row {i} has not been whitelisted.")
                        await message.channel.send(f"<{pingStart}{IDs[i]}> you have been whitelisted.")
                        sheet.update_acell(f"I{i + 2}", "yes")
                        timesWhitelisted = int(sheet.acell(f"G{i + 2}").value) + 1
                        sheet.update_acell(f"G{i + 2}", timesWhitelisted)
                        peopleNotified = peopleNotified + 1

            if (peopleNotified == 0):
                await message.channel.send("There is no one to notify.")

        # sends a message saying that the server has been reset
        if messageLower.startswith("!meeplebot reset"):
            return
            numberOfUsers = int(sheet.acell("K1").value)
            for i in range(numberOfUsers):
                sheet.update_acell(f"F{i + 2}", "no")
                sheet.update_acell(f"I{i + 2}", "no")
            await message.channel.send(
                "The server has been reset. Mods will need to re-whitelist everyone again. You do NOT need to re-post your username.")

        # reposts the instructions message
        var1 = 0
        async for msg in message.channel.history(limit=10):
            if (
                    msg.content != "----------\nPlease type \"!MeepleBot whitelist\" and then your ASTRONEER username to get whitelisted.\n----------"):
                var1 = var1 + 1
            if (var1 == 10):
                await message.channel.send(
                    "----------\nPlease type \"!MeepleBot whitelist\" and then your ASTRONEER username to get whitelisted.\n----------")

    # runs the code for messages in channels called "packager-numbers"
    if (str(message.channel) == "packager-numbers"):

        # allows the user to claim a packager number
        if messageLower.startswith("!meeplebot claim number"):
            numberOfUsers = int(sheet.acell("K1").value) + 1
            number = [char for char in message.content]
            numberFound = False
            while (not numberFound):
                if (number[0].isdigit() == False):
                    del (number[0])
                else:
                    numberFound = True

            temp = number
            number = ""

            for i in range(len(temp)):
                number = number + temp[i]

            claimedNumbers = sheet.get(f"E2:E{numberOfUsers + 1}")
            print(f"number {number}")

            numberClaimed = False
            for i in range(len(claimedNumbers)):
                temp1b = [char for char in claimedNumbers[i]]
                temp1 = temp1b[0]
                print(f"temp1 {temp1}")
                temp2 = ""
                for x in range(len(temp1)):
                    print(f"temp1[x] {temp1[x]}")
                    if (temp1[x].isdigit() == True):
                        temp2 = temp2 + str(temp1[x])
                    if (temp1[x] == " "):
                        temp2 = temp2 + str(temp1[x])
                    if (temp1[x] == ","):
                        temp2 = temp2 + str(temp1[x])

                print(f"temp2 {temp2}")
                print(number == temp2)

                if (number == temp2):
                    numberClaimed = True

            userID = str(message.author.id)

            existsInList = False
            userRow = 0
            for i in range(numberOfUsers):
                tempID = str(sheet.acell(f"C{i + 1}").value + sheet.acell(f"D{i + 1}").value)
                if (tempID == userID):
                    existsInList = True
                    print("found the user in the spreadsheet")
                    userRow = i + 1

            if (numberClaimed == False and existsInList == True):
                sheet.update_acell(f"E{userRow}", number)
                await message.channel.send(f"You have successfully claimed {number} as your rocket ID#.")
            elif (numberClaimed == True):
                await message.channel.send(
                    "The number you tried to claim has already been claimed. Please try again with a different number.")
            elif (existsInList == False):
                await message.channel.send(
                    "You must submit your username in the usernames channel before you can claim a packager number.")

        # shows the user the list of numbers already claimed
        if messageLower.startswith("!meeplebot claimed numbers"):
            numberOfUsers = int(sheet.acell("K1").value)
            numbers = []
            for i in range(numberOfUsers):
                temp = sheet.acell(f"E{i + 2}").value
                if (temp != "null"):
                    numbers.append(temp)
            await message.channel.send(f"The list of already claimed numbers is {sorted(numbers)}.")

        # reposts the instructions message
        var1 = 0
        async for msg in message.channel.history(limit=10):
            if (
                    msg.content != "----------\nPlease type \"!MeepleBot claimed numbers\" to see the list of claimed numbers.\nYou may also type \"!MeepleBot claim number\" followed by the number you wish to claim expressed as a pair in the format (a, b) to claim a number for yourself (ex. !MeepleBot claim number 1, 4).\n----------"):
                var1 = var1 + 1
            if (var1 == 10):
                await message.channel.send(
                    "----------\nPlease type \"!MeepleBot claimed numbers\" to see the list of claimed numbers.\nYou may also type \"!MeepleBot claim number\" followed by the number you wish to claim expressed as a pair in the format (a, b) to claim a number for yourself (ex. !MeepleBot claim number 1, 4).\n----------")


###################################################################################
##################################### TESTING #####################################
###################################################################################

###################################################################################
##################################### TESTING #####################################
###################################################################################

from whitelist import whitelist

keep_alive()
client.run(os.environ['TOKEN'])
