namespace EvalSystem.Api.Models;

public class CostCenter
{
    public Guid Id { get; set; }
    public string Code { get; set; } = default!;   // pl. "1001"
    public string Name { get; set; } = default!;

    public ICollection<EmployeeCostCenterAssignment> Assignments { get; set; } = new List<EmployeeCostCenterAssignment>();
}

public class Department
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}

/// <summary>
/// Időszakos hozzárendelés: melyik dolgozó, mikortól-meddig, melyik költséghelyhez
/// és melyik vezetőhöz tartozott. ValidTo = null → jelenleg is érvényes.
/// Egy dolgozónak egy időpontban csak egy AKTÍV (ValidTo == null vagy jövőbeli) rekordja lehet.
/// Költséghely-váltás esetén az import lezárja a régit (ValidTo = váltás előtti nap)
/// és nyit egy újat - így az érintett hónapban mindkét vezető látja a rá eső napokat,
/// és az értékelésnél a napok arányában súlyozott átlag számolható.
/// </summary>
public class EmployeeCostCenterAssignment
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; } = default!;

    public Guid CostCenterId { get; set; }
    public CostCenter CostCenter { get; set; } = default!;

    /// <summary>A vezető (User) aki ezen a szakaszon értékelhet.</summary>
    public Guid ManagerUserId { get; set; }
    public ApplicationUser ManagerUser { get; set; } = default!;

    public DateOnly ValidFrom { get; set; }
    public DateOnly? ValidTo { get; set; }
}
