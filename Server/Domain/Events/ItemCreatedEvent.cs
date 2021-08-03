using Domain.Common;
using Domain.Entities;

namespace Domain.Events
{
    public class ItemCreatedEvent : DomainEvent
    {
        public ItemCreatedEvent(Item item)
        {
            Item = item;
        }

        public Item Item { get; }
    }
}
