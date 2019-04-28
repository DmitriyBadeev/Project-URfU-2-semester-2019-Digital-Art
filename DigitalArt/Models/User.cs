using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalArt.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirthDay { get; set; }

        public string Status { get; set; }

        public string About { get; set; }

        public string Password { get; set; }

        public byte[] Avatar { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Role { get; set; }

        public ICollection<Artwork> Artworks { get; set; }
    }
}
