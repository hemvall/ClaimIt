using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class Tasks
    {        
        public int Id { get; set; }
        public int AirdropId { get; set; }
        public string? Label { get; set; }
        public string? Type { get; set; }
        public string? URL { get; set; }
        public DateTime? Deadline { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}