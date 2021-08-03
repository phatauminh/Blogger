using Application.Common.Models;
using Application.CQRS.Categories.Queries.GetItems;
using Application.CQRS.Items.Commands.CreateItem;
using Application.CQRS.Items.Commands.DeleteItem;
using Application.CQRS.Items.Commands.UpdateItem;
using Application.CQRS.Items.Commands.UpdateItemDetail;
using Application.CQRS.Items.Queries.GetItemWithPagination;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebUi.Controllers
{
    public class ItemController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<ItemDto>>> Get([FromQuery] GetItemsWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }


        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateItemCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateItemCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> UpdateItemDetails(int id, UpdateItemDetailCommand command)
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
            await Mediator.Send(new DeleteItemCommand { Id = id });

            return NoContent();
        }
    }
}
