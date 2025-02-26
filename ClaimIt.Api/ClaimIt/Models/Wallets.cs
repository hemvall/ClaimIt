using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class Wallets
    {        
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Label { get; set; }
        public string? Address { get; set; }
        public string? Platform { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}