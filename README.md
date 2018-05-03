Quenk Typescript/JavaScript Style Guide.
========================================

# Policy
Quenk Technical Policy 2018-01

# Status
Draft 0.1.0

# Introduction

This style guide provides guidance on how JavaScript/TypeScript should be 
written at Quenk Technologies(QT).

Guidelines here are meant to be strictly followed however, given the
complicated and dynamic nature of the JavaScript eco-systems, 
some non-compliance is tolerated as can be seen in projects created before this
policy.

## Background

This style-guide was written to capture some of the evolving conventions 
applied to code produced and managed by Quenk Technologies. Most of them came 
about between the time isomorphic JavaScript and ES6 becane popular.

Just before major browsers started shipping ES2015 module support.

While the realm of possibilities with JavaScript is exciting, new committees, 
standards, platforms and tooling tends to increase the surface area for chaos. 
The guide by no means attempts to be the best or even the most optimal but 
rather has been written to document what works best at QT (Quenk Technlologies).

The workflow employed at QT is aimed at small teams, typically 1-5 developers 
and works something like this:

1. Write the main application in TypeScript.
2. Design or reuse DSLs for repetitive or esoteric aspects of the code base.
3. Create or reuse tools for converting those DSLs to TypeScript.
4. Convert TypeScript code to regular JavaScript.
5. Bundle JavaScript for non-node targets.

To date one of the major pitfalls of this approach is the lack of source map 
support input by the TypeScript compiler.

## Language

As of 2017, TypeScript is the main language used by QT for client and server 
web applications as well as desktop and mobile applications. 

We compile all TypeScript code to **ES5**.

Before TypeScript, Babel was used however the need for a static type system 
became obvious as some code bases grew.

Prior to TypeScript, most testing done was to ensure the correct type was 
returned from functions and methods. This is often more tedious to maintain
than simply focusing on feature and integration tests.

