namespace EvalSystem.Api.Models;

public enum RepeatMode
{
    /// <summary>Egyszeri bejegyzés az időszakban (pl. havi 1 pontszám).</summary>
    Once,

    /// <summary>Naponta ismétlődő bejegyzés (pl. napi pontszám).</summary>
    Daily
}

/// <summary>
/// A négy jelenlegi Excel-alapú forma (egyszerű / feladatonkénti / napi / napi+feladatonkénti)
/// mind leírható ugyanazzal a (Kompetencia x Dátum x Pontszám) szerkezettel:
///   - Típus 1: 1 kompetencia,  Once
///   - Típus 2: N kompetencia,  Once
///   - Típus 3: 1 kompetencia,  Daily
///   - Típus 4: N kompetencia,  Daily
/// Így egy közös motor szolgálja ki mind a négyet, és új típus (pl. heti)
/// hozzáadásához elég egy új RepeatMode érték.
/// </summary>
public class EvaluationTemplate
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }

    public RepeatMode RepeatMode { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<Competency> Competencies { get; set; } = new List<Competency>();
    public ICollection<EmployeeEvaluation> Evaluations { get; set; } = new List<EmployeeEvaluation>();
}

/// <summary>
/// Egy értékelendő szempont/feladat a sablonon belül.
/// Típus 1-nél és Típus 3-nál egyetlen Competency van a sablonban ("Összesített teljesítmény").
/// Típus 2-nél és Típus 4-nél több (pl. "Feladat A", "Feladat B"...).
/// </summary>
public class Competency
{
    public Guid Id { get; set; }

    public Guid EvaluationTemplateId { get; set; }
    public EvaluationTemplate EvaluationTemplate { get; set; } = default!;

    public string Name { get; set; } = default!;
    public int SortOrder { get; set; }

    public int MinScore { get; set; } = 1;
    public int MaxScore { get; set; } = 10;
}
