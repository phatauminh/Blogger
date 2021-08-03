using Microsoft.AspNetCore.Identity;
using System;

namespace Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }
        public int Gender { get; set; }
        public string Location { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
