using Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Item : AuditableEntity, IHasDomainEvent
    {
        public int Id { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
