from get_column import get_column


def claim_number(message, sheet):
    number_of_users = int(sheet.acell("K1").value)
    number = [char for char in message.content]
    number_found = False

    column_c = get_column("C", sheet, "digit")
    column_d = get_column("D", sheet, "digit")

    while not number_found:
        if not number[0].isdigit():
            del (number[0])
        else:
            number_found = True

    temp = number
    number = ""

    for i in range(len(temp)):
        number = number + temp[i]

    claimed_numbers = sheet.get(f"E2:E{number_of_users}")
    print(f"number {number}")

    number_claimed = False
    for i in range(len(claimed_numbers)):
        temp1b = [char for char in str(claimed_numbers[i])]
        temp1 = temp1b[0]
        print(f"temp1 {temp1}")
        temp2 = ""
        for x in range(len(temp1)):
            print(f"temp1[x] {temp1[x]}")
            if temp1[x].isdigit():
                temp2 = temp2 + str(temp1[x])
            if temp1[x] == " ":
                temp2 = temp2 + str(temp1[x])
            if temp1[x] == ",":
                temp2 = temp2 + str(temp1[x])

        print(f"temp2 {temp2}")
        print(number == temp2)

        if number == temp2:
            number_claimed = True

    user_id = str(message.author.id)

    exists_in_list = False
    user_row = 0
    for i in range(number_of_users):
        temp_id = str(column_c[i] + column_d[i])
        if temp_id == user_id:
            exists_in_list = True
            print("found the user in the spreadsheet")
            user_row = i + 2

    if not number_claimed and exists_in_list:
        sheet.update_acell(f"E{user_row}", number)
        return f"You have successfully claimed {number} as your rocket ID#."
    elif number_claimed:
        return "The number you tried to claim has already been claimed. Please try again with a different number."
    elif not exists_in_list:
        return "You must submit your username in the usernames channel before you can claim a packager number."
