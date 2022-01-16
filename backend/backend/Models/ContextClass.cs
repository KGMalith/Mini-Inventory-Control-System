using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ContextClass:DbContext
    {
        public ContextClass(DbContextOptions<ContextClass> options) : base(options)
        {

        }
        public DbSet<ProductClass> Products { get; set; }
        public DbSet<CategoryClass> Categories { get; set; }
    }
}
