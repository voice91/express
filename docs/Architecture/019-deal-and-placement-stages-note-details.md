# Deal and Placement Details

## Deal Stage Information

1. **New**
    - *Description:* Initial stage for a new deal.

2. **Preparing Materials**
    - *Description:* Materials for the deal are being prepared.

3. **Out in Market**
    - *Description:* The deal is actively seeking opportunities.
    - *Additional Info:* Once a placement is sent, the deal moves to the `Out in Market` stage.

4. **Selecting Lender**
    - *Description:* Process of selecting a lender for the deal.
    - *Additional Info:* Once a placement is received, the stage updates to `Selecting Lender`.

5. **Closing**
    - *Description:* Closing stage of the deal.
    - *Additional Info:* Once a placement stage updates to Closing, the deal stage becomes `Closing`.

6. **Closed**
    - *Description:* The deal has been successfully closed.
    - *Additional Info:* Once a placement stage updates to Closed, the deal stage becomes `Closed`.

7. **Archive**
    - *Description:* The deal is archived, possibly for historical reference.

8. **On Hold**
    - *Description:* The deal is temporarily on hold.

> **Note:**
> - Advisor can manually update the stage for deals .
---

## Deal Note

- **Advisor** and **Borrower** can add notes for the deal, displayed in the order of creation.
- Advisors can pin notes to show at the top.
- Both can add, update, and remove notes.

## Deal Details

### 1. `New`

- *Description:* Waiting on initial information needed from the borrower.

### 2. `Preparing Materials`

- *Description:* Advisor is preparing materials.

### 3. `Out in Market`

- *Description:* Outreach to [Number] Lenders.
- *Additional Info:* The number of lenders is determined dynamically based on the stage of lender placement.

### 4. `Selecting Lender`

- *Description:* [Number] Quotes Received.
- *Additional Info:* The number of quotes is dynamically determined based on the existence of terms in lender placement.

### 5. `Closing`

- *Description:* In closing with [List of Lending Institutions].
- *Additional Info:* Lending institutions are dynamically retrieved based on the closing stage.

---

## Placement Stage Information

### 1. `New`

- *Description:* Represents a new lender placement.

### 2. `Sent`

- *Description:* Deal details have been sent to the lender.
- *Additional Info:* Once deal is sent, the placement stage becomes `Sent`.

### 3. `Reviewing`

- *Description:* Currently under review by Lender.
- *Additional Info:* Once deal details are opened by lender, the stage becomes `Reviewing`.

### 4. `Terms Received`

- *Description:* Terms for the lender placement have been received.
- *Additional Info:* Once terms are added, the stage becomes `Terms Received`.

### 5. `Pass`

- *Description:* Pass by the lender.

### 6. `Term Sheet Received`

- *Description:* The term sheet for the lender placement has been received.
- *Additional Info:* Once term sheet is uploaded, the stage becomes `Term Sheet Received`.

### 7. `Closing`

- *Description:* In the closing stage of the lender placement.
- *Additional Info:* Advisors can manually update the `Closing` stage.

### 8. `Closed`

- *Description:* The lender placement has been successfully closed.
- *Additional Info:* Advisors can manually update the `Closed` stage.

### 9. `Not Responsive`

- *Description:* Lender is not responsive.

### 10. `Not Competitive`

- *Description:* Not competitive with other options.

### 11. `Archive`

- *Description:* Archived for historical reference.

> **Note:**
> - Advisor can manually update the stage for placements.
---

## Internal Note for Placement

- **Advisor** can add notes for the particular placement, visible only to advisors.
- Advisors have access to add, update, and remove notes.

## Next Step for Placement

### 1. `New`

- *Next Step:* Send the lender the deal.

### 2. `Sent`

- *Next Step:* Waiting on the lender for initial review.

### 3. `Reviewing`

- *Next Step:* Waiting on the lender to review.

### 4. `Terms Received`

- *Next Step:* Review and negotiate lender terms.

### 5. `Pass`

- *Pass Reason:* Manually inputted string for why the lender passed.

### 6. `Term Sheet Received`

- *Next Step:* Review and negotiate term sheet.

### 7. `Closing`

- *Next Step:* Gather and send lender due diligence requests.

### 8. `Closed`

- *Note:* Lender closed the deal (no further detail for this stage).

### 9. `Not Responsive`

- *Next Step:* Follow up or archive lender.

---
