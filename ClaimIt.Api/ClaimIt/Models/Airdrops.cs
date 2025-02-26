using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    public class Airdrops
    {        
        public int Id { get; set; }
        public string? Label { get; set; }
        public string? Description { get; set; }
        public string? Ticker { get; set; }
        public string? CoinGeckoTicker { get; set; }
        public string? IconURL { get; set; }
        public string? WebsiteURL { get; set; }
        public string? XAccount{ get; set; }
        public string? Status{ get; set; }
        public string? Phase{ get; set; }
        public DateTime? StartDate{ get; set; }
        public DateTime? EndDate{ get; set; }
        public bool? Claimed{ get; set; }
        public bool? VerifiedByTeam{ get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

    }
}