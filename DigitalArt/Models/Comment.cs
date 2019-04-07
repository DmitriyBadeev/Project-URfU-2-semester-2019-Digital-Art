using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalArt.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public User Author { get; set; }

        public Artwork Artwork { get; set; }

        public string CommentString { get; set; }

        public ICollection<Like> Likes { get; set; }
    }
}
