using Application.Common.Interfaces;
using Application.CQRS.Categories.Queries.GetItems;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Items.Queries.GetItemWithCategoryList
{
    public class GetItemsWithCategoryList : IRequest<ItemsVm>
    {
        public int[] ListCategory { get; set; }
    }

    public class GetItemsWithCategoryListHandler : IRequestHandler<GetItemsWithCategoryList, ItemsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetItemsWithCategoryListHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ItemsVm> Handle(GetItemsWithCategoryList request, CancellationToken cancellationToken)
        {
            var items = new ItemsVm
            {
                ItemsInCategory = await _context.Categories
                   .Where(x => request.ListCategory.Contains(x.Id))
                   .AsNoTracking()
                   .ProjectTo<ItemsInCategoryDto>(_mapper.ConfigurationProvider)
                   .OrderBy(t => t.Name)
                   .ToListAsync(cancellationToken)
            };

            return items;
        }
    }
}
