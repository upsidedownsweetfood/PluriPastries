export function returnHelpText() {
  return "# Howdy user, welcome to pluralcake\n" +
    "pluralcake is a bot that allows you to send messages as your system's Members, with a custom profile picture, tag and nickname. \n" +
    "It's pretty much a work in progress, and doesn't allow you to edit or delete messages, and to send pictures." +
    "The currently available commands are : \n" +
    "### Members:\n" +
    "- list | allows you to see your currently available Members.\n" +
    "- create <'name of the Member'> <'your Member's tag'>| Allows you to add a Member\n" +
    "- delete <'name of the Member'> | Deletes the choosen Member\n" +
    "- name <'name of the Member'> | Changes the choosen Member's name\n" +
    "- avatar <'Member's name'> <'picture url'> | Allows you to edit your Member's profile picture\n" +
    "- color <'Member's name'> <'color hex'> | Allows you to change the color of your Member ( may be integrated with the future website )\n"+
    "### Migrations\n"+
    "- tupper < Json file attached > | Migrates your Member from tupper"
}
