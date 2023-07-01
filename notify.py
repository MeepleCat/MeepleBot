from main import pingStart
from get_column import get_column


def notify(message, sheet):
    number_of_users = int(sheet.acell("K1").value) + 1
    people_to_notify = []

    column_f = get_column("F", sheet, "alpha")

    column_i = get_column("I", sheet, "alpha")

    column_c = get_column("C", sheet, "digit")

    column_d = get_column("D", sheet, "digit")

    ids = []
    for q in range(number_of_users - 1):
        ids.append(str(column_c[q]) + str(column_d[q]))

    for i in range(number_of_users - 1):
        print(f"checked the {i}th column in the list")
        print(f"Column F: {column_f[i]} ----- Column I: {column_i[i]}")

        if column_f[i] == "yes":
            if column_i[i] == "no":
                print(f"The user in row {i} has not been whitelisted.")
                people_to_notify.append(f"<{pingStart}{ids[i]}")
                sheet.update_acell(f"I{i + 2}", "yes")
                times_whitelisted = int(sheet.acell(f"G{i + 2}").value) + 1
                sheet.update_acell(f"G{i + 2}", times_whitelisted)

    if len(people_to_notify) != 0:
        message = ""
        for i in range(len(people_to_notify)):
            message = message + people_to_notify[i] + ", "
        message = message + "you have been whitelisted."
        return message

    else:
        return "There is no one to notify."
