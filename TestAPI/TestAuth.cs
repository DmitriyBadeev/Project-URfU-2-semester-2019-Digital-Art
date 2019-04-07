using DigitalArt;
using NUnit.Framework;

namespace Tests
{
    public class TestAuth
    {
        [Test]
        public void IsEqual_WhenEqualPassword()
        {
            var password = "Zxqw1290P";
            var hashedPassword = AuthOptions.ComputeHash(password);

            var password1 = "zxcvQWER45";
            var password2 = "zxcvQWER45";

            Assert.That(AuthOptions.ComputeHash(password1), Is.EqualTo(AuthOptions.ComputeHash(password2)));
            Assert.That(AuthOptions.ComputeHash("Zxqw1290P"), Is.EqualTo(hashedPassword));
        }

        [Test]
        public void IsNotEqual_WhenDifferentPasswords()
        {
            var password1 = "Zxqw1290P";
            var password2 = "Zxqw1209P";

            var hash1 = AuthOptions.ComputeHash(password1);
            var hash2 = AuthOptions.ComputeHash(password2);

            var password3 = "Zxwq1290P";
            var password4 = "Zxqw1290P";

            var hash3 = AuthOptions.ComputeHash(password3);
            var hash4 = AuthOptions.ComputeHash(password4);

            var password5 = "Zxqw1290P";
            var password6 = "Zxew1290P";

            var hash5 = AuthOptions.ComputeHash(password5);
            var hash6 = AuthOptions.ComputeHash(password6);

            Assert.That(hash1, Is.Not.EqualTo(hash2));
            Assert.That(hash3, Is.Not.EqualTo(hash4));
            Assert.That(hash5, Is.Not.EqualTo(hash6));
        }

        [Test]
        public void IsNotEqual_WhenNotEqualRegister()
        {
            var password1 = "zxqw1290p";
            var password2 = "Zxqw1290P";

            var hash1 = AuthOptions.ComputeHash(password1);
            var hash2 = AuthOptions.ComputeHash(password2);

            Assert.That(hash1, Is.Not.EqualTo(hash2));
        }
    }
}