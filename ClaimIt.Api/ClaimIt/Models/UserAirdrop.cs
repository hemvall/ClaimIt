using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
/*using ClaimIt.Validations;*/

namespace ClaimIt.Models
{
    [PrimaryKey(nameof(UserId), nameof(AirdropId))]
    public class UserAirdrop
    {
        public int UserId { get; set; }
        public int AirdropId { get; set; }
        public int WalletId { get; set; }
        public int Allocation { get; set; }
    }
}
