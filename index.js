const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "get":
      const getContact = await getContactById(id);

      detContact
        ? console.log(getContact)
        : console.log("Sorry!  I don't see this id ");
      break;

    case "add":
      const addContacts = await addContact(name, email, phone);
      console.log(addContacts);
      break;

    case "remove":
      const removeContacts = await removeContact(id);
      removeContacts
        ? console.log("Deleted contact", removeContacts)
        : console.log("Sorry!  I don't see this id ");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