While TypeScript [is not perfect](https://gist.github.com/t0yv0/4449351),
it provides a good balance between "the way JavaScript is written" 
and correctness.

PureScript was evaluated sometime in 2016 as an alternative, however,
it was not as easy to port some existing code bases. (Note: Porting old code 
was necessary to ease the burden of maintainence on aone developer team). 

At some point PureScript may be revisited for smaller non-critical projects.

## Programming Paradigm

Functional Programming is preferred over Object Oriented Programming. 
JavaScript supports some common facilities of both but fails to go far enough 
to be productive out of the box with either. 

TypeScript addresses some of those issues however in practice,
we have found large OOP code bases difficult to maintain and modify.
Mostly around navigating and manipulating the object graph however there are 
other issues as well.

Functional programming, particularly purer functional programming, 
helps avoid some of these issues, however current JavaScript/TypeScript syntax 
makes writing messy functions easier than clean ones.  

We try to find a balance between the two paradigms, preferring high-order 
functions and closures over inflexible class inheritance schemes 
however we still use classes regularly, avoiding inheritance (extends) wherever 
possible.

## Project Layout

```sh
.
├── lib
├── package.json
├── src
│   ├── actor
│   │   ├── index.ts
│   │   ├── local
│   │   │   ├── Case.ts
│   │   │   ├── Dynamic.ts
│   │   │   ├── index.ts
│   │   │   ├── Local.ts
│   │   │   ├── Parent.ts
│   │   │   ├── Pending.ts
│   │   │   ├── Receive.ts
│   │   │   ├── Select.ts
│   │   │   └── Static.ts
│   │   └── process
│   │       ├── index.ts
│   │       ├── Process.ts
│   │       └── script.ts
│   ├── index.ts
│   ├── package.json
│   ├── system
│   │   ├── ActorSystem.ts
│   │   ├── Envelope.ts
│   │   ├── index.ts
│   │   ├── log
│   │   │   ├── event.ts
│   │   │   └── index.ts
│   │   └── PsuedoSystem.ts
│   └── tsconfig.json
└── test
```

The above tree shows a sample project layout with the contents of `src` exposed.
In this module, `actor` and `system` are both submodules of the module, 
both having their own submodules.

A module SHOULD contain a `src` folder and a `lib` folder. 
The `src` folder contains the source TypeScript and supporting DSL files as 
well as assets necessary for the final application. The `lib` folder contains
the built JavaScript that will be fed into a bundler or used as the entry-point 
in other node_modules.

The `src` folder SHOULD have an `index.ts` file which specifies what the module 
exports. However if the module has no top-level exports it can be omitted. 

Typically, the build process SHOULD copy all the files and directories located 
in `src` to `lib` and run the TypeScript compiler in the `lib` directory.

Alternatively, the TypeScript compiler can be run in the `src` directory with 
an output target of `lib`, however the previous method is preferred for 
larger projects.

Outputting build files to the `src` directory is forbidden and MUST not be done.

### File Names

Modules should always be lowercase, with dashes (`-`) used in place of spaces.
The names of class and interface files should always be "CamelCase".

## Writing Code

### Formatting

#### Line Wrapping
Lines SHOULD be wrapped at 80 characters and MUST not exceed 90 characters.

#### Indentation
Indentation MUST be done using spaces not tabs. Use four spaces for indentation.

#### Newlines
Use UNIX line endings, converting alternative formats via the
text editor or external tools. Code checked into repositories
MUST use UNIX line endings.

#### Semicolons
For TypeScript specific code that will not output JavaScript symbols, 
such as type definitions and interfaces, semi-colons are optional.

However the style decided upon MUST be consistent throughout the
project. All other code SHOULD use semi-colons as there are a few cases where 
ASI can cause problems.

#### Comments

##### Block Comments

Block comments SHOULD only be used outside of methods and functions, 
typically to describe a class, type, interface or 
variable however, temporary block comments MAY be used inline in places
where double slash comments are infeasible.

###### JSDoc Comments
A block comment intended to be a JSDoc/TypeDoc comment MUST start with the name
of the identifier followed by a brief description of it's purpose. 

If the author feels the need to add more information then one line MUST be 
skipped and descriptions continued.

Example:

```typescript

/**
 * id is described here.
 * 
 * This line goes into some more detail about id.
 */
 const id = 'good';

```

##### Double Slash Comments

Double slash comments SHOULD be used only within the scope of a function
or method and are typically used to leave temporary
notes or explanations on code that SHOULD be refactored at some point.

Example:

```typescript

 const seriouslyConfusingAlgorithim = (n:number) : number => {

   //TODO: actually implement this

 }

```

## Modules

A module is either a single file or a directory.

Modules SHOULD be written to target the Node.js platform or browserify.
Given the likelihood of incompatibilities of module implementations 
among browsers, Node.js and other platforms, this is unlikely to change any 
time soon.

Targeting browserify with has the pleasant side-effect that code can run in
most non-browser environments such as MongoDB, provided host objects 
are avoided and the platform supports the ECMAScript version.

### File Modules.

If the module is a file then all the contents of that file are considered a
single module. Only those contents of that file are to be considered part of 
the module.

Avoid re-exporting the contents of other modules in that file except for cases
where the re-exported identifiers will form part of the module's API.

### Directory modules.

If the module is a directory then there MUST be an index file in that directory
which specifies all the exports of the module. 

This index file MUST follow the rules of file modules except that it is ok to 
re-export contents of other non-module files within the directory.

### Module Layout

In terms of exports, a module can contain constants, types, interfaces and 
simple classes.

Large classes and interfaces spanning numerous lines should be moved to a file
named after the class or interface.

If this occurs in file modules, the module MUST be turned into a
directory module.

A module file SHOULD have the following layout in order:

1. Module comment (optional).
2. List of imports.
3. List of re-exports.
4. Un-exported constants,types,interfaces.
5. Exported constants,types and interfaces.
6. Un-exported and exported classes (if any).
7. Un-exported and exported functions.

Example:

```typescript
/**
 * This module was created as an example.
 *
 * Remember the first line is the intro and this line onwards is your story
 * (if any).
 */

import { A, B } from 'foo/lib/letters'
import { swapAB } from 'bar'

export { A, B }
export { C } from 'foo/lib/alpha'

const PRIVATE_CONSTANT = 12;

type AOrB = A | B;

interface ABTestInterface {

    isA(): boolean

    isB(): boolean

}

/**
 * EXPORTED_CONSTANT is the number 12.
 */
export const EXPORTED_CONSTANT = PRIVATE_CONSTANT;

/**
 * EXPORTED_AOrB is an ADT of A and B.
 */
export type ExportedAOrB = AOrB;

/**
 * ExportedABTestInterface extends ABTestInterface.
 */
export interface ExportedABTestInterface extends ABTestInterface { }

class C extends A { }

/**
 * D extends B but is effectively the same.
 */
export class D extends B { }

/**
 * exportedIsAOrB tests whether ab is an A or B.
 * @param ab - The A or B to be tested.
 */
export const exportedIsAOrB = (ab: ExportedPossibleAB) => isAOrB(ab)

const isAOrB = (ab: ABTestInterface) => ab.isA() || ab.isB();

```

If the file is not a module and not an executable script,
(ie: a class or interface declaration) then the layout SHOULD be as follows:

1. List of imports.
2. Un-exported constants,types and interfaces.
3. Un-exported classes.
4. The exported class or interface.
5. Un-exported functions.

```typescript
import { A, B } from 'foobar';

const PRIVATE_CONST = 12;

type PrivateType = A | B;

interface PrivateInterface {

    isPrivate(): true

}

/**
 * Main class for the application.
 */
export class Main  {

    constructor(public a:A, public b:B) {}

}
```


## Imports

Use the ES import syntax. The `require` function SHOULD only be used if there 
is no other feasible method for loading a script with preference given to 
TypeScript's `import <imports> = require('module')` syntax.

### Named Imports
Prefer named imports to qualified imports when feasible. 
Generally default imports should be avoided as they can be a source of 
confusion. 

The import method used however, obviously depends on the layout of the module 
being imported.

### Require
Inline imports via `require` SHOULD be avoided at all costs but are 
acceptable when writing small programs or plugins. 

## Exports

List already imported modules that are to be re-exported before the 
`export from` syntax. The `export from` syntax SHOULD be used in directory 
modules if the identifier is not used within the current file.  

Do not import a module solely for the purpose of exporting it.

Examples:

```typescript

 //Good

export { A,B } from './a-b-exports';

//Bad
import { A,B } from './a-b-exprots';

export { A,B }
 
```
 
## Variables

Variables occurring outside of functions and methods MUST be declared 
using the `const` keyword. 

### Keywords and Naming
If a variable outside a function is to hold a string, regular expression or
number then its name SHOULD be in uppercase. 

Otherwise it SHOULD be in "lowerCamelCase".

All variables used within functions and methods MUST be declared using the 
`let` keyword.

### Mutability

Avoid mutable variables. Avoiding mutable variables can prohibit a class of 
errors related to state management.

However if a variable needs to be changed it MUST be within the context of a 
function or method ONLY.

### References

Objects and Arrays shared between functions and methods SHOULD be treated
as read-only. 

Prefer copying, cloning or destructuring if an object is to be modified,
however, only do so if it does not introduce unwanted complexity.

### Global Variables.
Global variables that is, variables set on the `window` or `global` objects 
MUST not be created unless properly documented
within the project.

Avoid global variables at all costs EXCEPT where there is no other way.

## ADTs
## Interfaces

## Classes

Classes MUST always be declared using the `class` keyword.

Generally, we treat classes as simple constructors and a class's constructor
MUST not have any side-effects. The body of a constructor MUST be empty
or contain a call to `super`.

Parameters passed to a constructor MUST be declared public.

Properties of a class not explicitly passed to the constructor SHOULD
be declared using TypeScript's property syntax.

There MUST be no properties not explicitly listed in the class constructor
or properties section.

Avoid properties that are not passed into the constructor or unintialized.

A constructor MUST come before property declarations. This helps remind
about how JavaScript classes are created.

```typescript

//Good
export class User {

  constructor(public id:number) {} 

  status: string = 'A';

}

//Bad
export class User {

  status: string = 'A'; // Should come after constructor

  constructor(id:number) { this.id = id; } // Should be empty.

  age: number; // uninitialized, allowed but should be avoided

}


```

## Functions

Functions SHOULD be declared using arrow syntax, using the const keyword when
not anonymous.

Example:

```typescript

const foo = m => {

 return m.map(a => a);

}

const identity = a => a;

```

Functions SHOULD accept one parameter and return a value. Currying SHOULD
be used to accept multiple parameters however this is left up to the programmer.

When the compiler can properly resolve a function parameter's type 
automatically, brackets can be omitted.

## Objects
## Arrays
## Strings
## Numbers
## SideEffects
## Known Pitfalls (Type inference, cyclical dependencies)
## Compiling
