export function returnHelpText() {
  return "# Howdy user, welcome to pluralcake\n" +
    "pluralcake is a bot that allows you to send messages as your Alters, with a custom profile picture, tag and nickname. \n" +
    "It's pretty much a work in progress, and doesn't allow you to edit or delete messages, and to send pictures." +
    "The currently available commands are : \n" +
    "### Alters:\n" +
    "- list | allows you to see your currently available alters.\n" +
    "- create <'name of the alter'> <'your alter s tag'>| Allows you to create your Alters\n" +
    "- delete <'name of the alter'> | Deletes the choosen Alter\n" +
    "- name <'name of the alter'> | Changes the choosen Alter's name\n" +
    "- avatar <'Alter's name'> <'picture url'> | Allows you to edit your alter's profile picture\n" +
    "- color <'Alter's name'> <'color hex'> | Allows you to change the color of your alter ( may be integrated with the future website )\n"+
    "### Migrations\n"+
    "- pluralkit < Json file attached > | Migrates your alters from pluralkit to pluralcake"
}
