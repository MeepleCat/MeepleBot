def get_column(column, sheet, mode="none"):
    number_of_users = int(sheet.acell("L1").value)
    temp_column = sheet.get(f"{column}2:{column}{number_of_users + 1}")

    if mode == "alpha":
        for v in range(number_of_users):
            temp = ""
            cell = [char for char in str(temp_column[v])]

            for b in range(len(cell)):
                if cell[b].isalpha() or cell[b] == " ":
                    temp = temp + cell[b]

            temp_column[v] = temp

    if mode == "digit":
        for v in range(number_of_users):
            temp = ""
            cell = [char for char in str(temp_column[v])]
            for b in range(len(cell)):
                if cell[b].isdigit() or cell[b] == " ":
                    temp = temp + str(cell[b])

            temp_column[v] = temp

    if mode == "none":
        for v in range(number_of_users):
            temp = ""
            cell = [char for char in str(temp_column[v])]
            for b in range(len(cell)):
                if cell[b] != "[" and cell[b] != "]" and cell[b] != "'":
                    temp = temp + str(cell[b])

            temp_column[v] = temp

    return temp_column
