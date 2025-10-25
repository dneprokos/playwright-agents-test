# Retro Video Games Portal - Search Functionality Test Plan

## Executive Summary

This test plan covers the search functionality of the Retro Video Games Portal (`http://localhost:9000/`). The portal allows users to discover classic video games, featuring a search box labeled "Search games..." on the homepage. The plan includes scenarios for normal usage, edge cases, error handling, and validation, ensuring robust coverage for the search feature.

## Test Layers

- **E2E**: End-to-end tests that verify complete user journeys through the UI
- **Integration (API)**: Tests that verify the API endpoints and their responses
- **Unit**: Tests that verify individual components and functions in isolation

---

## Test Scenarios

### 1. Search for a Game by Full Title

**Assumptions:** Fresh homepage, no filters applied.

**Test Layer:** E2E

**Steps:**

1. Focus on the "Search games..." textbox.
2. Type the full name of a game (e.g., "Contra").
3. Observe the game list.

**Expected Results:**

- Only games matching "Contra" are displayed.
- The game "Contra" appears in the results.
- Pagination updates to reflect filtered results.

---

### 2. Search for a Game by Partial Title

**Assumptions:** Fresh homepage.

**Test Layer:** Integration (API)
**API Endpoint:** `GET /api/games?search=Man`

**Steps:**

1. Focus on the "Search games..." textbox.
2. Type a partial name (e.g., "Man").
3. Observe the game list.

**Expected Results:**

- All games with "Man" in their title (e.g., "Mega Man 2", "Castlevania") are displayed.
- Non-matching games are hidden.

---

### 3. Search with No Matching Results

**Assumptions:** Fresh homepage.

**Test Layer:** Integration (API)
**API Endpoint:** `GET /api/games?search=nonexistent`

**Steps:**

1. Focus on the "Search games..." textbox.
2. Type a string that does not match any game (e.g., "Zelda").
3. Observe the game list.

**Expected Results:**

- No games are displayed.
- A message such as "No games found" appears (if implemented).
- Pagination controls are disabled or hidden.

---

### 4. Clear Search Input

**Assumptions:** Search input contains text and results are filtered.

**Test Layer:** Unit
**Component:** SearchInput.tsx

**Steps:**

1. Delete all text from the "Search games..." textbox.
2. Observe the game list.

**Expected Results:**

- The full, unfiltered list of games is displayed.
- Pagination resets to the first page.

---

### 5. Search with Special Characters

**Assumptions:** Fresh homepage.

**Test Layer:** Integration (API)
**API Endpoint:** `GET /api/games?search=special-chars`

**Steps:**

1. Focus on the "Search games..." textbox.
2. Type special characters (e.g., "!@#$%^&\*()").
3. Observe the game list.

**Expected Results:**

- No games are displayed if no matches.
- No errors or crashes occur.

---

### 6. Case Insensitivity

**Assumptions:** Fresh homepage.

**Test Layer:** Integration (API)
**API Endpoint:** `GET /api/games?search=CONTRA` and `GET /api/games?search=contra`

**Steps:**

1. Focus on the "Search games..." textbox.
2. Type a game name in lowercase (e.g., "contra").
3. Observe the game list.

**Expected Results:**

- "Contra" is displayed regardless of case.
- Search is case-insensitive.

---

### 7. Search by Genre, Year, or Platform (if supported)

**Assumptions:** Fresh homepage.

**Test Layer:** E2E

**Steps:**

1. Type a genre (e.g., "Shooter"), year (e.g., "1987"), or platform (e.g., "NES") in the search box.
2. Observe the game list.

**Expected Results:**

- Games matching the entered genre, year, or platform are displayed.
- If not supported, no results or only title matches appear.

---

### 8. Rapid Input Changes

**Assumptions:** Fresh homepage.

**Test Layer:** Unit
**Component:** SearchInput.tsx (debounce/throttle functionality)

**Steps:**

1. Quickly type and delete different search terms in the textbox.
2. Observe the game list and UI responsiveness.

**Expected Results:**

- The game list updates smoothly without lag or errors.
- No crashes or UI glitches.

---

### 9. Search with Leading/Trailing Spaces

**Assumptions:** Fresh homepage.

**Test Layer:** Integration (API)
**API Endpoint:** `GET /api/games?search= Contra `

**Steps:**

1. Type a valid game name with leading/trailing spaces (e.g., " Contra ").
2. Observe the game list.

**Expected Results:**

- "Contra" is found and displayed.
- Spaces are trimmed for search matching.

---

### 10. Search While on a Non-First Page

**Assumptions:** User is on page 2 of the game list.

**Test Layer:** E2E

**Steps:**

1. Click "Next" to go to page 2.
2. Enter a search term in the textbox.
3. Observe the game list and pagination.

**Expected Results:**

- Search results are shown starting from the first page.
- Pagination updates to reflect filtered results.

---

## Quality Standards

- Each scenario is independent and can be run in any order.
- Negative and edge cases are included.
- Steps are specific and clear for any tester.
- Success and failure conditions are defined.

---

**File:** `search-test-plan.md`
