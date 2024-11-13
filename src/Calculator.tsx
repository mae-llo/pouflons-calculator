import React from "react";
import { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";

const badges = [
  "Agriculture",
  "Art",
  "Astronomy",
  "Athletics",
  "Aviator",
  "Beloved",
  "Boss",
  "Buddy",
  "Chivalrous",
  "Clumsy",
  "Commoner",
  "Dancer",
  "Detective",
  "Eloquent",
  "Flirty",
  "Floriculture",
  "Foodie",
  "Geology",
  "Healer",
  "Hospitality",
  "Inventor",
  "Lazybones",
  "Loner",
  "Macabre",
  "Merchant",
  "Meteorology",
  "Music",
  "Nobility",
  "Nurturing",
  "Party",
  "Performer",
  "Ranger",
  "Safari",
  "Scholar",
  "Seafarer",
  "Smith",
  "Tailor",
  "Tamer",
  "Thief",
  "Traveler",
  "Trickster",
  "Urchin",
  "Woodworker",
  "Captain",
  "City Guard",
  "Hired Sword",
  "Instructor",
  "Royal Messanger",
  "Scout",
  "Squire",
  "Templar",
  "Village Guard",
  "Air",
  "Candle",
  "Earth",
  "Fire",
  "Ice",
  "Nature",
  "Potion",
  "Seeker",
  "Water",
] as const;

type Inputs = {
  baseReward: number;
  wcReq: number;
  wc: number;
  characters: {
    name: string;
    badges: (typeof badges)[number][];
    wanderberry: boolean;
    overachiever: boolean;
    radBandana: boolean;
  }[];
  items: { plainSatchel: boolean; badgeOMatic: boolean };
  bonuses: { featuredCharacter: boolean; settingBonus: boolean };
  repeatableBonuses: {
    extraCharacter: number;
    pippets: number;
    fauna: number;
    megafauna: number;
  };
  epicQuestBonuses: {
    summary: number;
    moodboard: boolean;
  };
};

// Function to get badge values based on conditions
const getBadgeValue = (
  badge: (typeof badges)[number],
  modifiers: { wanderberry?: boolean; overachiever?: boolean }
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

const calculateRewards = (values: Inputs, isCollab: boolean) => {
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

  const { register, handleSubmit, control, formState, reset, setValue } =
    useForm<Inputs>({
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
    reset({});
    remove();
    setCopyText("");
  };

  const handleCollabToggle = () => {
    setIsCollab((prevState) => !prevState);
    if (isCollab) {
      handleClear;
    }
  };

  const handleEpicToggle = () => {
    setIsEpic((prevState) => !prevState);
  };

  const onSubmit = (values: Inputs) => {
    const breakdown = calculateRewards(values, isCollab);
    setCopyText(breakdown);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded bg-light"
    >
      <Row className="mb-3">
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
          <Form.Group className="mb-3">
            <Form.Label>Applicable Items</Form.Label>
            <InputGroup>
              <Form.Check
                className="me-3"
                type="checkbox"
                label="Plain Satchel"
                {...register("items.plainSatchel")}
              />
              <Form.Check
                className="me-3"
                type="checkbox"
                label="Badge-o-matic"
                {...register("items.badgeOMatic")}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Other Bonuses</Form.Label>
            <InputGroup>
              <Form.Check
                className="me-3"
                type="checkbox"
                label="Featured Character"
                {...register("bonuses.featuredCharacter")}
              />
              <Form.Check
                className="me-3"
                type="checkbox"
                label="Setting Bonus"
                {...register("bonuses.settingBonus")}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Toggleable Effects</Form.Label>
            <InputGroup>
              <Form.Check
                className="me-3"
                type="switch"
                label="Collaborative Work"
                checked={isCollab}
                onChange={handleCollabToggle}
              />
              <Form.Check
                className="me-3"
                type="switch"
                label="Epic Quest"
                checked={isEpic}
                onChange={handleEpicToggle}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Repeatable Bonuses</Form.Label>
        <Row>
          <Col>
            <Form.Label>Extra Character</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.extraCharacter", {
                valueAsNumber: true,
              })}
            />
          </Col>
          <Col>
            <Form.Label>Pippets</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.pippets", {
                valueAsNumber: true,
              })}
            />
          </Col>
          <Col>
            <Form.Label>Fauna</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.fauna", { valueAsNumber: true })}
            />
          </Col>
          <Col>
            <Form.Label>Megafauna</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.megafauna", {
                valueAsNumber: true,
              })}
            />
          </Col>
        </Row>
      </Form.Group>

      {isEpic && (
        <Form.Group className="mb-3">
          <Form.Label>Epic Quest Bonuses</Form.Label>
          <Row>
            <Col>
              <Form.Label>Story Summaries</Form.Label>
              <Form.Control
                type="number"
                {...register("epicQuestBonuses.summary", {
                  valueAsNumber: true,
                })}
              />
            </Col>
            <Col>
              <Form.Label>Moodboard OR Playlist</Form.Label>
              <Form.Check
                type="checkbox"
                label="Yes"
                {...register("epicQuestBonuses.moodboard")}
              />
            </Col>
          </Row>
        </Form.Group>
      )}

      {fields.map((field, index) => (
        <div className="mt-3 p-3 border rounded bg-light" key={field.id}>
          <Form.Group className="mb-3">
            <Form.Label>Character Name</Form.Label>
            <Form.Control
              type="text"
              {...register(`characters.${index}.name`)}
              placeholder="Enter character name"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>Badge 1</Form.Label>
              <Form.Select {...register(`characters.${index}.badges.0`)}>
                <option value="">Select a badge</option>
                {badges.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>Badge 2</Form.Label>
              <Form.Select {...register(`characters.${index}.badges.1`)}>
                <option value="">Select a badge</option>
                {badges.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>Badge 3</Form.Label>
              <Form.Select {...register(`characters.${index}.badges.2`)}>
                <option value="">Select a badge</option>
                {badges.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3 ">
            <Form.Label>Character Bonuses</Form.Label>
            <br />
            <Form.Check
              inline
              type="checkbox"
              label="Overachiever Badge (5c)"
              {...register(`characters.${index}.overachiever`)}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Wanderberry Badge (2c)"
              {...register(`characters.${index}.wanderberry`)}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Rad Bandana (1c)"
              {...register(`characters.${index}.radBandana`)}
            />
          </Form.Group>
          <Button
            variant="primary"
            className="remove"
            onClick={() => {
              handleRemoveCharacter(index);
            }}
          >
            Remove Character
          </Button>
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
          <Form.Group className="mt-4">
            <Form.Label>Copy/Paste Result</Form.Label>
            <Form.Control
              as="textarea"
              value={copyText}
              readOnly
              rows={4}
              onClick={(e) => e.currentTarget.select()}
            />
          </Form.Group>
          <Col>
            <Button variant="primary" onClick={handleClear}>
              Clear Form
            </Button>
          </Col>
        </>
      )}
    </Form>
  );
}

export default RewardForm;
