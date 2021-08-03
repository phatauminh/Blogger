using Application.Common.Mappings;
using Domain.Entities;

namespace Application.CQRS.Categories.Queries.GetItems
{
    public class ItemDto : IMapFrom<Item>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string ImageString { get; set; }
    }
}
