namespace EvalSystem.Api.Models;

/// <summary>
/// A dolgozói törzs egy rekordja. Az adatok az SFTP importból származnak,
/// kézi szerkesztés csak kivételes esetben (pl. jegyzet mezők) engedett.
/// </summary>
public class Employee
{
    public Guid Id { get; set; }

    /// <summary>A forrásrendszer (HR/bér) egyedi azonosítója - erre kulcsolunk importnál.</summary>
    public string ExternalId { get; set; } = default!;

    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? Email { get; set; }

    public DateOnly HireDate { get; set; }
    public DateOnly? TerminationDate { get; set; }

    /// <summary>
    /// Aktív = jelenleg érvényes jogviszony. Tartós betegség, GYES stb. esetén
    /// az adat NEM inaktiválódik, csak a jogviszony állapota tükröződik itt.
    /// </summary>
    public bool IsActive { get; set; } = true;

    public Guid DepartmentId { get; set; }
    public Department Department { get; set; } = default!;

    public ICollection<EmployeeCostCenterAssignment> CostCenterAssignments { get; set; } = new List<EmployeeCostCenterAssignment>();
    public ICollection<EmployeeEvaluation> Evaluations { get; set; } = new List<EmployeeEvaluation>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
