def packager_instructions(previous_messages):
    found_match = False
    for i in range(10):
        if previous_messages[i] == "----------\nPlease type \"!MeepleBot claimed numbers\" to see the " \
                                               "list of claimed numbers.\nYou may also type \"!MeepleBot claim " \
                                               "number\" followed by the number you wish to claim expressed as a " \
                                               "pair in the format (a, b) to claim a number for yourself (ex. " \
                                               "!MeepleBot claim number 1, 4).\n----------":
            found_match = True

    if not found_match:
        return "----------\nPlease type \"!MeepleBot claimed numbers\" to see the list of claimed numbers.\nYou " \
                   "may also type \"!MeepleBot claim number\" followed by the number you wish to claim expressed as " \
                   "a pair in the format (a, b) to claim a number for yourself (ex. !MeepleBot claim number 1, " \
                   "4).\n----------"

    else:
        return
