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

- Make it so adding a character doesn't create the 'added characters' thing anymore. Just have it create another 'form' that can be filled out so users can add a new character while also being able to edit their previous characters. Also add a 'remove' character option for mistakes.
- When a user hits 'calculate rewards' it should add all of the character's badges (e.g, Bob's Badges: Tamer(2c) + etc) into the copy/paste result breakdown as well as adding the coins into the total.
- Add in WC bonus calculation (submission WC - max WC requirement) / 250 \* 2c. (Basically: for each 250 words over the WC requirement the submission is, you get 2c)

Myehhhh:

- Tidy code base
- Make it visually better

Low Priority:

- Add art support (currently just writing)
- Add collab support (will be easy, just multiplying the final result by .75)
- Add safari badge --> normally 1c, but 2c if a fauna or megafauna is present
- Add better support for error users (users that click wanderberry badge, but didn't include a wanderroot in the piece, thus making the badge null and also nurturing, agriculture, etc would be worth only 1c instead of 2c)

# How to Run

1. Clone this repo
2. `npm install`
3. `npm run dev`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
