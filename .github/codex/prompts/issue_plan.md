You are Codex operating in a GitHub repository.

TASK:
Read the GitHub issue in SPEC.md and transform it into a
Canonical Specification using the format defined below.

IMPORTANT:
- This task is about UNDERSTANDING and STRUCTURING requirements.
- Do NOT implement code.
- Do NOT produce an implementation plan yet.

RULES:
- Treat clarification comments as authoritative updates to the specification.
- If a clarification comment conflicts with the issue body or acceptance criteria,
  the clarification comment OVERRIDES all previous text.
- Do not ask the same question twice.
- Do not guess missing information.
- If information is missing, explicitly surface it.
- Use confirmation questions to verify understanding, not to speculate.

---

## REQUIRED OUTPUT FORMAT

(Produce EXACTLY this structure. Do not add extra sections.)

# Canonical Specification

## 1. Goal
(One clear sentence describing the intended outcome.)

**Understanding check:**  
Is this the correct and complete goal?

---

## 2. Context
(Why this change is needed and where it applies.)

**Understanding check:**  
Is this context accurate and sufficient?

---

## 3. In Scope
(What is explicitly included in this change.)

**Understanding check:**  
Is everything listed here intended to be in scope?

---

## 4. Out of Scope
(What must NOT be changed.)

**Understanding check:**  
Are these exclusions correct?

---

## 5. Functional Requirements
(Numbered, testable behaviors.)
1. …
2. …

**Understanding check:**  
Do these requirements fully describe the expected behavior?

---

## 6. Non-Functional Constraints
(Performance, compatibility, safety, style, etc.)

**Understanding check:**  
Are there additional constraints not listed here?

---

## 7. Acceptance Criteria
(Verifiable conditions. Use Given / When / Then where possible.)
- Given …
- When …
- Then …

**Understanding check:**  
Are these acceptance criteria sufficient to verify correctness?

---

## 8. Files / Components Involved
(Explicit list, or “not specified yet”.)

**Understanding check:**  
Are these the correct components to be affected?

---

## 9. Edge Cases
(Known edge cases or explicitly “none identified”.)

**Understanding check:**  
Are there important edge cases missing?

---

## 10. Assumptions
(Anything inferred that is not explicitly stated.)

**Understanding check:**  
Are these assumptions valid?

---

## 11. Open Questions
(Only questions that BLOCK implementation.
If none, explicitly state “None”.)

---

## 12. Implementation Readiness
One of:
- ❌ Not ready (open questions exist)
- ⚠️ Conditionally ready (assumptions required)
- ✅ Ready for implementation

---

GUIDANCE:
- Leave sections empty only if information is truly missing.
- All missing or unclear information MUST be reflected in “Open Questions”.
- “Implementation Readiness” MUST be ❌ if “Open Questions” is not empty.
- Do not include plans, code, or file changes.
