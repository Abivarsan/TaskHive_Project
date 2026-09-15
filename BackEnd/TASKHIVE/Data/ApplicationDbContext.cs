using Microsoft.EntityFrameworkCore;
using TASKHIVE.Model;

namespace TASKHIVE.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserCategory> UserCategories { get; set; }
        public DbSet<Work> Works { get; set; }
        public DbSet<TimeLog> TimeLogs { get; set; }
        public DbSet<UserMeeting> UserMeetings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserWork> UserWorks { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Label> Labels { get; set; }
        public DbSet<WorkLabel> WorkLabels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Role → Users (One-to-Many)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.roleId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserCategory → Users (One-to-Many)
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserCategory)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.userCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Users → UserWorks (One-to-Many)
            modelBuilder.Entity<UserWork>()
                .HasOne(uw => uw.User)
                .WithMany(u => u.UserWorks)
                .HasForeignKey(uw => uw.userId)
                .OnDelete(DeleteBehavior.Cascade);

            // Work → UserWorks (One-to-Many)
            modelBuilder.Entity<UserWork>()
                .HasOne(uw => uw.Work)
                .WithMany(w => w.UserWorks)
                .HasForeignKey(uw => uw.workId)
                .OnDelete(DeleteBehavior.Cascade);

            // Users → TimeLogs (One-to-Many)
            modelBuilder.Entity<TimeLog>()
                .HasOne(tl => tl.User)
                .WithMany(u => u.TimeLogs)
                .HasForeignKey(tl => tl.userId)
                .OnDelete(DeleteBehavior.Cascade);

            // Work → TimeLogs (One-to-Many)
            modelBuilder.Entity<TimeLog>()
                .HasOne(tl => tl.Work)
                .WithMany(w => w.TimeLogs)
                .HasForeignKey(tl => tl.workId)
                .OnDelete(DeleteBehavior.Cascade);

            // Users → Reports (One-to-Many)
            modelBuilder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.userId)
                .OnDelete(DeleteBehavior.Cascade);

            // Users → UserMeetings (One-to-Many)
            modelBuilder.Entity<UserMeeting>()
                .HasOne(um => um.User)
                .WithMany(u => u.UserMeetings)
                .HasForeignKey(um => um.userId)
                .OnDelete(DeleteBehavior.Cascade);

            // Meeting → UserMeetings (One-to-Many)
            modelBuilder.Entity<UserMeeting>()
                .HasOne(um => um.Meeting)
                .WithMany(m => m.UserMeetings)
                .HasForeignKey(um => um.meetingId)
                .OnDelete(DeleteBehavior.Cascade);

            // Work → Project (One-to-Many)
            modelBuilder.Entity<Work>()
                .HasOne(w => w.Project)
                .WithMany(p => p.Works)
                .HasForeignKey(w => w.projectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Work → Category (One-to-Many)
            modelBuilder.Entity<Work>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Works)
                .HasForeignKey(t => t.categoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Work → Labels (Many-to-Many)
            modelBuilder.Entity<WorkLabel>()
                .HasOne(tl => tl.Work)
                .WithMany(t => t.WorkLabels)
                .HasForeignKey(tl => tl.workId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkLabel>()
                .HasOne(tl => tl.Label)
                .WithMany(l => l.WorkLabels)
                .HasForeignKey(tl => tl.labelId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
