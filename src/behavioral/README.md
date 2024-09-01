# Behavioral Patterns

- Observer Design Pattern: [observer.ts](./observer.ts)
- Visitor Design Pattern [visitor.ts](./visitor.ts)
- Chain of Responsibility [chain-of-responsibility.ts](./chain-of-responsibility.ts)
- Command [command.ts](./command.ts)

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

## Command Method

### Summary
- encapsulates all information required to perform an action
  - ^ implies parameterization of actions
- which is later sent to the logical software unit

### When to use
- When you're dealing with: *menus, queue operations, transactions*
- Decoupling of (sender) object and operational logic is needed
- You have multiple entries that need to execute the same action
- Undo / redo functionality is needed (just save reverse args in the command)
- You need to support logging / queuing of actions 

### When not to use
- **TLDR;** when it's an overkill
- When coupling sender and operational logic is ok
- When queueing, scheduling, ordering actions isn't requried (use Observer)
- When action parameterization isn't required

### Sources
- [GeeksForGeeks](https://www.geeksforgeeks.org/behavioral-design-patterns/#2-command-method-design-pattern)
- [Refactoring Guru](https://refactoring.guru/design-patterns/command)
- [ArjanCodes](https://arjancodes.com/blog/python-command-design-pattern-tutorial-for-scalable-applications/)
