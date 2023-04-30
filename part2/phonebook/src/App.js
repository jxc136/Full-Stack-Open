import { useState, useEffect } from "react";
import Form from "./components/Form";
import personsService from "./services/persons";
import SearchFilter from "./components/SearchFilter";
import ContactList from "./components/ContactList";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(null);
  const [message, setMessage] = useState(null);

  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filteredName, setFilteredName] = useState("");

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((initialList) => {
      console.log("promise fulfilled");
      setPersons(initialList);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (checkNewName(personObject)) {
      const confirmUpdate = window.confirm(
        ` ${personObject.name} is already added to phonebook. Would you like to update their number?`
      );
      if (confirmUpdate) {
        personsService.findByName(personObject.name).then((returnedPerson) => {
          handleUpdate(returnedPerson);
        });
      }
    } else {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber(null);
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const checkNewName = (newPerson) => {
    const currentNames = persons.map((person) => person.name.toLowerCase());
    return currentNames.includes(newPerson.name.toLowerCase());
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const filterByNames = (event) => {
    setFilteredName(event.target.value.toLowerCase());
    const filteredNames = persons.filter((person) => {
      const lowercase = person.name.toLowerCase();
      return lowercase.includes(event.target.value.toLowerCase());
    });
    setFilteredPersons(filteredNames);
    console.log("filtered names:", filteredNames);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleUpdate = (foundPerson) => {
    if (!foundPerson || !foundPerson[0] || !foundPerson[0].id) {
      setMessage(
        `The contact you are trying to change was not found on the server`
      );
      return;
    }
    const changedPerson = { ...foundPerson[0], number: newNumber };
    personsService
      .update(foundPerson[0].id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== foundPerson[0].id ? person : returnedPerson
          )
        );
        setMessage(`Updated ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        if (error.status === 404) {
          setMessage(`the contact you are trying to update cannot be found`);
        } else {
          setMessage(`An error occured while updating your contact`);
        }
      });
  };
  const handleDelete = (id, person) => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${person}?`
    );
    if (shouldDelete) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter filterByNames={filterByNames} />
      <h2>Add New Number</h2>
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ContactList
        persons={persons}
        filteredPersons={filteredPersons}
        filteredName={filteredName}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
