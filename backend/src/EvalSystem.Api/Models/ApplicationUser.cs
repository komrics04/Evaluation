using Microsoft.AspNetCore.Identity;

namespace EvalSystem.Api.Models;

/// <summary>
/// A rendszer bejelentkező felhasználója (vezető, HR ügyintéző, admin stb.).
/// Fontos: NEM minden Employee kap User fiókot, csak akinek értékelnie
/// vagy adminisztrálnia kell a rendszert.
/// </summary>
public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;

    /// <summary>Ha a felhasználó egyben dolgozó is (pl. területi vezető), opcionális kapcsolat.</summary>
    public Guid? EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<EmployeeCostCenterAssignment> ManagedCostCenters { get; set; } = new List<EmployeeCostCenterAssignment>();
}

public class ApplicationRole : IdentityRole<Guid>
{
    // Roles: Admin, HR, TerulentiVezeto, Vezeto, CsakOlvaso
}
