# pouflons-calculator

Hackathon effort by applebabbles to quickly write a code that can easily calculate ARPG submissions for Pouflons.
Based largely on the following:

- [Coin Guide](https://www.play.pouflons.com/info/coins)

I (applebabbles) am not associated with Pouflons staff. I am doing this for fun.

Ideal output:

```
Submission WC:

Base Rewards
Additional Length
Applicable Items
Other Bonuses
Repeatable Bonuses
Epic Quest Bonuses
Character specific bonuses and badges

Total Coin Payout
```

# todo

High Priority:

- Add in WC bonus calculation (submission WC - max WC requirement) / 250 \* 2c. (Basically: for each 250 words over the WC requirement the submission is, you get 2c)
- Add collab support (will be easy, just multiplying the final result by .75) ... but, bandana/badges can't be used on collabs. If the 'collab' option is toggled, disable the add character button (And remove all current character info)

Myehhhh:

- Make it visually better

Low Priority:

- Add art support (currently just writing)
- Add safari badge --> normally 1c, but 2c if a fauna or megafauna is present
- Add better support for error users
  - Users that click wanderberry badge, but didn't include a wanderroot in the piece, thus making the badge null and also nurturing, agriculture, etc would be worth only 1c instead of 2c
  - Users that try to add more than one wanderberry per prompt (there can only be one) ... but it's a character specific badge so it should remain in characters

# Completed

- Rad Bandana should be a character-specific bonus (each character can have it, rather than one per piece)
- Make it so adding a character doesn't create the 'added characters' thing anymore. Just have it create another 'form' that can be filled out so users can add a new character while also being able to edit their previous characters.
- Also add a 'remove' character option for mistakes.
- Not clearing the character field immediately but just adding more components when a user hits 'add character' so they can add/edit multiple at a time.
- When a user hits 'calculate rewards' it should add all of the character's badges (e.g, Bob's Badges: Tamer(2c) + etc) into the copy/paste result breakdown as well as adding the coins into the total.
- Tidy code base

# How to Run

1. Clone this repo
2. `npm install`
3. `npm run dev`
4. et voila http://localhost:5173/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
