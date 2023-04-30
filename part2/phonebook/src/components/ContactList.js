const ContactList = ({
  filteredName,
  persons,
  filteredPersons,
  handleDelete,
}) => {
  return (
    <div>
      {filteredName.length > 0 ? (
        <div>
          {" "}
          {filteredPersons.map((person) => {
            return (
              <p key={person.id}>
                {person.name}: {person.number}
              </p>
            );
          })}{" "}
        </div>
      ) : (
        <div>
          {persons.map((person) => {
            return (
              <p key={person.id}>
                {person.name}: {person.number}{" "}
                <button onClick={() => handleDelete(person.id, person.name)}>
                  delete
                </button>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContactList;
