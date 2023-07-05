from get_column import get_column


def notify(sheet, ping_start):
    number_of_users = int(sheet.acell("L1").value)
    people_to_notify = []

    column_f = get_column("G", sheet, "alpha")

    column_i = get_column("J", sheet, "alpha")

    column_c = get_column("C", sheet, "digit")

    column_d = get_column("D", sheet, "digit")

    column_e = get_column("E", sheet, "digit")

    for b in range(len(column_c)):
        first_half = [char for char in column_c[b]]
        while len(first_half) < 9:
            first_half.insert(0, "0")

        temp = ""
        for r in range(len(first_half)):
            temp = temp + str(first_half[r])

        column_c[b] = temp

        second_half = [char for char in column_d[b]]
        if column_e == 18:
            while len(second_half) < 9:
                second_half.insert(0, "0")
        elif column_e == 19:
            while len(second_half) < 10:
                second_half.insert(0, "0")

        temp = ""
        for r in range(len(second_half)):
            temp = temp + str(second_half[r])

        column_d[b] = temp

    ids = []
    for q in range(number_of_users):
        ids.append(str(column_c[q]) + str(column_d[q]))

    for i in range(number_of_users):
        print(f"checked the {i}th column in the list")
        print(f"Column C: {column_c[i]} ----- Column D: {column_d[i]}")
        print(f"Column G: {column_f[i]} ----- Column J: {column_i[i]}")

        if column_f[i] == "yes":
            if column_i[i] == "no":
                print(f"The user in row {i} has not been whitelisted.")
                people_to_notify.append(f"<{ping_start}{ids[i]}")
                sheet.update_acell(f"J{i + 2}", "yes")
                times_whitelisted = int(sheet.acell(f"H{i + 2}").value) + 1
                sheet.update_acell(f"H{i + 2}", times_whitelisted)

    if len(people_to_notify) != 0:
        message = ""
        for i in range(len(people_to_notify)):
            message = message + people_to_notify[i] + ">, "
        message = message + "you have been whitelisted."
        return message

    else:
        return "There is no one to notify."
