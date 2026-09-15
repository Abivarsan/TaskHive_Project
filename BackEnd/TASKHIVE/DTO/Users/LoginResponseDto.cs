namespace TASKHIVE.DTO.Users
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public int UserCategoryId { get; set; }
        public bool IsFirstLogin { get; set; }
    }
}
