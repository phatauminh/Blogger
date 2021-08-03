using Domain.Common;
using Domain.Entities;

namespace Domain.Events
{
    public class CategoryCompletedEvent : DomainEvent
    {
        public CategoryCompletedEvent(Category category)
        {
            Category = category;
        }

        public Category Category { get; }
    }
}
