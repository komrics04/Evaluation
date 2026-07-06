using EvalSystem.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EvalSystem.Api.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<CostCenter> CostCenters => Set<CostCenter>();
    public DbSet<EmployeeCostCenterAssignment> EmployeeCostCenterAssignments => Set<EmployeeCostCenterAssignment>();

    public DbSet<EvaluationTemplate> EvaluationTemplates => Set<EvaluationTemplate>();
    public DbSet<Competency> Competencies => Set<Competency>();
    public DbSet<EvaluationPeriod> EvaluationPeriods => Set<EvaluationPeriod>();
    public DbSet<EmployeeEvaluation> EmployeeEvaluations => Set<EmployeeEvaluation>();
    public DbSet<EvaluationEntry> EvaluationEntries => Set<EvaluationEntry>();

    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<ImportHistory> ImportHistories => Set<ImportHistory>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Employee>(e =>
        {
            e.HasIndex(x => x.ExternalId).IsUnique();
            e.HasOne(x => x.Department).WithMany(d => d.Employees).HasForeignKey(x => x.DepartmentId);
        });

        builder.Entity<CostCenter>(e =>
        {
            e.HasIndex(x => x.Code).IsUnique();
        });

        builder.Entity<EmployeeCostCenterAssignment>(e =>
        {
            e.HasOne(x => x.Employee).WithMany(emp => emp.CostCenterAssignments).HasForeignKey(x => x.EmployeeId);
            e.HasOne(x => x.CostCenter).WithMany(c => c.Assignments).HasForeignKey(x => x.CostCenterId);
            e.HasOne(x => x.ManagerUser).WithMany(u => u.ManagedCostCenters).HasForeignKey(x => x.ManagerUserId);
            // Egy dolgozónak egy időpontban csak egy nyitott (ValidTo == null) szakasza lehet -
            // ezt alkalmazás szinten kell kikényszeríteni (EF Core nem támogat feltételes unique indexet
            // közvetlenül minden providerre, de PostgreSQL-en partial index-szel megoldható migrációban).
        });

        builder.Entity<EvaluationTemplate>(e =>
        {
            e.HasMany(x => x.Competencies).WithOne(c => c.EvaluationTemplate).HasForeignKey(c => c.EvaluationTemplateId);
        });

        builder.Entity<EvaluationPeriod>(e =>
        {
            e.HasIndex(x => x.Name).IsUnique();
        });

        builder.Entity<EmployeeEvaluation>(e =>
        {
            e.HasOne(x => x.Employee).WithMany(emp => emp.Evaluations).HasForeignKey(x => x.EmployeeId);
            e.HasOne(x => x.EvaluationPeriod).WithMany().HasForeignKey(x => x.EvaluationPeriodId);
            e.HasOne(x => x.EvaluationTemplate).WithMany(t => t.Evaluations).HasForeignKey(x => x.EvaluationTemplateId);
            e.HasOne(x => x.EvaluatedByUser).WithMany().HasForeignKey(x => x.EvaluatedByUserId);
        });

        builder.Entity<EvaluationEntry>(e =>
        {
            e.HasOne(x => x.EmployeeEvaluation).WithMany(ev => ev.Entries).HasForeignKey(x => x.EmployeeEvaluationId);
            e.HasOne(x => x.Competency).WithMany().HasForeignKey(x => x.CompetencyId);
            e.Property(x => x.Score).HasPrecision(5, 2);
        });
    }
}
