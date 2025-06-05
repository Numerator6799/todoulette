# TODOulette Version 1

## 0. Draft 
- Users can sign in with Google as authenticator
- Once they sign in for the first time, an account is created for them
- For now, an account has only 1 roulette. For now, new roulettes will not be added so no page to list or option to create a new roulette is offered
- A user can delete their account, upon confirmation. This action is permanent
- If the user deletes their account, all their TODOulette data is deleted from wherever the data is saved
- A new user must start by configuring their roulette (i.e. add items)
- All data is saved on a database behind an api. Or... at the user's Google Drive (since only Google authentication is supported, might aswell skip database creation)
- Once the roulette is configured, the user sees the roulette and can either do a spin or reconfigure the roulette
- A roulette has 3 daily free spins
- While the roulette is spinning, the Spin and the Edit buttons are disabled
- Once the spin finishes, another page shows the result with the "I promise I'll do it" button
- When the user has no spins left, the Spin button is disabled and the following message shows below: "You have used all your spins for today, go do your tasks! See you tomorrow!"


Note: Payment for more spins will be considered for version 1.5.

## 1. Overview

**TODOulette** is a satirical twist on traditional to-do list applications. Instead of simply checking off items, users create a **roulette** of tasks and must rely on chance by spinning the roulette. Users are given a limited number of free spins per day, which encourages them to commit to tasks rather than cherry-pick what they want to do. The application currently supports only Google-based authentication and leverages users’ Google Drives for data persistence instead of a dedicated database. All user data, including their configured roulette and spun results, is controlled by the user with explicit options to reconfigure or permanently delete their account.

---

## 2. High-Level Architecture

### 2.1. Client-Side (Frontend)
- **User Interface:**  
  - A single-page application (SPA) built using a modern framework (e.g., React or Vue) to deliver a fast and responsive user experience.
  - **Pages / Views:**
    - **Sign-in/Onboarding:** Redirects users to sign in with Google.
    - **Roulette Configuration:** For new users, or anytime the user clicks “reconfigure.” Users can add, edit, or delete items.
    - **Roulette View:** Displays the roulette with interactive spin functionality.
    - **Spin Result:** Shows the outcome of the spin, with a confirmation action ("I promise I'll do it").
    - **Account Management:** Provides options to delete the account upon confirmation.
  - **State and UI Behavior:**
    - While the roulette is in motion (i.e., spinning), the Spin and Edit buttons are disabled.
    - Limited daily spins (3 free spins/day) are enforced visually (e.g., a counter/badge) and logically.
    - Where there are no more spins left, the Spin button is disabled and shows (0) count. Below, there's a message "You have used all your spins for today, go do your tasks! See you tomorrow!"

### 2.2. Backend / Data Layer
- **Authentication:**  
  - Google OAuth is the sole authentication mechanism.
  - On first sign-in, a new user account is created.
  
- **Data Persistence Options:**  
  - **Google Drive Storage:** Tightly coupled with Google authentication; user data (roulette configuration, spin history, spins left for the daily quota) is saved as files or structured data within a user-specific folder.
  - **API Endpoint:**  
    - A serverless API or lightweight backend that acts as the intermediary between the client and Google Drive.
    - Alternatively, if the application later expands with additional functions or non-Google integrations, a dedicated database like Firestore, MongoDB, or PostgreSQL can be considered.

- **Account Deletion:**  
  - Upon user request and confirmation, the API triggers a removal of all linked data from Google Drive. This process should be atomic to avoid partial deletion.
  
- **Data Security:**  
  - User data is isolated by account, with permission scopes only granting access to relevant portions of their Google Drive.
  - All API endpoints require authentication tokens and validation before allowing any data modifications.

---

## 3. Detailed Feature Design

### 3.1. Authentication & Account Life Cycle
- **Sign-In Flow:**  
  - Users sign in using their Google credentials.  
  - On first sign-in, the system creates a new account profile with a default roulette and initializes the daily spin counter.
  - Sessions are maintained using OAuth tokens.
  
- **Account Deletion Flow:**  
  - A dedicated section in the account management menu lets users delete their account.
  - Upon confirmation, the system makes a call to the API to permanently remove all data, including task items and spin history, from Google Drive.
  - Since account deletion is permanent, an undo mechanism or soft delete is not provided.

### 3.2. Roulette Configuration
- **Initial Configuration:**  
  - First-time users must configure their roulette before spinning.
  - The configuration page allows for adding multiple task items.
  - The items are added in a text area for ease of use, and each item is separated by line.
  
- **Editing Items:**  
  - At any time, users can reconfigure their roulette to update tasks.
  - The configuration process entails both a user-friendly interface and backend data updates (via the API or direct Google Drive interactions).
  
- **User Experience:**  
  - The process should be straightforward and playful, matching the satirical nature of the app.

### 3.3. Roulette Spin Mechanics
- **Daily Free Spins:**  
  - Users receive 3 free spins every day.  
  - A counter is displayed indicating the number of available spins.
  
- **Spin Execution:**  
  - Once the user engages the spin, the UI enters a “disabled” state—disabling the Spin and Edit buttons—to prevent data corruption or cheating.
  - An animation or progress indicator runs until the spin concludes.
  
