const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <strong>Total number of exercises {sum}</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part key={part.name} part={part} />;
    })}
  </>
);

const Course = ({ course }) => {
  const excerciseArray = course.parts.map((part) => {
    return part.exercises;
  });
  const totalExercises = () => {
    const total = excerciseArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    console.log("total for course", course.name, ":", total);
    return total;
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises()} />
    </>
  );
};
export default Course;
