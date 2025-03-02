using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class User
    {
        public int Id { get; set; }
        /*        public int? RoleId { get; set; }*/
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Mail { get; set; }
        public string? Password { get; set; }
        public bool? Premium { get; set; }
    }
}