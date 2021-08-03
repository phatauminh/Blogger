using Domain.Common;
using Domain.Entities;

namespace Domain.Events
{
    public class CategoryCreatedEvent : DomainEvent
    {
        public CategoryCreatedEvent(Category category)
        {
            Category = category;
        }
        public Category Category { get; }
    }
}
