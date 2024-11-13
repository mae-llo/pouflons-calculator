import { ChangeEvent } from "react";
import { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { badges, FormFields } from "./form.types";
import { CharacterForm } from "./CharacterForm";

// Function to get badge values based on conditions
const getBadgeValue = (
  badge: (typeof badges)[number],
  modifiers: { wanderberry?: boolean; overachiever?: boolean },
) => {
  if (badge === "Tamer") return 2;
  if (modifiers.wanderberry) {
    if (
      badge === "Nurturing" ||
      badge === "Agriculture" ||
      badge === "Safari"
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
    let extraWords = modifiedWC - wcReq;
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
    breakdown += `Fauna x${repeatableBonuses.fauna}: ${repeatableBonuses.fauna} coins\n`;
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
  const [copyText, setCopyText] = useState("");
  const [isCollab, setIsCollab] = useState(false);
  const [isEpic, setIsEpic] = useState(false);

  const form = useForm<FormFields>({
    defaultValues: {
      baseReward: 0,
      wcReq: 0,
      wc: 0,
      characters: [],
      items: { plainSatchel: false, badgeOMatic: false },
      bonuses: { featuredCharacter: false, settingBonus: false },
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
  const { register, handleSubmit, control, formState, reset, setValue } = form;

  const { append, remove, fields } = useFieldArray({
    control,
    name: "characters",
  });

  const handleAddCharacter = () => {
    append({
      name: "",
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
    setCopyText("");
  };

  const handleCollabToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCollab((prevState) => !prevState);
    /**
     * remove all characters when 'collab' is enabled
     */
    if (e.currentTarget.checked) {
      setValue("characters", []);
    }
  };

  const handleEpicToggle = () => {
    setIsEpic((prevState) => !prevState);
  };

  const onSubmit = (values: FormFields) => {
    const breakdown = calculateRewards(values, isCollab);
    setCopyText(breakdown);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded bg-light d-flex flex-column gap-3"
    >
      <Row>
        <Col>
          <Form.Group as={Col} controlId="baseReward">
            <Form.Label>Base Reward</Form.Label>
            <Form.Control
              type="number"
              {...register("baseReward", { valueAsNumber: true })}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="wcReq">
            <Form.Label>WC Req (Max)</Form.Label>
            <Form.Control
              type="number"
              {...register("wcReq", { valueAsNumber: true })}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="wcSubm">
            <Form.Label>WC of Submission</Form.Label>
            <Form.Control
              type="number"
              {...register("wc", { valueAsNumber: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <h6>Applicable Items</h6>
          <Form.Group controlId="items.plainSatchel">
            <Form.Check
              inline
              type="checkbox"
              {...register("items.plainSatchel")}
            />
            <Form.Label>Plain Satchel</Form.Label>
          </Form.Group>
          <Form.Group controlId="items.badgeOMatic">
            <Form.Check
              inline
              type="checkbox"
              {...register("items.badgeOMatic")}
            />
            <Form.Label>Badge-o-matic</Form.Label>
          </Form.Group>
          <h6>Other Bonuses</h6>
          <Form.Group controlId="bonuses.featuredCharacter">
            <Form.Check
              inline
              type="checkbox"
              {...register("bonuses.featuredCharacter")}
            />
            <Form.Label>Featured Character</Form.Label>
          </Form.Group>

          <Form.Group controlId="bonuses.settingBonus">
            <Form.Check
              inline
              type="checkbox"
              {...register("bonuses.settingBonus")}
            />
            <Form.Label>Setting Bonus</Form.Label>
          </Form.Group>
          <h6>Toggleable Effects</h6>
          <Form.Group controlId="isCollab">
            <Form.Check
              inline
              type="switch"
              checked={isCollab}
              onChange={handleCollabToggle}
            />
            <Form.Label>Collaborative Work</Form.Label>
          </Form.Group>
          <Form.Group controlId="isEpic">
            <Form.Check
              inline
              type="switch"
              checked={isEpic}
              onChange={handleEpicToggle}
            />
            <Form.Label>Epic Quest</Form.Label>
          </Form.Group>
        </Col>
      </Row>

      <h6>Repeatable Bonuses</h6>

      <Row>
        <Form.Group as={Col} controlId="repeatableBonuses.extraCharacter">
          <Form.Label>Extra Character</Form.Label>
          <Form.Control
            type="number"
            {...register("repeatableBonuses.extraCharacter", {
              valueAsNumber: true,
            })}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="repeatableBonuses.pippets">
          <Form.Label>Pippets</Form.Label>
          <Form.Control
            type="number"
            {...register("repeatableBonuses.pippets", {
              valueAsNumber: true,
            })}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="repeatableBonuses.fauna">
          <Form.Label>Fauna</Form.Label>
          <Form.Control
            type="number"
            {...register("repeatableBonuses.fauna", { valueAsNumber: true })}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="repeatableBonuses.megafauna">
          <Form.Label>Megafauna</Form.Label>
          <Form.Control
            type="number"
            {...register("repeatableBonuses.megafauna", {
              valueAsNumber: true,
            })}
          />
        </Form.Group>
      </Row>

      {isEpic && (
        <>
          <h6>Epic Quest Bonuses</h6>
          <Row>
            <Form.Group as={Col} controlId="epicQuestBonuses.summary">
              <Form.Label>Story Summaries</Form.Label>
              <Form.Control
                type="number"
                {...register("epicQuestBonuses.summary", {
                  valueAsNumber: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="epicQuestBonuses.moodboard">
              <Form.Label>Moodboard OR Playlist</Form.Label>
              <Form.Check
                type="checkbox"
                label="Yes"
                {...register("epicQuestBonuses.moodboard")}
              />
            </Form.Group>
          </Row>
        </>
      )}

      {fields.map((field, index) => (
        <div
          className="p-3 border rounded bg-light position-relative"
          key={field.id}
        >
          <CharacterForm
            form={form}
            name={`characters.${index}`}
            onRemove={() => {
              handleRemoveCharacter(index);
            }}
          />
        </div>
      ))}

      {!isCollab && (
        <Col>
          <Button variant="primary" onClick={handleAddCharacter}>
            Add Character
          </Button>
        </Col>
      )}

      <Col>
        <Button variant="primary" type="submit">
          Calculate Rewards
        </Button>
      </Col>

      {copyText && (
        <>
          <Form.Group controlId="copyTextArea">
            <Form.Label>Copy/Paste Result</Form.Label>
            <Form.Control
              as="textarea"
              value={copyText}
              readOnly
              rows={4}
              onClick={(e) => e.currentTarget.select()}
            />
          </Form.Group>
        </>
      )}
      <Col>
        <Button variant="primary" onClick={handleClear}>
          Clear Form
        </Button>
      </Col>
    </Form>
  );
}

export default RewardForm;
