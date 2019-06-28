import { createStore } from "redux";
import uuid from "uuid";

//create actions which are what are called when data needs to be changed but
// not necassarily HOW the data is changed.

//example will use a collection of People
// id,name, age, address. Age can be incremeneted by 10 or decreased by 10

//all actions must have TYPE atleast

//addPerson=({}) the {} inside of here must be object with default values
//if none are provided
const addPerson = ({ name = "", age = 10, address = "" } = {}) => ({
  type: "ADD_PERSON",
  person: {
    id: uuid(),
    name: name,
    age: age,
    address: address
  }
});

const editPerson = (id, updates) => ({
  type: "EDIT_PERSON",
  id: id,
  updates: updates
});
const deletePerson = id => ({
  type: "DELETE_PERSON",
  id: id
});

//Now to create the reducers

// default person object in case state is empty
const defaultPeopleState = [];

// REDUCERS Have to be pure functions which means they do not directly alter scope
const personReducer = (state = defaultPeopleState, action) => {
  switch (action.type) {
    case "ADD_PERSON":
      //if adding person, return a new array that first spreads out
      //the current state ...state and then adds new person (action.person)
      return [...state, action.person];

    case "DELETE_PERSON":
      // if deleting, return a new version of current state
      // without the person that is to be filtered out by id
      return state.filter(({ id }) => id !== action.id);

    case "EDIT_PERSON":
      return state.map(person => {
        if (person.id === action.id) {
          return { ...person, ...action.updates };
        } else {
          return person;
        }
      });
    default:
      return state;
  }
};

const store = createStore(personReducer);

store.subscribe(() => {
  console.log(store.getState());
});

//if you store the result of the dispatch like below it keeps the returned/created object
// in the variable. So addNewPerson.person.id will be available as it is used below
const addNewPerson = store.dispatch(
  addPerson({
    name: "Jason",
    age: 28,
    address: "1814 e main st"
  })
);
const addNewPerson2 = store.dispatch(
  addPerson({
    name: "Jason2",
    age: 28,
    address: "1814 e main st"
  })
);

const deletePerson1 = store.dispatch(deletePerson(addNewPerson.person.id));
const editPerson2 = store.dispatch(
  editPerson(addNewPerson2.person.id, { name: "Harry", age: 3213 })
);
