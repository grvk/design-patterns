(() => {
  enum EventType {
    Click = 'click',
    Hover = 'hover'
  };

  // could be a function too
  interface UIElementEventHandler {
    update(data?: unknown): void;
  }

  interface UIElement {
    handlers: Partial<Record<EventType, Set<UIElementEventHandler>>>;

    subscribe(eventType: EventType, handler: UIElementEventHandler): void;
    unsubscribe(eventType: EventType, handler: UIElementEventHandler): void;
    notify(eventType: EventType, data?: unknown): void;
  }

  class Button implements UIElement {
    handlers: Partial<Record<EventType, Set<UIElementEventHandler>>> = {};


    subscribe(eventType: EventType, handler: UIElementEventHandler): void {
      if (!this.handlers[eventType]) {
        this.handlers[eventType] = new Set<UIElementEventHandler>();
      }

      this.handlers[eventType].add(handler);
    }

    unsubscribe(eventType: EventType, handler: UIElementEventHandler): void {
      this.handlers?.[eventType]?.delete(handler);
    }

    notify(eventType: EventType, data?: unknown): void {
      this.handlers?.[eventType]?.forEach(handler => handler.update(data));
    }

    click(): void {
      console.log("Button clicked");
      this.notify(EventType.Click);
    }

    hover(): void {
      console.log("Hovered on the button");
      this.notify(EventType.Hover);
    }
  }


  class ClickHandler implements UIElementEventHandler {
    constructor(private message: string) { };

    update(data: unknown): void {
      console.log(`Click handler with message = ${this.message} received an event`)
    }
  }

  class HoverHandler implements UIElementEventHandler {
    constructor(private message: string) { };

    update(data: unknown): void {
      console.log(`Hover handler with message = ${this.message} received an event with data`)
    }
  }

  class SimpleDOM {
    public button = new Button();
  }

  // can be implemented too:
  // class HoverHandler implements UIElementEventHandler {}
  const client = () => {
    const clickHandler1 = new ClickHandler('111111');
    const clickHandler2 = new ClickHandler('222222');
    const HoverHandler = new ClickHandler('OoOoOoOo');

    const dom = new SimpleDOM();
    dom.button.subscribe(EventType.Click, clickHandler1);
    dom.button.subscribe(EventType.Click, clickHandler2);
    dom.button.subscribe(EventType.Hover, HoverHandler);

    dom.button.click();
    dom.button.hover();
  }

  client();
})();

// Output:

// Button clicked
// Click handler with message = 111111 received an event
// Click handler with message = 222222 received an event
// Hovered on the button
// Click handler with message = OoOoOoOo received an event
