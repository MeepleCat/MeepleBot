var1 = 0


def whitelist_instructions(previous_messages):
    found_match = False
    for i in range(10):
        if previous_messages[i].content == "----------\nPlease type \"!MeepleBot whitelist\" and then your ASTRONEER" \
                                          " username to get whitelisted.\n----------":
            found_match = True

    if not found_match:
        return "----------\nPlease type \"!MeepleBot whitelist\" and then your ASTRONEER username to get whitelisted." \
               "\n----------"

    else:
        return