using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalArt.Models
{
    public class Artwork
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public byte[] Art { get; set; }

        public User Author { get; set; }

        public string Tags { get; set; }

        public ICollection<Like> Likes { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public DateTime DateOfPublication { get; set; }

        public int CountViews { get; set; }
    }
}
