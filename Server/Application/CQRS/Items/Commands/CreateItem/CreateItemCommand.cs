using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Events;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Items.Commands.CreateItem
{
    public class CreateItemCommand : IRequest<int>
    {
        public int CategoryId { get; set; }

        public string Name { get; set; }
    }

    public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateItemCommand request, CancellationToken cancellationToken)
        {
            var entity = new Item
            {
                CategoryId = request.CategoryId,
                Name = request.Name,
            };

            entity.DomainEvents.Add(new ItemCreatedEvent(entity));

            _context.Items.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
