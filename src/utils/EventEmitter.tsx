class EventEmitter {
  private events: Record<string, Function[]> = {};

  on(event: string, cb: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(cb);
  }

  off(event: string, cb: Function) {
    this.events[event].filter(fn => fn !== cb);
  }

  emit(event: string, value: any) {
    this.events[event]?.forEach(cb => cb(value));
  }
}

export const eventEmitter = new EventEmitter();
