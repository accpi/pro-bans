# Mastery Check
Based on the Clash scouting report, this tool mimics the mastery level checking function.

The app was originally supposed to store match data to check recently played games by champion as well but I ran into Riot API rate limitations and had to pivot to just looking at the mastery level achieved.

There is code to store match data and keep store teams of Summoners for easy re-checking of masteries + champion history, but because of the rate limits, that won't be implemented.

## Screenshot(s), a gif is multiple pictures :3

![Process](/client/readme/process.gif "Process")

### Example

If you don't have summoner names to choose from, I picked from the [NA Ladder Rankings]([GitHub](http://github.com))

* Tony Top
* Santorin
* Anivia Kid
* John5un
* Hakuho

## To Do

* API validation
* More styling (page is super bare)
* Server selection (currently only looks at NA)

I probably won't be implementing these updates, they're very simple to implement but there's League to play!