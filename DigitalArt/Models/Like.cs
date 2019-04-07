using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalArt.Models
{
    public class Like
    {
        public int Id { get; set; }

        public Artwork Artwork { get; set; }

        public User LikedUser { get; set; }
    }
}
