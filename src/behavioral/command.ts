(() => {

  interface Command {
    execute(): void | number;
    undo(): void;
  }

  type OrderStatus = 'scheduled' | 'shipped' | 'delivered';

  class Order {
    constructor(
      public id: number,
      public address: string,
      public status: OrderStatus
    ) { }
  }

  // Receiver
  class OrderManager {
    private static id: number = 0;
    public orders: Record<number, Order> = {};

    private getOrder(id: number) {
      const order = this.orders[id];
      if (!order) {
        throw new Error(`Order #${id} not found`);
      }
      return order;
    }

    public createOrder(address: string): number {
      const newId = ++OrderManager.id;
      this.orders[newId] = new Order(
        newId,
        address,
        'scheduled'
      );

      console.log(`Creating order with id #${newId} scheduled to ship to ${address}`);
      return newId;
    }

    public shipOrder(id: number): void {
      const order = this.getOrder(id);
      if (order.status !== 'scheduled') {
        throw new Error(
          `Cannot ship order #${id} since it has alscheduled been shipped or delivered`
        );
      }
      order.status = 'shipped';
      console.log(`Shipping order #${id}`);
    }

    public stopOrder(id: number): void {
      const order = this.getOrder(id);
      if (order.status !== 'shipped') {
        throw new Error(
          `Cannot stop order #${id} since it hasn't been shipped yet`
        );
      }
      order.status = 'scheduled';
      console.log(`Stopping order #${id}`);
    }

    public updateOrder(id: number, newAddress: string) {
      const order = this.getOrder(id);
      if (order.status !== 'scheduled') {
        throw new Error(
          `Cannot update order #${id} since it has been alscheduled shipped or delivered`
        );
      }
      order.address = newAddress;
      console.log(`Updating order #${id} address to ${newAddress}`);
    }

    public cancelOrder(id: number) {
      const order = this.getOrder(id);
      if (order.status !== 'scheduled') {
        throw new Error(
          `Cannot cancel order #${id} since it has been alscheduled shipped or delivered`
        );
      }
      delete this.orders[id];
      console.log(`Canceling order #${id}`);
    }

    public deliverOrder(id: number) {
      const order = this.getOrder(id);
      if (order.status !== 'shipped') {
        throw new Error(
          `Cannot mark order #${id} as delivered since it's not in shipped state`
        );
      }
      order.status = 'delivered';
      console.log(`Delivering order #${id} to address: ${order.address}`);
    }
  }

  // Commands
  class CreateOrder implements Command {
    private orderId: number = -1;
    constructor(private address: string, private manager: OrderManager) { };

    execute(): number {
      this.orderId = this.manager.createOrder(this.address);
      return this.orderId;
    }

    undo(): void {
      if (this.orderId > 0) {
        delete this.manager.orders[this.orderId];
      }
    }
  }

  class ShipOrder implements Command {
    private backupStatus!: OrderStatus;
    constructor(private id: number, private manager: OrderManager) { };

    execute(): void {
      this.backupStatus = this.manager.orders[this.id].status;
      this.manager.shipOrder(this.id);
    }

    undo(): void {
      const order = this.manager.orders[this.id];
      if (order && this.backupStatus) {
        order.status = this.backupStatus;
      }
    }
  }

  class StopOrder implements Command {
    private backupStatus!: OrderStatus;
    constructor(private id: number, private manager: OrderManager) { };

    execute(): void {
      this.backupStatus = this.manager.orders[this.id].status;
      this.manager.stopOrder(this.id);
    }

    undo(): void {
      const order = this.manager.orders[this.id];
      if (order && this.backupStatus) {
        order.status = this.backupStatus;
      }
    }
  }

  class UpdateOrder implements Command {
    private backupAddress!: string;
    constructor(
      private id: number,
      private address: string,
      private manager: OrderManager
    ) { };

    execute(): void {
      this.backupAddress = this.manager.orders[this.id].address;
      this.manager.updateOrder(this.id, this.address);
    }

    undo(): void {
      const order = this.manager.orders[this.id];
      if (order && this.backupAddress) {
        order.address = this.backupAddress;
      }
    }
  }

  class CancelOrder implements Command {
    private backupOrder!: Order;
    constructor(private id: number, private manager: OrderManager) { };

    execute(): void {
      this.backupOrder = this.manager.orders[this.id];
      this.manager.cancelOrder(this.id);
    }

    undo(): void {
      if (this.backupOrder) {
        this.manager.orders[this.backupOrder.id] = this.backupOrder;
      }
    }
  }

  class DeliverOrder implements Command {
    private backupStatus!: OrderStatus;
    constructor(private id: number, private manager: OrderManager) { };

    execute(): void {
      this.manager.deliverOrder(this.id);
    }

    undo(): void {
      const order = this.manager.orders[this.id];
      if (order && this.backupStatus) {
        order.status = this.backupStatus;
      }
    }
  }

  // Invoker
  class Buyer {
    constructor(private address: string, private manager: OrderManager) { };

    public createAndShipOrder() {
      const id = new CreateOrder(this.address, this.manager).execute();
      new ShipOrder(id, this.manager).execute();
      // let's say there's a delivery person who'll deliver everything in 2 seconds
      setTimeout(() => {
        new DeliverOrder(id, this.manager).execute();
      }, 2000);
    }

    public createChangeChangeAndCancelOrder() {
      const id = new CreateOrder(this.address, this.manager).execute();
      new UpdateOrder(id, this.address + " 1", this.manager).execute();
      new UpdateOrder(id, this.address + " 2", this.manager).execute();
      new CancelOrder(id, this.manager).execute();
    }

    public complexOrderWithUndo() {
      const id = new CreateOrder(this.address, this.manager).execute();
      new UpdateOrder(id, this.address + " - NEW", this.manager).execute();

      const updateOrder = new UpdateOrder(id, this.address + " - NEW 2", this.manager);
      updateOrder.execute();
      updateOrder.undo();

      const shipOrder = new ShipOrder(id, this.manager)
      shipOrder.execute();
      shipOrder.undo();

      const cancelOrder = new CancelOrder(id, this.manager);
      cancelOrder.execute();
      cancelOrder.undo();

      new ShipOrder(id, this.manager).execute();

      // let's say there's a delivery person who'll deliver everything in 2 seconds
      setTimeout(() => {
        new DeliverOrder(id, this.manager).execute();
      }, 2000);
    }
  }

  const client = () => {
    const manager = new OrderManager();
    const buyer1 = new Buyer('1234 Main Street', manager);
    const buyer2 = new Buyer('9876 Who Cares Avenue', manager);
    const buyer3 = new Buyer('1111 Unknown Address', manager);

    buyer1.createAndShipOrder();
    buyer2.createAndShipOrder();
    buyer1.createAndShipOrder();
    buyer1.createChangeChangeAndCancelOrder();

    buyer3.complexOrderWithUndo();
  };

  client();
})()
