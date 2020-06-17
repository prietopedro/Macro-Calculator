﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivitiesFactor
{
    public class List
    {
        public class Query : IRequest<List<ActivityFactor>> { }
        public class Handler : IRequestHandler<Query, List<ActivityFactor>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ActivityFactor>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activitiesFactor = await _context.ActivitiesFactor.ToListAsync();
                return activitiesFactor;
            }
        }
    }
}
