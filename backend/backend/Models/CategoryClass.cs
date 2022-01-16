using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class CategoryClass
    {
        [Key]
        public int CategoryId { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string CategoryName { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string CategoryDescription { get; set; }

    }
}
