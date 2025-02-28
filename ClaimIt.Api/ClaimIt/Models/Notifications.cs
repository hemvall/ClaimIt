using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class Notifications
    {        
        public int Id { get; set; }
        public int AirdropId { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        public string? URL { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}