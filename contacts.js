const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function parseContacts() {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8', (error) => {
            if (error) return console.log(error);
        });
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error.message);
    }
}

async function listContacts() {
    try {
        const contacts = await parseContacts();
        console.table(contacts)
    } catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await parseContacts()
        const contactById = contacts.find(({ id }) => id === contactId)
        console.table(contactById)
    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await parseContacts()
        const contactById = contacts.find(({ id }) => id === contactId)
        const filteredContacts = contacts.filter(({ id }) => id !== contactId)
        
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
        console.table(filteredContacts)
    } catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await parseContacts()
        const newListContacts = [...contacts, newContact];
        const newContact = { id: uuidv4(), name, email, phone };
        await fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2))
        
        console.table(newContact)
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = { listContacts ,getContactById, removeContact, addContact};