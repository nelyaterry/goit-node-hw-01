const fs = require("fs/promises");
const path = require("path");
const uuid4 = require("uuid4");

const contactsPath = path.normalize(__dirname + "/db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  } catch (error) {
    console.log("Oops!", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    return contact ? contact : null;
  } catch (error) {
    console.log("Oops!", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    const updatedContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return contact;
  } catch (error) {
    console.log("Oops!", error.message);
  }
};

const addContact = async (name, email, phone) => {
  const newContact = { id: uuid4(), name, email, phone };
  try {
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log("Oops!", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
