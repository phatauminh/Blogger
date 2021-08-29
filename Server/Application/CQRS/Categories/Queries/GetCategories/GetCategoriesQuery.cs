using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Categories.Queries.GetCategories
{
    public class GetCategoriesQuery : IRequest<CategoriesVm>
    {
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, CategoriesVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoriesVm> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = new CategoriesVm
            {
                Categories = await _context.Categories
                 .AsNoTracking()
                 .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                 .OrderBy(t => t.Name)
                 .ToListAsync(cancellationToken)
            };

            return categories;

        }
    }
}
