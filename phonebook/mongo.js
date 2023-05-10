const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(`give argument as password`);
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://jxc136:${password}@phonebook.jj1skp6.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

if (newName && newNumber) {
  const person = new Person({
    name: `${newName}`,
    number: newNumber,
  });

  person.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
