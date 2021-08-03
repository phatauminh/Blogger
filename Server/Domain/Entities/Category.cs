using Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Category : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<Item> Items { get; private set; } = new List<Item>();
    }
}
