#Themisto

###Themisto is an-commerce web scrapper
####For the moment the only available provider is Mercado libre AR

Themisto will receive a search order, a callback and a provider and, after the search is done,
respond with a fulfilled state and results, or a failed state if nothing is found or something went wrong.

>POST /search

Expects:
- searchID used to identify the search job that corresponds to the results sent,
- query - the name of the product to search for
- callbackURL where the results are going to be sent
- provider - where the search is going to be made. For the moment, Themisto only works with "MELI" as provider
