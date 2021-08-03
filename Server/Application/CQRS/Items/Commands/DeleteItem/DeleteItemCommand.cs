using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Items.Commands.DeleteItem
{
    public class DeleteItemCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteItemCommandHandler : IRequestHandler<DeleteItemCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Items.FindAsync(request.Id);

            if (entity == null)
                throw new NotFoundException(nameof(Item), request.Id);

            _context.Items.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
