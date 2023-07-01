import time


def whitelist(message, message_lower, sheet):
    if message_lower.startswith("!meeplebot whitelist"):
        number_of_users = int(sheet.acell("K1").value)

        column_c = sheet.get(f"C2:C{number_of_users + 1}")
        for v in range(number_of_users):
            temp = ""
            cell = column_c[v]

            for b in range(len(cell)):
                if cell[b].isdigit():
                    temp = temp + cell[b]

            column_c[v] = temp

        column_d = sheet.get(f"D2:D{number_of_users + 1}")
        for v in range(number_of_users):
            temp = ""
            cell = column_d[v]

            for b in range(len(cell)):
                if cell[b].isdigit():
                    temp = temp + cell[b]

            column_d[v] = temp

        found_user = False
        for i in range(number_of_users):
            temp_id = str(column_c[i]) + str(column_d[i])
            print(f"- temp_id: {temp_id}\nauthorID: {message.author.id}")
            if str(temp_id) == str(message.author.id):
                found_user = True
                print("--------------- FOUND USER ---------------")

        print(found_user)
        if not found_user:
            content = [char for char in message.content]

            spaces = 0
            while spaces < 2:
                if content[0] == " ":
                    spaces = spaces + 1

                del (content[0])

            name = ""
            while len(content) > 0:
                name = name + content[0]
                del (content[0])

            # adds a new row to the sheet
            sheet.add_rows(1)

            number_of_users = number_of_users + 1

            # adds the users discord username to the sheet
            sheet.update_acell(f"A{number_of_users + 1}", str(message.author))

            # adds the users in-game username to the sheet
            sheet.update_acell(f"B{number_of_users + 1}", name)

            # adds the users ID to the sheet
            user_id = [char for char in str(message.author.id)]
            for i in range(len(user_id)):
                user_id[i - 1] = str(user_id[i - 1])

            id1 = ""
            for k in range(9):
                id1 = id1 + user_id[k]

            id2 = ""
            try:
                for k in range(10):
                    id2 = id2 + user_id[k + 9]
            except IndexError:
                for k in range(9):
                    id2 = id2 + user_id[k + 9]

            sheet.update_acell(f"C{number_of_users + 1}", id1)
            sheet.update_acell(f"D{number_of_users + 1}", id2)

            # updates the user's rocket ID
            sheet.update_acell(f"E{number_of_users + 1}", "null")

            # writes the user down as not whitelisted
            sheet.update_acell(f"F{number_of_users + 1}", "no")

            # writes the user down as never having been whitelisted
            sheet.update_acell(f"G{number_of_users + 1}", "0")

            # fills in the date the user joined
            sheet.update_acell(f"H{number_of_users + 1}", time.ctime())

            # fills in the row to determine if the user has been notified that they have been whitelisted
            sheet.update_acell(f"I{number_of_users + 1}", "no")

            # fills in the row saying that the user has not received the "Player" role
            sheet.update_acell(f"J{number_of_users + 1}", "no")

            return 1

        if found_user:
            return 0
