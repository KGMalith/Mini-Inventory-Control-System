using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ProductClass
    {
        [Key]
        public int ProductId { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string ProductName { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string ProductDescription { get; set; }
        public float ProductPrice { get; set; }
        public int ProductQuantity { get; set; }

        //Foreign key for Category
        [ForeignKey("CategoryObject")]
        public int CategoryId { get; set; }
        public virtual CategoryClass CategoryObject { get; set; }
    }
}
