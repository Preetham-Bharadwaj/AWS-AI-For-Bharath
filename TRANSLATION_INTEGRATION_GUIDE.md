# Translation Integration Guide

## Current Status

✅ Translation system created with English and Hindi
✅ Translation function `t(key, language)` available
✅ Language prop added to all step components
✅ HistoryPanel updated with translations
✅ LocationStep partially updated

## What Needs to be Done

You need to replace all hardcoded English text with `t('key', language)` function calls throughout the app.

## Pattern to Follow

### Before:
```javascript
<button>Click Me</button>
<p>This is some text</p>
```

### After:
```javascript
<button>{t('clickMe', language)}</button>
<p>{t('someText', language)}</p>
```

## Components to Update

### 1. LocationStep (partially done)
- [x] Header and description
- [ ] Button text: "Detecting Location…", "Detect My Location"
- [ ] Confirmation text: "DETECTED LOCATION", "Is this your correct location?"
- [ ] Button labels: "Yes, Continue", "Re-detect", "Enter location manually instead"
- [ ] Search placeholder and messages

### 2. FamilyMemberStep
Update all text in this component:
- "FAMILY MEMBERS", "Select a saved member or add a new one"
- "Select Member", "Add New Member"
- "NO FAMILY MEMBERS SAVED"
- "Add family members to save their details for quick access in future visits"
- "Add First Member", "Continue with {name}"
- "DELETE MEMBER?", "This will permanently remove..."
- "Cancel", "Delete"
- Form labels: "Full Name", "Relation", "Age", "Gender", etc.

### 3. PatientDetailsStep (if exists)
- All form labels
- Placeholders
- Button text
- Error messages

### 4. SymptomsStep
- "What are you experiencing?"
- "Quick select common symptoms:"
- Symptom category buttons
- "How long have you had these symptoms?"
- "Severity Level"
- Severity options: "Mild", "Moderate", "Severe", "Critical"
- "Find Hospitals Near Me"

### 5. HospitalsStep
- "NEARBY HOSPITALS"
- "{count} facilities found"
- "Real data via AI Web Search"
- "List", "Map"
- "LIVE MAP VIEW"
- "Available", "Closed", "Selected"
- "Beds Available", "Occupied", "Open", "Emergency"
- "Analyze Symptoms & Get AI Recommendation"

### 6. RecommendationStep
- "AI TRIAGE COMPLETE"
- "AI Medical Analysis"
- "ASSESSMENT", "POSSIBLE CONDITIONS"
- "RANKED HOSPITAL MATCHES"
- "Best Match"
- "Booking token for..."
- "Select an available hospital above"
- "Generate Priority Token for..."

### 7. TokenStep
- "TOKEN GENERATED SUCCESSFULLY"
- "TOKEN NUMBER"
- "Position in Queue", "Est. Wait Time", "Priority Level"
- "Live Queue Tracking Active"
- "Show this token at reception"
- "LIVE PRIORITY QUEUE"
- "{count} patients"
- "Now Serving", "You"
- "Home"
- Ambulance prompt text

### 8. SettingsPanel
Already has translation keys, just ensure they're used:
- Use `t('settingsTitle', language)`
- Use `t('theme', language)`, `t('darkMode', language)`, `t('lightMode', language)`
- Use `t('language', language)`
- Use `t('saveSettings', language)`

## Example: Updating a Component

Here's how to update the FamilyMemberStep header:

### Find this:
```javascript
<h2 style={{...}}>
  👨‍👩‍👧‍👦 FAMILY MEMBERS
</h2>
<p style={{...}}>Select a saved member or add a new one</p>
```

### Replace with:
```javascript
<h2 style={{...}}>
  👨‍👩‍👧‍👦 {t('familyMembers', language).toUpperCase()}
</h2>
<p style={{...}}>{t('selectOrAdd', language)}</p>
```

## Adding New Translation Keys

If you find text that doesn't have a translation key, add it to the translations object:

```javascript
const translations = {
  en: {
    // ... existing keys
    newKey: "New English Text",
  },
  hi: {
    // ... existing keys
    newKey: "नया हिंदी पाठ",
  }
};
```

## Testing Translations

1. Run the app
2. Open Settings (hamburger menu)
3. Switch language between English and Hindi
4. Navigate through all steps
5. Verify all text changes to the selected language

## Common Mistakes to Avoid

1. **Don't forget `.toUpperCase()`** for headers that should be uppercase:
   ```javascript
   {t('header', language).toUpperCase()}
   ```

2. **Don't translate dynamic content** like patient names, hospital names, etc.

3. **Keep emojis and icons outside** the translation:
   ```javascript
   🏥 {t('hospital', language)}  // ✅ Correct
   {t('🏥 hospital', language)}  // ❌ Wrong
   ```

4. **Use template literals** for dynamic text:
   ```javascript
   {t('continueWith', language)} {memberName}
   ```

## Priority Order

Update components in this order for best user experience:

1. ✅ HistoryPanel (done)
2. ✅ SettingsPanel (done)
3. 🔄 LocationStep (in progress)
4. FamilyMemberStep
5. SymptomsStep
6. HospitalsStep
7. RecommendationStep
8. TokenStep

## Quick Find & Replace Tips

Use your editor's find feature to locate hardcoded text:

- Search for: `"[A-Z][a-z]+ `
- Search for: `>([A-Z][a-z]+)</`
- Search for common words: "Select", "Add", "Continue", "Cancel", etc.

## Verification Checklist

- [ ] All buttons translate
- [ ] All headers translate
- [ ] All descriptions translate
- [ ] All form labels translate
- [ ] All placeholders translate
- [ ] All error messages translate
- [ ] All status messages translate
- [ ] No console errors when switching languages
- [ ] Layout doesn't break with longer Hindi text
- [ ] Default language is English
