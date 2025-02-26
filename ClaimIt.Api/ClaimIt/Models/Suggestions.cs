using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class Suggestions
    {        
        public int Id { get; set; }
        public int AirdropId { get; set; }
        public int Potential { get; set; }
        public string? TutorialSource { get; set; }
        public int? FarmCost { get; set; }
        public int? TimeCost { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}