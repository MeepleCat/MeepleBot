def get_column(column, sheet, mode):
    number_of_users = int(sheet.acell("K1").value)
    temp_column = sheet.get(f"{column}2:{column}{number_of_users + 1}")

    if mode == "alpha":
        for v in range(number_of_users - 1):
            temp = ""
            cell = temp_column[v]

            for b in range(len(cell)):
                if cell[b].isalpha():
                    temp = temp + cell[b]

            temp_column[v] = temp

    if mode == "digit":
        for v in range(number_of_users - 1):
            temp = ""
            cell = temp_column[v]

            for b in range(len(cell)):
                if cell[b].isdigit():
                    temp = temp + cell[b]

            temp_column[v] = temp

    return temp_column
