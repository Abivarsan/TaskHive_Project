namespace TASKHIVE.Service
{
    public interface IPasswordGenerator
    {
        string GenerateRandomPassword();
    }

    public class PasswordGenerator : IPasswordGenerator
    {
        private const string Lowercase = "abcdefghijklmnopqrstuvwxyz";
        private const string Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string Numbers = "0123456789";
        private const string SpecialChars = "!@#$%^&*()_-+=<>?";

        public string GenerateRandomPassword()
        {
            var random = new Random();
            var password = new char[12];

            // Ensure at least one of each type
            password[0] = Lowercase[random.Next(Lowercase.Length)];
            password[1] = Uppercase[random.Next(Uppercase.Length)];
            password[2] = Numbers[random.Next(Numbers.Length)];
            password[3] = SpecialChars[random.Next(SpecialChars.Length)];

            // Fill the rest with random characters from all sets
            var allChars = Lowercase + Uppercase + Numbers + SpecialChars;
            for (int i = 4; i < 12; i++)
            {
                password[i] = allChars[random.Next(allChars.Length)];
            }

            // Shuffle the password
            return new string(password.OrderBy(x => random.Next()).ToArray());
        }
    }
}
