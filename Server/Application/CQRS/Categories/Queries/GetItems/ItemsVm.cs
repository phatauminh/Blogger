using System.Collections.Generic;

namespace Application.CQRS.Categories.Queries.GetItems
{
    public class ItemsVm
    {
        public IList<ItemsInCategoryDto> ItemsInCategory { get; set; }
    }
}
