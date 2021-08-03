using System;

namespace Application.Common.Models
{
    public class AccountModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Location { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string NickName { get; set; }
        public int Gender { get; set; }
    }
}
