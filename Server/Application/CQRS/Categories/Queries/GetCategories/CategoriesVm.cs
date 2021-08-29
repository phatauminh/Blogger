using System.Collections.Generic;

namespace Application.CQRS.Categories.Queries.GetCategories
{
    public class CategoriesVm
    {
        public IList<CategoryDto> Categories { get; set; }
    }
}
