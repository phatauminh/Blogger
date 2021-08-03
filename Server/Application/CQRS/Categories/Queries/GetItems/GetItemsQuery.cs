using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Categories.Queries.GetItems
{
    public class GetItemsQuery : IRequest<ItemsVm>
    {
    }

    public class GetItemsQueryHandler : IRequestHandler<GetItemsQuery, ItemsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ItemsVm> Handle(GetItemsQuery request, CancellationToken cancellationToken)
        {
            var items =  new ItemsVm
            {
                ItemsInCategory = await _context.Categories
                    .AsNoTracking()
                    .ProjectTo<ItemsInCategoryDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Name)
                    .ToListAsync(cancellationToken)
            };

            return items;
        }
    }

}
