# Értékelési rendszer

## Indítás GitHub Codespace-ben

1. Töltsd fel ezt a mappát egy új GitHub repóba (root szinten legyen a `.devcontainer` mappa).
2. GitHub-on: **Code → Codespaces → Create codespace on main**.
3. A Codespace automatikusan felépíti a devcontainert (.NET 9 SDK, Node 20, PostgreSQL konténer),
   majd lefut a `postCreateCommand` (`dotnet restore` + `npm install`).
4. Backend indítása:
   ```
   cd backend/src/EvalSystem.Api
   dotnet ef database update   # első alkalommal: dotnet ef migrations add InitialCreate
   dotnet run
   ```
5. Frontend indítása (külön terminálban):
   ```
   cd frontend
   npm run dev
   ```
6. Swagger: `http://localhost:5000/swagger`, Hangfire dashboard: `http://localhost:5000/hangfire`

## Mi van már kész

- `.devcontainer/` — Codespace konfiguráció (.NET 9, Node 20, PostgreSQL)
- `backend/` — ASP.NET Core Web API váz, Identity + EF Core + Hangfire regisztrálva
- `backend/.../Models/` — a megbeszélt adatmodell (dolgozók, költséghely-történet,
  rugalmas értékelési sablon/kompetencia/bejegyzés szerkezet, audit log, import history)
- `frontend/` — React + TypeScript + Vite alapváz

## Következő lépések (a saját ütemezésed sorrendjében)

1. **Alaprendszer**
   - `dotnet ef migrations add InitialCreate` — az első migráció legenerálása
   - `EmailTwoFactorTokenProvider` regisztrálása + SMTP küldő szolgáltatás megírása
   - Auth kontrollerek: login, jelszó-visszaállítás, 2FA kód küldés/ellenőrzés
   - Szerepkörök (Admin, HR, TerulentiVezeto, Vezeto, CsakOlvaso) seedelése

2. **Dolgozói import**
   - `SftpImportService`: SSH.NET-tel CSV letöltés, majd összehasonlítás az előző
     állapottal (delta-számítás), `ImportHistory` rekord létrehozása
   - Hangfire recurring job éjféli futtatásra
   - Email küldő a napi összefoglalóhoz (admin/HR) — a delta + hibás sorok listája

3. **Értékelési motor**
   - `EvaluationTemplate` + `Competency` admin CRUD felület
   - `EmployeeEvaluation` létrehozás logika: költséghely-váltás esetén automatikus
     szegmentálás (`SegmentStart`/`SegmentEnd`), súlyozott átlag számítás riportnál

4. **Időszakkezelés, riportok, GDPR audit** — a specifikációban leírtak szerint.

## Megjegyzés a költséghely-váltás kezeléséről

Az `EmployeeCostCenterAssignment` tábla `ValidFrom`/`ValidTo` mezőkkel dolgozik.
Váltáskor az import lezárja a régi rekordot, és nyit egy újat. Egy hónapon belüli
váltásnál ez két `EmployeeEvaluation` rekordot eredményez ugyanarra az időszakra
(egyet-egyet a két vezetőtől), a `SegmentStart`/`SegmentEnd` mezőkkel jelölve,
hogy melyik napokra vonatkozik — a riportnál ebből számolható a napokkal súlyozott
átlag.
