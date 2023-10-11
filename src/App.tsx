// ~~~ IMPORTS ~~~
import React from "react";
import { useState } from "react";
import "./App.css";
import { Todo } from "./model";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// *************************** TYPESCRIPT TUTORIAL NOTES*************************************
// ~~~ TYPESCRIPT ~~~
// - Must explicitly define the type of variable
// - Syntax:
// ~~~ String ~~~
let name: string = "Heni";
// ~~~ Number ~~~
let age: number;
// ~~~ Boolean ~~~
let isStudent: boolean;
// ~~~ Array of strings ~~~
let hobbies: string[];
// ~~~ Array of numbers ~~~
let level: number[];
// ~~~ Tuple ~~~
// - contains fixed amount values and types that are defined during declaration
let role: [number, string];
// - assign values
role = [1, "Zoro"];

// ~~~ Define an OBJECT ~~~
// - When defining an object use TYPE or INTERFACE KEYWORD
// - Must enter all values of defined properties in the OBJECT
type Person = {
  name: string;
  age: number;
  // age?: number; /* ADD A ? TO DEFINE A PROPERTY AS OPTIONAL ONLY */
};
// - assign values
let person: Person = {
  name: "Zoro",
  age: 21,
};

// ~~~ VARIABLE that contains an already defined OBJECT ~~~
// - Assign type of ARRAY to the Person OBJECT
// let lotsOfPeople: Person[];

// ~~~ UNION ~~~~
//  - Used when we want to add to an already defined variable
// let age: number | string;
// - assign values
// age = "five";
// age = "5";

// ~~~ Define a FUNCTION ~~~
// function printName(name: string) {
//   console.log(name);
// }
// - assign values
// printName("Zoro");

// ~~~ Declaring a FUNCTION TYPE ~~~
// 1 )
// let printName: Function;
// 2 ) Better practice for assigning a FUNCTION
//  - properly define the function of how many things it will contain
let printName: (name: string) => void;
// - Better practice to use 'UNKNOWN' TYPE instead of 'ANY' when we don't know what the TYPE is.
// let personName: unknown;
// - 'VOID' returns UNDEFINED -  'NEVER' returns nothing
// let printName: (name: string) => never;

// ~~~ INTERFACE ~~~~
interface Girl {
  name: string;
  age?: number;
}

// - INTERFACE can be extended by ...
// - using properties from INTERFACE Girl inside INTERFACE Guy
// - syntax - extends Girl
interface Guy extends Girl {
  profession: string;
}

// ~~~ INTERFACES & classes ~~~
// class name extends Girl {

// }

// ~~~ INTERFACE EXTENDS TYPE & vice versa ~~~
// - TYPE
// type X = Girl & {
//   a: string;
//   b: number;
// };

// - INTERFACE
// interface Girl extends X {
//   name: string;
//   age?: number;
// };

// ~~~ TYPE ~~~
type X = {
  a: string;
  b: number;
};

// type Y = {
//   c: string;
//   d: number;
// };

// - TYPE can be extended by ...
// - using PROPERTIES from type X inside type Y
// - syntax - add type X and &

type Y = X & {
  c: string;
  d: number;
};
// - assign values
let y: Y = {
  a: "Zoro",
  b: 21,
  c: "Mihawk",
  d: 42,
};

// *************************** TYPESCRIPT EXERCISE - TASKIFY *************************************
// React.FC - React Functional component

const App: React.FC = () => {
  // ~~ create USE STATE in TYPESCRIPT ~~~
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TaskIt</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;