import { ChangeEvent, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { CharacterForm } from './CharacterForm';
import { Button } from './components/button';
import { Checkbox } from './components/checkbox';
import { Input } from './components/input';
import { badges, FormFields } from './form.types';

// Function to get badge values based on conditions
const getBadgeValue = (
  badge: (typeof badges)[number],
  modifiers: { wanderberry?: boolean; overachiever?: boolean },
) => {
  if (badge === 'Tamer') return 2;
  if (modifiers.wanderberry) {
    if (
      badge === 'Nurturing' ||
      badge === 'Agriculture' ||
      badge === 'Safari'
    ) {
      return 2;
    }
  }
  return 1;
};

const calculateRewards = (values: FormFields, isCollab: boolean) => {
  const {
    baseReward,
    wcReq,
    wc,
    items,
    bonuses,
    repeatableBonuses,
    epicQuestBonuses,
    characters,
  } = values;

  let totalCoins = baseReward;
  let breakdown = `Base Rewards: ${baseReward}c\n`;

  if (wc > 0) {
    breakdown += `WC: ${wc}\n\n`;
  }

  let modifiedWC = wc;
  if (modifiedWC > 1500) {
    modifiedWC = 1500;
  }

  // Applicable Items
  if (items.plainSatchel) {
    breakdown += `Plain Satchel extra roll\n`;
  }
  if (items.badgeOMatic) {
    breakdown += `Badge-o-matic roll\n\n`;
  }

  // Additional Length
  if (modifiedWC >= wcReq + 250) {
    const extraWords = modifiedWC - wcReq;
    const extraChunks = Math.floor(extraWords / 250);
    console.log(extraChunks);

    breakdown += `Additional Length x${extraChunks}: ${extraChunks * 2}c\n`;
    totalCoins += extraChunks * 2;
  }

  // Other Bonuses
  if (bonuses.featuredCharacter) {
    breakdown += `Featured Character: 2c\n`;
    totalCoins += 2;
  }

  if (bonuses.settingBonus) {
    breakdown += `Setting Bonus: 2c\n`;
    totalCoins += 2;
  }

  // Repeatable Bonuses
  if (repeatableBonuses.extraCharacter > 0) {
    breakdown += `Extra Character x${repeatableBonuses.extraCharacter}: ${repeatableBonuses.extraCharacter}c\n`;
    totalCoins += repeatableBonuses.extraCharacter;
  }
  if (repeatableBonuses.pippets > 0) {
    breakdown += `Pippets x${repeatableBonuses.pippets}: ${repeatableBonuses.pippets}c\n`;
    totalCoins += repeatableBonuses.pippets;
  }
  if (repeatableBonuses.fauna > 0) {
    breakdown += `Fauna x${repeatableBonuses.fauna}: ${repeatableBonuses.fauna}c\n`;
    totalCoins += repeatableBonuses.fauna;
  }
  if (repeatableBonuses.megafauna > 0) {
    breakdown += `Megafauna x${repeatableBonuses.megafauna}: ${repeatableBonuses.megafauna}c\n`;
    totalCoins += repeatableBonuses.megafauna;
  }

  // Epic Quest Bonuses
  if (epicQuestBonuses.summary > 0) {
    breakdown += `Summary x${epicQuestBonuses.summary}: ${epicQuestBonuses.summary * 3}c\n`;
    totalCoins += epicQuestBonuses.summary * 3;
  }
  if (epicQuestBonuses.moodboard) {
    breakdown += `Moodboard/Playlist: 5c\n`;
    totalCoins += 5;
  }

  // Add character badge breakdown
  characters.forEach((character) => {
    let badgeDetails = `${character.name} Bonuses: `;
    let badgeValueTotal = 0;

    character.badges.filter(Boolean).forEach((badge) => {
      const modifiedBadgeValue = getBadgeValue(badge, {
        wanderberry: character.wanderberry,
        overachiever: character.overachiever,
      });
      badgeValueTotal += modifiedBadgeValue;
      badgeDetails += `${badge} (${modifiedBadgeValue}c) + `;
    });

    // Include additional badges and items
    if (character.wanderberry) {
      badgeValueTotal += 2;
      badgeDetails += `Wanderberry (2c) + `;
    }
    if (character.overachiever) {
      badgeValueTotal += 5;
      badgeDetails += `Overachiever (5c) + `;
    }

    if (character.radBandana) {
      badgeDetails += `Rad Bandana (1c) + `;
      badgeValueTotal += 1;
    }

    // Clean up the trailing " + " and show total badge value
    badgeDetails = badgeDetails.slice(0, -2); // Remove the last " +"
    badgeDetails += `= ${badgeValueTotal}c\n`;

    breakdown += badgeDetails;
    totalCoins += badgeValueTotal;
  });

  breakdown += `\nTotal Bonus: ${totalCoins - baseReward}c`;
  breakdown += `\nTotal Coins: ${totalCoins}c`;
  if (isCollab) {
    breakdown += `\nCollab Debuff: ${totalCoins}c x 1.5 / 2 = ${Math.ceil((totalCoins * 1.5) / 2)}c`;
  }
  return breakdown;
};

function RewardForm() {
  const [copyText, setCopyText] = useState('');

  const form = useForm<FormFields>({
    defaultValues: {
      baseReward: 0,
      wcReq: 0,
      wc: 0,
      characters: [],
      items: { plainSatchel: false, badgeOMatic: false },
      bonuses: { featuredCharacter: false, settingBonus: false },
      toggleableEffects: { collabWork: false, epicQuest: false },
      repeatableBonuses: {
        extraCharacter: 0,
        pippets: 0,
        fauna: 0,
        megafauna: 0,
      },
      epicQuestBonuses: {
        summary: 0,
        moodboard: false,
      },
    },
  });
  const { register, handleSubmit, control, formState, reset, setValue, watch } = form;
  const [isCollab, isEpic] = useWatch({control, name:
        ["toggleableEffects.collabWork", "toggleableEffects.epicQuest"
]
})


  const { append, remove, fields } = useFieldArray({
    control,
    name: 'characters',
  });

  const handleAddCharacter = () => {
    append({
      name: '',
      badges: [],
      overachiever: false,
      wanderberry: false,
      radBandana: false,
    });
  };

  const handleRemoveCharacter = (index: number) => {
    remove(index);
    if (formState.isSubmitted) {
      handleSubmit(onSubmit)();
    }
  };

  const handleClear = () => {
    // if you pass {} to this it will explicitly reset the form to an empty object.
    // best to call it with no params since that will reset to the `defaultValues` defined above, which we need
    reset();
    setCopyText('');
  };

  const handleCollabToggle = (e: ChangeEvent<HTMLInputElement>) => {
    /**
     * remove all characters when 'collab' is enabled
     */
    if (e.currentTarget.checked) {
      setValue('characters', []);
      if (formState.isSubmitted) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = (values: FormFields) => {
    const breakdown = calculateRewards(values, isCollab);
    setCopyText(breakdown);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 flex flex-col gap-3 doodle-border"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            label="Base Reward"
            {...register('baseReward', { valueAsNumber: true })}
          />
          <Input
            label="WC Req (Max)"
            type="number"
            {...register('wcReq', { valueAsNumber: true })}
          />
          <Input
            label="WC of Submission"
            type="number"
            {...register('wc', { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4>Applicable Items</h4>
              <div className="flex flex-col">
                <Checkbox
                  label="Plain Satchel"
                  {...register('items.plainSatchel')}
                />
                <Checkbox
                  label="Badge-o-matic"
                  {...register('items.badgeOMatic')}
                />
              </div>
            </div>
            <div>
              <h4>Other Bonuses</h4>
              <div className="flex flex-col">
                <Checkbox
                  label="Featured Character"
                  {...register('bonuses.featuredCharacter')}
                />
                <Checkbox
                  label="Setting Bonus"
                  {...register('bonuses.settingBonus')}
                />
              </div>
            </div>
          </div>
          <h4>Toggleable Effects</h4>
          <div className="flex flex-col">
            <Checkbox
              label="Collaborative Work"
              {...register("toggleableEffects.collabWork",{onChange:handleCollabToggle})}
            />
            <Checkbox
                {...register("toggleableEffects.epicQuest")}
              label="Epic Quest"
            />
          </div>
        </div>
      </div>

      <h4>Repeatable Bonuses</h4>

      <div className="flex gap-4">
        <Input
          label="Extra Character"
          {...register('repeatableBonuses.extraCharacter', {
            valueAsNumber: true,
          })}
        />
        <Input
          label="Pippets"
          {...register('repeatableBonuses.pippets', { valueAsNumber: true })}
        />
        <Input
          label="Fauna"
          {...register('repeatableBonuses.fauna', { valueAsNumber: true })}
        />
        <Input
          label="Megafauna"
          {...register('repeatableBonuses.megafauna', { valueAsNumber: true })}
        />
      </div>

      {isEpic && (
        <>
          <h4>Epic Quest Bonuses</h4>
          <div className="flex gap-4 items-center">
            <Input
              label="Story Summaries"
              {...register('epicQuestBonuses.summary', { valueAsNumber: true })}
            />
            <Checkbox
              label="Moodboard OR Playlist"
              {...register('epicQuestBonuses.moodboard')}
            />
          </div>
        </>
      )}

      {!isCollab && (<>
        <div className="flex gap-3 items-center">
          <h4>Characters</h4>
          <Button variant="primary" onClick={handleAddCharacter}>
            Add Character
          </Button>
        </div>
            {fields.length === 0 && <p className="font-bold text-gray-400">No characters added</p>}
          </>
      )}

      {fields.map((field, index) => (
        <div className="p-3 border relative" key={field.id}>
          <CharacterForm
            form={form}
            name={`characters.${index}`}
            onRemove={() => {
              handleRemoveCharacter(index);
            }}
          />
        </div>
      ))}

      <div className="flex justify-end gap-4">
        <Button variant="link" color="red" onClick={handleClear}>
          Clear Form
        </Button>
        <Button variant="primary" type="submit">
          Calculate Rewards
        </Button>
      </div>

      {copyText && (
        <label className="!flex flex-col font-bold !p-0">
          Copy/Paste Result
          <textarea
            value={copyText}
            readOnly
            rows={4}
            onClick={(e) => e.currentTarget.select()}
          />
        </label>
      )}
    </form>
  );
}

export default RewardForm;
