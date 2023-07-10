from get_column import get_column


def claim_number_func(interaction, shuttle, thruster, sheet):
    number_of_users = int(sheet.acell("L1").value)

    column_c = get_column("C", sheet, "digit")
    column_d = get_column("D", sheet, "digit")

    number = str(shuttle) + ", " + str(thruster)

    claimed_numbers = get_column("F", sheet)
    print(f"number {number}")

    number_claimed = False
    for i in range(len(claimed_numbers)):
        if number == claimed_numbers[i]:
            number_claimed = True

    user_id = str(interaction.user.id)

    exists_in_list = False
    user_row = 0
    for i in range(number_of_users):
        temp_id = str(column_c[i] + column_d[i])
        if temp_id == user_id:
            exists_in_list = True
            user_row = i + 2

    if not number_claimed and exists_in_list:
        sheet.update_acell(f"F{user_row}", number)
        return f"You have successfully claimed {number} as your rocket ID#."
    elif number_claimed:
        return "The number you tried to claim has already been claimed. Please try again with a different number."
    elif not exists_in_list:
        return "You must submit your username in the usernames channel before you can claim a packager number."
