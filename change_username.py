from get_column import get_column


def change_username_func(interaction, new_username, sheet):
    number_of_users = int(sheet.acell("L1").value)

    column_c = get_column("C", sheet, "digit")

    column_d = get_column("D", sheet, "digit")

    found_user = False
    user_row = -1
    for i in range(number_of_users):
        temp_id = str(column_c[i]) + str(column_d[i])
        print(f"- temp_id: {temp_id}\nauthorID: {interaction.user.id}")
        if str(temp_id) == str(interaction.user.id):
            found_user = True
            user_row = i
            print("--------------- FOUND USER ---------------")

    print(found_user)
    if found_user:
        sheet.update_acell(f"B{user_row + 2}", new_username)

        return f"Your usernames has been changed to \"{new_username}\" successfully."

    else:
        return "You must submit your username in order to change it."
