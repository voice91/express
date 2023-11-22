# Executive Summary 

* We can add executive summary when we add presentation and can edit it from edit deal in presentation tab.

The default sentence for executive summary is:
> On behalf of {{sponsorName}} (the “Sponsor”), Parallel CRE is seeking {{amount}} in {{loanTypeValue}} financing for {{dealName}} (the “Property”), a {{propertyType}} property located at {{address}}, {{city}}, {{state}}. The Sponsor, {{sponsorName}}, {{sponsorBioName}}.
 - {{sponsorName}} - It's the name of sponsor we select while creating the deal or when we edit deal from overview page, if we don't select the sponsor then the value of it will be [[Sponsor Name]].
 - {{amount}} - It's the requested loan amount of the deal 
   - $#.#m - If loan amount is greater than 1 million, if last digit is 5 do not round and include the digit if last digit is greater than 5 then round off the value
   - $###k - If loan amount is less than 1 million
 - {{loanTypeValue}} - It's the loan type that we select
 - {{dealName}} - It's the name of the deal
 - {{propertyType}} - Property type that we select when creating the deal
 - {{address}} - Address we added while creating the deal
 - {{city}} - The city of the deal added while creating the deal
 - {{state}} - The state of the deal added while creating the deal
 - {{sponsorBioName} - It's the first sentence of the sponsor bio of the sponsor that we selected, if we don't select the sponsor then the value of it will be [[Sponsor bio from Sponsor bio page]]

If we only add unit count at the time of creating deal then our executive summary would look like:
> On behalf of {{sponsorName}} (the “Sponsor”), Parallel CRE is seeking {{amount}} in {{loanTypeValue}} financing for {{dealName}} (the “Property”), a {{unitCount}}-unit, {{propertyType}} property located at {{address}}, {{city}}, {{state}}. The total purchase price is {{purchasePrice}} with a total cost of {{totalUsesValue}}. The Sponsor, {{sponsorName}}, {{sponsorBioName}}.
The executive summary changes as per the loan type and loan purpose we select, in addition to default sentence the below sentences will also be part of executive summary.

If we only add square footage at the time of creating deal then our executive summary would look like:
>On behalf of {{sponsorName}} (the “Sponsor”), Parallel CRE is seeking {{amount}} in {{loanTypeValue}} financing for {{dealName}} (the “Property”), a {{Gross SF}} SF, {{propertyType}} property located at {{address}}, {{city}}, {{state}}. The total purchase price is {{purchasePrice}} with a total cost of {{totalUsesValue}}. The Sponsor, {{sponsorName}}, {{sponsorBioName}}.
The executive summary changes as per the loan type and loan purpose we select, in addition to default sentence the below sentences will also be part of executive summary.

If we only add occupancy at the time of creating deal then our executive summary would look like:
>On behalf of {{sponsorName}} (the “Sponsor”), Parallel CRE is seeking {{amount}} in {{loanTypeValue}} financing for {{dealName}} (the “Property”), a {{Occupancy}} occupied, {{propertyType}} property located at {{address}}, {{city}}, {{state}}. The total purchase price is {{purchasePrice}} with a total cost of {{totalUsesValue}}. The Sponsor, {{sponsorName}}, {{sponsorBioName}}.
The executive summary changes as per the loan type and loan purpose we select, in addition to default sentence the below sentences will also be part of executive summary.

If we'll have all three unit count, square footage and occupancy at the time of creating deal then our executive summary would look like:
>On behalf of {{sponsorName}} (the “Sponsor”), Parallel CRE is seeking {{amount}} in {{loanTypeValue}} financing for {{dealName}} (the “Property”), a {{unitCount}}-unit, {{Gross SF}} SF, {{Occupancy}} occupied, {{propertyType}} property located at {{address}}, {{city}}, {{state}}. The total purchase price is {{purchasePrice}} with a total cost of {{totalUsesValue}}. The Sponsor, {{sponsorName}}, {{sponsorBioName}}.
The executive summary changes as per the loan type and loan purpose we select, in addition to default sentence the below sentences will also be part of executive summary.

The executive summary changes as per the loan type and loan purpose we select, and in the default sentence the below sentences will get added.

1. Loan purpose: Purchase , Loan Type: Stabilized or Transitional
    - The total purchase price is {{ purchasePrice }} with a total cost of {{ totalUsesValue }}.
2. Loan purpose: Purchase , Loan Type: Construction
    - On behalf of {{sponsorName}} (the “Sponsor”), Parallel CRE is seeking {{amount}} in {{loanTypeValue}} financing for {{dealName}} (the “Property”), a {{to-be-built,}}, a {{propertyType}} property located at {{address}}, {{city}}, {{state}}. The Sponsor, {{sponsorName}}, {{sponsorBioName}}.
    - The total project cost of {{ totalUsesValue }} includes {{ usesKeyValue }} resulting in a {{ LTC }} LTC.
3. Loan purpose: Refinance 
    - The financing will be used to payoff the existing loan balance of {{ firstUsesValue }}, fund {{ existingLoanBalance }}.
4. Loan Type: Stabilized
    - The Property is currently generating an annual NOI of approximately {{ inPlaceNOI }} resulting in a strong in-place debt yield of {{ inPlaceDY }} that will cover the loan debt service. 
5. Loan Type: Construction or Transitional
    - Based on the projected rent roll and market rents, the Property will generate approximately {{ stabilizedNOI }} in NOI (resulting in a {{ stabilizedDY }} stabilized debt yield).


