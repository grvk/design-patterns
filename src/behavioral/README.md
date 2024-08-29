# Behavioral Patterns

- Observer Design Pattern: [observer.ts](./observer.ts)

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
