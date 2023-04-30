const Form = ({ handleNameChange, handleNumberChange, addPerson }) => {
  console.log(handleNameChange, handleNumberChange, addPerson);

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
