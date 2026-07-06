namespace EvalSystem.Api.Models;

/// <summary>
/// Pl. "2026-06". Lezárás után az érintett EmployeeEvaluation-ök nem szerkeszthetők
/// (kivéve HR/Admin felülbírálással - ld. EmployeeEvaluation.OverriddenByUserId).
/// </summary>
public class EvaluationPeriod
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;      // "2026-06"
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public bool IsClosed { get; set; }
    public DateTime? ClosedAt { get; set; }
    public Guid? ClosedByUserId { get; set; }
}

/// <summary>
/// Egy dolgozó egy időszakra vonatkozó értékelése egy adott sablon szerint.
/// Ha a dolgozó a hónap közben költséghelyet váltott, több EmployeeEvaluation
/// jöhet létre ugyanarra az időszakra (egy-egy a régi és az új vezetőtől),
/// és a végső riportban a napok arányában súlyozott átlaguk jelenik meg.
/// </summary>
public class EmployeeEvaluation
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; } = default!;

    public Guid EvaluationPeriodId { get; set; }
    public EvaluationPeriod EvaluationPeriod { get; set; } = default!;

    public Guid EvaluationTemplateId { get; set; }
    public EvaluationTemplate EvaluationTemplate { get; set; } = default!;

    /// <summary>Melyik vezető adta - a költséghely-hozzárendelésen keresztül dől el, ki jogosult.</summary>
    public Guid EvaluatedByUserId { get; set; }
    public ApplicationUser EvaluatedByUser { get; set; } = default!;

    /// <summary>Erre a szakaszra vonatkozik az értékelés (a súlyozott átlaghoz kellenek a napok).</summary>
    public DateOnly SegmentStart { get; set; }
    public DateOnly SegmentEnd { get; set; }

    public bool IsSubmitted { get; set; }
    public DateTime? SubmittedAt { get; set; }

    /// <summary>HR/Admin felülbírálás nyoma, ha a vezető nem töltötte ki időben.</summary>
    public Guid? OverriddenByUserId { get; set; }
    public DateTime? OverriddenAt { get; set; }

    public ICollection<EvaluationEntry> Entries { get; set; } = new List<EvaluationEntry>();
}

/// <summary>
/// A tényleges pontszám: melyik kompetencia, melyik dátumra (Once módnál mindig
/// az időszak egy rögzített napja, pl. hónap vége), mennyi pontot ért.
/// Ez a közös "atom" mind a négy sablontípushoz.
/// </summary>
public class EvaluationEntry
{
    public Guid Id { get; set; }

    public Guid EmployeeEvaluationId { get; set; }
    public EmployeeEvaluation EmployeeEvaluation { get; set; } = default!;

    public Guid CompetencyId { get; set; }
    public Competency Competency { get; set; } = default!;

    public DateOnly EntryDate { get; set; }
    public decimal Score { get; set; }
    public string? Comment { get; set; }
}
