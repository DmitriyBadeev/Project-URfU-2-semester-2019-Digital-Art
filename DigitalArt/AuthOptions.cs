using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace DigitalArt
{
    public class AuthOptions
    {
        public const string ISSUER = "DigitalArtService";
        public const string AUDIENCE = "https://localhost:44380";
        const string KEY = "DIGITAL_ART_URFU_PROJECT_$45";
        public const int LIFETIME_IN_MINUTE = 60;

        private const string SALT_STRING = "salt_of_project_URFU_$45";

        public static SymmetricSecurityKey GetSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));

        private static readonly HashAlgorithm Algorithm = new SHA256CryptoServiceProvider();

        private static readonly byte[] Salt = Encoding.UTF8.GetBytes(SALT_STRING);

        public static string ComputeHash(string password)
        {
            var bytePassword = Encoding.UTF8.GetBytes(password);

            var saltedPassword = new byte[bytePassword.Length + Salt.Length];
            Salt.CopyTo(saltedPassword, 0);
            bytePassword.CopyTo(saltedPassword, Salt.Length);

            var hashedBytes = Algorithm.ComputeHash(saltedPassword);

            return BitConverter.ToString(hashedBytes);
        }
    }
}
