namespace EvalSystem.Api.Models;

/// <summary>GDPR miatt minden személyesadat-érintő eseményt rögzítünk.</summary>
public class AuditLog
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }
    public string Action { get; set; } = default!;     // pl. "Employee.Update"
    public string EntityName { get; set; } = default!;  // pl. "Employee"
    public string EntityId { get; set; } = default!;

    public string? OldValue { get; set; }   // JSON
    public string? NewValue { get; set; }   // JSON

    public string? IpAddress { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Egy SFTP import futásának összefoglalója. Az első futás "Full", utána
/// mindegyik "Delta" - csak a változásokat tartalmazza, ezekből épül fel
/// az admin emailben kiküldött napi összefoglaló is.
/// </summary>
public class ImportHistory
{
    public Guid Id { get; set; }

    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }

    public bool IsFullImport { get; set; }

    public int NewEmployees { get; set; }
    public int UpdatedEmployees { get; set; }
    public int TerminatedEmployees { get; set; }
    public int CostCenterChanges { get; set; }
    public int ManagerChanges { get; set; }
    public int ErrorRows { get; set; }

    /// <summary>Hibás/párosíthatatlan sorok részletei - ez kerül bele az admin emailbe.</summary>
    public string? ErrorDetailsJson { get; set; }

    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
}
