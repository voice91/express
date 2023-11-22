# Here we will add information about the things that will have small logic or info

# Rates

- We are getting the rates from the website: "https://thefinancials.com/syndicated/PARALLEL/feed.json".
- We have schedule to store the rates in the database every day at midnight and according to that we are displaying Today's, Yesterday's, Last Week's and Last Month's rates.

> Issue: When the rates are not updated in the above website any day then for that day we'll get "No Rates Found".
