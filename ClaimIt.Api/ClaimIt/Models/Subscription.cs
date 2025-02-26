using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
/*using ClaimIt.Validations;
*/
namespace ClaimIt.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? UserMail { get; set; }
        public string? SubscriptionCode { get; set; }
        public string? Status { get; set; }
        public string? StripeCheckout { get; set; }
        public DateTime? Inserted { get; set; }
        public string? InsertedBy { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string? LastUpdatedBy { get; set; }
    }
}