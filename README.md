# Data Structures and Algorithms

Data structures and algorithms in Java, one topic per folder.

## Topics

<!-- Add a line per topic folder, e.g. - [Linked lists](linked-lists/) -->
- [Tries](tries/)

## Layout

```
<topic>/
├── README.md          concept, operations, complexity, trade-offs
└── ExampleOne.java    self-contained example with a main method
```

- Topic folders live at the repository root, in kebab-case, with no nesting.
- Each `.java` file stands alone: no packages, no shared code, no build tool.
- File names are PascalCase. Java requires a valid class name for files that
  use the compact `void main()` form.

## Running an example

Requires Java 25 or later.

```sh
java linked-lists/ReverseBetween.java
```

The launcher compiles the file in memory and runs it; no `.class` files are
written.
