using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace FormTask
{
    public class FormDBContext: DbContext
    {
        public FormDBContext(DbContextOptions<FormDBContext> options) : base(options)
        {
        }
        public DbSet<FormModel> FormInformation { get; set; }
    }
}
