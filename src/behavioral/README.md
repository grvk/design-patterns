# Behavioral Patterns

- Observer Design Pattern: [observer.ts](./observer.ts)
- Visitor Design Pattern [visitor.ts](./visitor.ts)
- Chain of Responsibility [chain-of-responsibility.ts](./chain-of-responsibility.ts)

## Observer Design Pattern

### Summary
- Defines a one-to-many dependency between objects
- When one *subject* changes state
- All its dependents *observers* are notified and updated automatically

### When to use
- When you need a one-to-many, subscribtion-like behavior
- Simple event handlers
- You need propagate change to multiple objects

### When not to use
- When you have A LOT OF Observers, Subscribers, or Events (use Publish-Subscribe pattern instead to avoid performance issues)
- When you you don't want couple each publisher to maintain their own list of subscribers

### Sources
- [GeeksForGeeks](https://www.geeksforgeeks.org/observer-pattern-set-1-introduction/)
- [Refactoring Guru](https://refactoring.guru/design-patterns/observer)
- [LinkedIn Pulse](https://www.linkedin.com/pulse/observer-vs-pub-sub-pattern-ahmed-shamim-hassan-s0yrc/)

## Visitor Design Pattern

### Summary
- Separates *algorithms* from *objects* on which they operate

### When to use
- We want to peform an operation on a **group** of similar kind of Objects (e.g. tree)
- We don't want to couple model and behavior

### When not to use
- When you can't modify the group of objects at all
- When you don't know API of Visitor classes
- You just need to iterate over elements (use Iterator pattern)
- It's okay to add that "visitor" code into the objects themselves (in some simple cases)

### Sources
- [GeeksForGeeks](https://www.geeksforgeeks.org/visitor-design-pattern/)
- [Refactoring Guru](https://refactoring.guru/design-patterns/visitor)
- [Stackoverflow](https://stackoverflow.com/questions/255214/when-should-i-use-the-visitor-design-pattern)

## Chain of Responsibility

### Summary
- lets you pass requests / objects along a chain of handlers
- each handler decides whether to:
  - *accept & process it*
  - *pass along*

#### Types
- DO NOT pass along if successfully processed
  - *Example: DOM parsing to find proper a UI element that will process an event* (from tree leaf to window object)
- DO pass along if (successfully) processed
  - *Example: input verification checks*


### When to use
- When you need to synchronyously peform a series of function calls on an object
- When you need to apply a series of checks, in which the order of checks matters
- When you have a request needs to go through a series of middleware (e.g. auth)


### Sources
- [GeeksForGeeks](https://www.geeksforgeeks.org/chain-responsibility-design-pattern/)
- [Refactoring Guru](https://refactoring.guru/design-patterns/chain-of-responsibility)
