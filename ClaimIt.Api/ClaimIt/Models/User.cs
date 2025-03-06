using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class User
    {
        public int Id { get; set; }
        /*        public int? RoleId { get; set; }*/
        public string? Username { get; set; }
        public string? X { get; set; }
        public string? Discord { get; set; }
        public string? Email { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}