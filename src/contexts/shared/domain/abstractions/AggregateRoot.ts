type DomainEvent = any;

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];

    return domainEvents;
  }
}