- **Result Presentation:**  
  - After the spin, the application transitions to a results page showing the selected task along with an action button ("I promise I'll do it").
  - Clicking the promise button is intended to physically or mentally register the user’s commitment. Tracking whether the task was completed might be a future enhancement.

### 3.4. Data Flow & Storage Strategy
- **Primary Flow:**
  - **On Configuration:** Data is written to Google Drive formatted as JSON (or similar structured format) containing task items and metadata (e.g., creation date, order).
  - **During Spins:** The system reads the current configuration from storage, performs a randomized pick, and logs the result in a spin history.
  - **Daily Limits:** The app tracks the number of spins performed; this is refreshed (or reset) when a new daily session starts.
  
- **Data Consistency and Transactionality:**
  - In the absence of a traditional Managed Database, transactions must be carefully managed within the API’s logic to ensure that a spin deduction and task display are synchronized.
  - Consider using atomic writes or file-locking mechanisms on Google Drive if necessary.

---

## 4. UI/UX Considerations

### 4.1. Visual Design
- **Theme and Tone:**  
  - Given TODOulette’s satirical nature, the design should blend whimsical elements with clear affordances for correct operation. For instance:
    - Bold colors for spin actions.
    - Playful animations during the roulette spin.
    - Clear, humorous yet straightforward prompts on the configuration page.
    
### 4.2. Interaction Patterns
- **Responsive Design:**  
  - Ensure the application works seamlessly across various devices.
- **Visual Feedback:**  
  - Disable buttons and present loaders during asynchronous operations (spinning, account deletion, saving configuration).
- **Error Handling:**  
  - Provide clear error messages if data synchronization fails, if the Google Drive API encounters problems, or if the user's token expires.

---

## 5. Future Considerations & Scalability

- **Multiple Roulettes:**  
  - Although the MVP supports a single roulette per account, the architecture should be designed with expansion in mind. This might include abstracting the roulette configuration data model to allow multiple roulettes per account.
  
- **Task Completion Verification:**  
  - Future enhancements might include a mechanism where users can mark tasks as completed. Even though it stands in contrast to the satire, it could serve to add a layer of gamification or accountability.
  
- **Additional Authentication Providers:**  
  - If the user base grows or diversifies, consider supporting multiple authentication providers beyond Google.
  
- **Analytics & Reporting:**  
  - Adding historical data on spins, task selections, and user commitments could be used to generate insights or playful productivity reports in a future version.

---

## 6. Summary of User Flows

| **User Action**                 | **Description**                                                                                     | **UI State**                                             | **Backend/Storage Action**                          |
|---------------------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------------------|
| **Sign In with Google**         | User authenticates using Google OAuth; first-time triggers account creation.                        | Signin Button → Loading → Dashboard                      | Create account, initialize roulette config, daily spin counter. |
| **Configure Roulette**          | User adds, edits, or deletes tasks in the roulette.                                                | Interactive form for task entry.                         | Save updated configuration to Google Drive.        |
| **Spin Roulette**               | User starts spin; UI disables spin and edit buttons until the spin concludes.                       | Disabled buttons, animated spinner                       | Read roulette data, perform random selection, log spin result.  |
| **View Spin Result**            | Display the task selected by the roulette with commitment confirmation button.                    | Presentation page with “I promise I'll do it” button.      | Log spin confirmation if needed.                    |
| **Account Deletion**            | On user confirmation, all account-related data is purged.                                           | Confirmation dialog → Success message                    | Delete user data from Google Drive.                |

---

## 7. User Stories

- As a user, I want to sign in with my Google account so I can securely access my TODOulette account.
- As a user, I want my account to be automatically created upon my first sign in so I can start using the app immediately.
- As a user, I want to configure my roulette so I can add my tasks and spin it later.
- As a user, I want to view my configured roulette so I can review my list of tasks before spinning.
- As a user, I want to spin the roulette so I can randomly select a task to complete.
- As a user, I want the Spin and Edit buttons to be disabled while the roulette is spinning so I can be assured that no accidental inputs affect my spin.
- As a user, I want to view the spin result with a confirmation button ("I promise I'll do it") so I can commit to the task selected by the roulette.
- As a user, I want to be notified with a clear message when I have no spins left for the day so I can understand why the Spin button is disabled.
- As a user, I want to reconfigure (edit) my roulette so I can update or modify my tasks at any time.
- As a user, I want to delete my account with confirmation so I can permanently remove my data from TODOulette when I choose to.

## 8. Final Toughts

Suggestions for Refinement:
🔹 Spin Limitation Messaging: The newly added rule for exhausted spins is a good touch! Ensure this message is visually distinct and engaging—maybe even humorously reinforcing the idea of "no cheating, get to work!"
🔹 Task Management Options: Could the user optionally tag or categorize tasks for better organization? While the core idea is randomness, users may benefit from filtering or structuring certain types of tasks.
🔹 User Guidance: Consider adding a simple onboarding/tutorial for first-time users—perhaps a playful walkthrough explaining that they must rely on fate rather than careful planning.
🔹 Customization Features for Future Expansion: While single-roulette functionality is set for now, it’s worth ensuring the design allows easy expansion to multiple roulettes later.

