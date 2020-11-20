/* This file provides a quick description of some of the syntax of 
 * TypeScript/JavaScript. The first of these, begins on line 1 and ends on
 * on line 14. 
 *
 * This is called a block comment. 
 * A comment allows the programmer to write notes in the source code that
 * will not be interpreted as part of the program code.
 * These are usually used to describe what parts of the code do and
 * leave messgages for other programers.
 *
 * A block comment begins with the sequence / * and ends with the sequence * /
 * (no space between the asterixs and slashes). Each line occuring in the
 * block comment must begin with an * otherwise a syntax error will occur.
 */

// This is an inline comment. It begins with two forward slashes and will cause
// the remainder of the to be considered a comment.

			/* Global/Module Scope */

// This part of any script file is considered either module scope or global scope.
// Some syntax elements such as imports or exports can only occur here. 
// If the program executing the code has a module system, this may be module scope.
// If it is module scope, then any variables, classes, functions etc. declared here
// are only available to other modules if they are exported.
// If this is global scope however, anything declared here will be available to other 
// parts of the program.
//
// In general, the existence of a module system or not depends on the execution engine
// and/or any tools used in the process to compile or interpret the code.
// Web browsers by default execute all script files in the global scope which can lead
// to many subtle bugs for newcommers.

			/* Imports/Exports */

// These are import statements. They allow declarations from other modules to be
// used in this module.
// They should be as early as possible in your files.
// Support for this depends on the execution engine and build tools. 
// Some enviroments also have alternative methods for loading code from
// other modules.
//
// In many cases (though not all), a module corresponds to a single file of code.
// We can think of our programs as a collection of one or more modules that work
// together to get what we want done.

// Imports all the exported members from "path" and makes them available via a 
// variable named "path". 
import * as path from 'path';

// This imports the variables, "var1", "var2" and "var3" exported in the module 
// "vars"
import {var1, var2, var3} from 'vars';

// This is called a type alias. It creates a new name that we can use to refer to
// the data types that occur on the right hand side of the "=" sign (TypeScript only).
//
// Our type alias here, "Any", is an alias for any of the JavaScript basic types.
type Any = number | boolean | string | object | undefined | null;

// This is an export statement. It exports our Any type so it can be used in
// other modules.
export { Any }

// Instead of exporting after we declare our types we can export at the site of
// declaration. This exports an alias named "AnyList" which is denotes an array
// of any one of the basic JavaScript data types.
export type AnyList = Any[];

			/* Variables */

// The following are called variable declarations. Variables have the syntax of 
// <keyword> <name> "=" <expression>.
// They assign names to values we are interested in so that we can use
// them in multiple locations without having to repeat ourselves.
//
// Variables can be declared using one of three keywords:
// 1. let
// 2. const
// 3. var
//
// We use `let` most times however it is still a relatively new addition
// to the language and may not be supported everywhere. `const` is also
// relatively new and can be used to indicate a variable's contents
// should not be changed after assignment. The final one `var`, is the
// legacy keyword for declaring variables but historically has issues
// relating to a feature called "variable hoisting" and should probably
// be avoided when possible.
//
// These variables are declared at module/global scope meaning they are 
// available to any scope in the module. If they are in global scope, they
// are available anywhere in the whole program!

// This declares a number data type with the value "34" using the `const` keyword.
const myNumber = 24;  // <keyword> <name> "=" <expression>

// In TypeScript we can explicitly specify the type (TypeScript only).
const myNumber:number = 24;

// These declare booleans in both languages. A boolean is a value that can have
// one of two values, either the keyword true or the keyword false.
let myTruth = true;

//TypeScript
let myFalsehood:boolean = false;

// This declares a variable that contains a string. Strings are a sequence of one
// or more text characters between quotes (single or double). The back tick 
// character (`) can also be used.
let myString = 'this is a string';

// This is the same declaration in TypeScript with optional type 
// (TypeScript only).
let myString:string = 'this is a string';

// This variable contains an object. Objects can be explained in different ways
// but are essentially structured records of data that can have special functions
// called methods that allow us to manipulate that data. The data in an object
// is indexed by names and are called properties. To some extent, they can 
// be seen as the internal variables of the object.
//
// JavaScript provides a convenient syntax for creating objects called object
// literal syntax. This allows us to create an object and define its properties
// in one place.
let myObject = {
   name: 'Haile', // This is a property "name" is the key and 'Haile' is the value.
   'birth-date': new Date(1892,6,23)
};

// Alternative syntax exists for creating objects from classes via the "new"
// keyword. Classes can be seen as templates for creating objects.
let myTypeScriptObject:TSObject = new TSObject('typescript', 3);

// In the above, `new TSObject('typescript', 3)` instructs the engine to
// create a new "instance" of an object using the class (constructor)
// `TSObject`. The result is assigned to the `myTypeScriptObject` variable.
// We say the object contained in this variable is an "instance of" the
// "TSObject" class.

// Null and undefined are special data types used to represent the absence of
// a value. A variable declaration without an asignment results in the
// value being undefined.
let myNothing;

// Null is usually avoided but is sometimes used in legacy APIs to indicate
// ...nothing.
let obj = Object.create(null);

			/* Expressions */

// Variables store values, which is not very useful if that was all a programming 
// language could do. We are interested in using these variables and their values
// to have the engine compute results on our behalf. To do this, we use Expressions.
// An Expression is valid syntax that the engine can evaluate to a single value.
// Any of the data types described earlier by themselves, can be
// considered an expression because they evaluate to a single value (themselves!).
// However, these values can be combined together to make more complex calculations
// that form the meat of our programs and scripts. This is done using operators.
// Below are some of the more common operators:

