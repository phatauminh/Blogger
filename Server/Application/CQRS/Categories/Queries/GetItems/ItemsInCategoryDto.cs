using Application.Common.Mappings;
using Domain.Entities;
using System.Collections.Generic;

namespace Application.CQRS.Categories.Queries.GetItems
{
    public class ItemsInCategoryDto : IMapFrom<Category>
    {
        public ItemsInCategoryDto()
        {
            Items = new List<ItemDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public IList<ItemDto> Items { get; set; }
    }
}
