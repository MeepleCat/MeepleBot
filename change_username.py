from get_column import get_column


def change_username(message, sheet):
    number_of_users = int(sheet.acell("L1").value)

    column_c = get_column("C", sheet, "digit")

    column_d = get_column("D", sheet, "digit")

    found_user = False
    user_row = -1
    for i in range(number_of_users):
        temp_id = str(column_c[i]) + str(column_d[i])
        print(f"- temp_id: {temp_id}\nauthorID: {message.author.id}")
        if str(temp_id) == str(message.author.id):
            found_user = True
            user_row = i
            print("--------------- FOUND USER ---------------")

    print(found_user)
    if found_user:
        content = [char for char in message.content]

        spaces = 0
        while spaces < 3:
            if content[0] == " ":
                spaces = spaces + 1

            del (content[0])

        name = ""
        while len(content) > 0:
            name = name + content[0]
            del (content[0])

        sheet.update_acell(f"B{user_row + 2}", name)

        return f"Your usernames has been changed to \"{name}\" successfully."

    else:
        return "You must submit your username in order to change it."
