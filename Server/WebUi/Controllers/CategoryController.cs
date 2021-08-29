using Application.CQRS.Categories.Commands.CreateCategory;
using Application.CQRS.Categories.Commands.DeleteCategory;
using Application.CQRS.Categories.Commands.UpdateCategory;
using Application.CQRS.Categories.Queries.GetCategories;
using Application.CQRS.Categories.Queries.GetItems;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebUi.Controllers
{
    public class CategoryController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ItemsVm>> Get()
        {
            return await Mediator.Send(new GetItemsQuery());
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<CategoriesVm>> GetCategories()
        {
            return await Mediator.Send(new GetCategoriesQuery());
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateCategoryCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateCategoryCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCategoryCommand { Id = id });

            return NoContent();
        }
    }
}
