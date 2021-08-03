using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Items.Commands.UpdateItemDetail
{
    public class UpdateItemDetailCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageString { get; set; }
    }

    public class UpdateItemDetailCommandHandler : IRequestHandler<UpdateItemDetailCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateItemDetailCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateItemDetailCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Items.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Item), request.Id);
            }

            entity.Name = request.Name;
            entity.Image = request.ImageString;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