// Comparison Operators test whether a relationship between to operands is true or not.
// The resulting value is a boolean (true or false):
4 == 4              // Tests whether the number 4 is equal to the number 4 (true).
'four' === 'four'   // Tests whether the string 'four' is strictly equal to the string 'four' (true).
'four' != 4         // Tests whether the string 'four' is not equal to the number 4 (true).
'four' !== 4        // Tests whether the string 'four' is not strictly equal to the number 4 (true).
8 > 7               // Tests whether the number 8 is more than the number 7 (true).
6 >= 7              // Tests whether the number 6 is more than or equal to the number 7 (false).
8 < 9               // Tests whether the number 8 is less than the number 9 (true).
9 <= 7              // Tests whether the number 9 is less than or equal the number 7 (false).

// Arithmetic operators preform basic math:
1 + 1 		    // Addition
1 - 1		    // Subtraction
10 / 5              // Division
1 * 2               // Multiplication.

// Expressions can be used almost anywhere variables are used and vice versa.
// The examples above however, though valid syntax, do not store the resulting
// values and are effectively lost. To make use of the result of an expression,
// store the result in a variable.

			/* Functions */

// Functions are a construct in programming that allows us to group a sequence of
// code into a reusable entity. Depending on the context, they are sometimes
// referred to as procedures our routines and are very simillar to Math functions.
// Functions give structure to our code and are one of many tools desigened to help
// the programmer avoid reapeating themselves too often.
//
// Functions typically implement some part of an algorithim, those algorithims
// when combined solve the problem our program as a whole.
// JavaScript provides more than one way to define a function depending on the 
// version your engine supports.

// Regular JavaScript Function
function myFunction(param1, param2) {
 /* This is called the body of the function or the function's scope */
 return param1 + param2;
}

// In the above, the name of the function is "myFunction". The "param1" and "param2"
// are called the "function parameters" and are the input the function accepts to
// do its processing. This part of a function is usually written between parenthesis,
// that is the "(" ")". Each parameter is separated by a comma. In theory you can
// have as many parameters as you need but in practice 3-4 is more than enough.
// When a function is "called", these parameters become variables and should be
// supplied in order for the function to work.
//
// These variables however, are only available within the scope of the function,
// that is between the opening "{" and closing "}". Attempting to use them
// elsewhere will result in an error.
//
// Within the scope of a function, you can define other variables via `let` 
// that will only be available inside the function.
// The line `return param1 + param2` is called a return statement. The `return`
// keyword imediately ends the execution of a function and provides the expression
// supplied after it to the caller of the function. This is effectively the way a
// function provides output.
// (Remember functions basically accept input, do processing and then output the
// result).
// The output of a function is called the return value of the function.
// Because of this mechanism, functions can be used as expressions:
let myFunctionResult = myFunction(10, 20) // myFunctionResult is now 30

// myFunction returns the result of the expression param1 + param2
// This function can be defined in TypeScript, to make it more obvious:
function myFunctionTS2(param1:number, param2:number): number {
  return param1 + param2;
}

// The above is the same function, only defined in TypeScript. The colon after
// a parameter name in TypeScript denotes the type of the parameter. In our case,
// we are saying param1 and param2 have the type of number. The colon outside the
// parenthesis, the `) : number ` part, tells the type of the function.
//
// Functions get there types based on the type of their return value. In our
// `myFunctionTS2`'s case, the return type is a number because the result of
// adding two numbers together, is a new number.

// There is an alternative syntax for defining functions which is much shorter (JavaScript):
const myArrowFunction = (param1, param2) => {
   return param1 + param2
}
// These are called arrow functions. TypeScript supports them too:
const myArrowFunctionTS = (param1:number, param2:number) : number => {
  return param1 + param2;
}

// For functions such as ours above that simply return an expression, we can make
// this even shorter (JavaScript):
const myShortArrowFunction = (param1, param2) => param1 + param2;

// The above arrow syntax, are actually variable declarations. 
// `myShortArrowFunction` etc is actually a variable name. 
// In JavaScript, functions can be treated much like data in that they can be
// stored in variables or passed as a value for the parameter of another 
// function. This can be confusing at first but is a very powerful feature
// of the language.

			/* Calling A Function */

// When we call a function, we are effectively telling our engine to execute the 
// function's body, and give us the result. Sometimes we store the result in a variable,
// pass it to another function or even ignore it.
// The below demonstrates calling a function:
myFunction();

// However if a function takes one or more parameters, we should provide them otherwise
// errors are likely to occur. Furthermore we should ensure we pass the type of 
// parameters the function expects and in the expected order. When we pass values
// to a function call, they are called arguments. 
myFunction(10, 12);

// In the above we have passed the parameters 10 and 12 respectively to our 
// function. When used in this manner, 10 and 12 are called the arguments
// to the function. Each argument is seperated by a comma, a function call can have zero
// or more arguments.
//
// We can get a little fancy here by combining our function calls because after all;
// function calls are also expressions:
let result = myFunction(myArrowFunction(10,12), 8);
// In the above, result will have a value of 30, try to figure out why.

// Misc Notes:
// 1) The semi-colon at the end of a line indicates to the parser the end of a 
//    statement. JavaScript has a feature called Automatic Semi Colon Insertion
//    (ASI) which will insert semi-colons we left out. However, it's a good idea
//    to avoid relying on this.
// 2) Varible names must begin with a letter, underscore or "$" and can only contain alphanumeric
//    characters, "$" or an underscore ("_").
// 3) Property names may contain any characters but must be wrapped in quotes if they do not
//    obey the rules of variable names.
// 4) More information on expressions and operators can be found at:
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
