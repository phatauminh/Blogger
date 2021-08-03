using Domain.Common;
using Domain.Entities;

namespace Domain.Events
{
    public class ItemCompletedEvent : DomainEvent
    {
        public ItemCompletedEvent(Item item)
        {
            Item = item;
        }

        public Item Item { get; }
    }
}
