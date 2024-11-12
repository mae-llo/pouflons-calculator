import { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import CharacterBadgeForm from "./CharacterBadgeForm";
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
  wordCountReq: number;
  wordCountActual: number;
  characters: {
    name: string;
    // could potentially remove `name` and just make this a string instead of an object
    badges: { name: (typeof badges)[number] }[];
    wanderberry: boolean;
    overachiever: boolean;
  }[];
  items: { radBandana: boolean; plainSatchel: boolean; badgeOMatic: boolean };
  bonuses: { featuredCharacter: boolean; settingBonus: boolean };
  repeatableBonuses: {
    extraCharacter: number;
    pippets: number;
    fauna: number;
    megafauna: number;
  };
  epicQuestBonuses: {
    summary: number;
    moodboard: number;
  };
};

// Function to get badge values based on conditions
const getBadgeValue = (
  badge: (typeof badges)[number],
  modifiers: { wanderberry?: boolean; overachiever?: boolean },
) => {
  if (badge === "Tamer") return 2;
  if (modifiers.wanderberry) {
    if (badge === "Nurturing" || badge === "Agriculture") {
      return 2;
    }
  }
  return 1;
};

const calculateRewards = (values: Inputs) => {
  const {
    baseReward,
    items,
    bonuses,
    repeatableBonuses,
    epicQuestBonuses,
    characters,
  } = values;
  let totalCoins = baseReward;
  let breakdown = `Base Rewards: ${baseReward} coins\n`;

  // Applicable Items
  if (items.radBandana) {
    breakdown += `Rad Bandana: 1c\n`;
    totalCoins += 1;
  }
  if (items.plainSatchel) {
    breakdown += `Plain Satchel extra roll\n`;
    totalCoins += 1;
  }
  if (items.badgeOMatic) {
    breakdown += `Badge-o-matic roll\n`;
    totalCoins += 1;
  }

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
    breakdown += `Extra Character x${repeatableBonuses.extraCharacter}: ${repeatableBonuses.extraCharacter} coins\n`;
    totalCoins += repeatableBonuses.extraCharacter;
  }
  if (repeatableBonuses.pippets > 0) {
    breakdown += `Pippets x${repeatableBonuses.pippets}: ${repeatableBonuses.pippets} coins\n`;
    totalCoins += repeatableBonuses.pippets;
  }
  if (repeatableBonuses.fauna > 0) {
    breakdown += `Fauna x${repeatableBonuses.fauna}: ${repeatableBonuses.fauna} coins\n`;
    totalCoins += repeatableBonuses.fauna;
  }
  if (repeatableBonuses.megafauna > 0) {
    breakdown += `Megafauna x${repeatableBonuses.megafauna}: ${repeatableBonuses.megafauna} coins\n`;
    totalCoins += repeatableBonuses.megafauna;
  }

  // Epic Quest Bonuses
  if (epicQuestBonuses.summary > 0) {
    breakdown += `Summary x${epicQuestBonuses.summary}: ${epicQuestBonuses.summary * 3} coins\n`;
    totalCoins += epicQuestBonuses.summary * 3;
  }
  if (epicQuestBonuses.moodboard > 0) {
    breakdown += `Moodboard/Playlist: 5 coins\n`;
    totalCoins += epicQuestBonuses.moodboard * 5;
  }

  // Add character badge breakdown
  characters.forEach((character) => {
    let badgeDetails = `${character.name} Badges: `;
    let badgeValueTotal = 0;

    character.badges.forEach((badge) => {
      const modifiedBadgeValue = getBadgeValue(badge.name, {
        wanderberry: character.wanderberry,
        overachiever: character.overachiever,
      });
      badgeValueTotal += modifiedBadgeValue;
      badgeDetails += `${badge.name} (${modifiedBadgeValue}c) + `;
    });

    // Include additional badges
    if (character.wanderberry) {
      badgeValueTotal += 2;
      badgeDetails += `Wanderberry (2c) + `;
    }
    if (character.overachiever) {
      badgeValueTotal += 5;
      badgeDetails += `Overachiever (5c) + `;
    }

    // Clean up the trailing " + " and show total badge value
    badgeDetails = badgeDetails.slice(0, -3); // Remove the last " + "
    badgeDetails += `= ${badgeValueTotal}c\n`;

    breakdown += badgeDetails;
  });

  breakdown += `\nTotal Coins: ${totalCoins}`;

  return breakdown;
};

function RewardForm() {
  const [copyText, setCopyText] = useState("");

  const { register, handleSubmit, control } = useForm<Inputs>();

  const { append, fields } = useFieldArray({ control, name: "characters" });

  const handleAddCharacter = () => {
    append({
      name: "",
      badges: [],
      overachiever: false,
      wanderberry: false,
    });
  };

  const onSubmit = (values: Inputs) => {
    const breakdown = calculateRewards(values);
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
            <Form.Control type="number" {...register("baseReward")} />
          </Form.Group>
          <Form.Group as={Col} controlId="wcReq">
            <Form.Label>WC Req (Max)</Form.Label>
            <Form.Control type="number" {...register("wordCountReq")} />
          </Form.Group>
          <Form.Group as={Col} controlId="wcSubm">
            <Form.Label>WC of Submission</Form.Label>
            <Form.Control type="number" {...register("wordCountActual")} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Applicable Items</Form.Label>
            <InputGroup>
              <Form.Check
                type="checkbox"
                label="Rad Bandana"
                {...register("items.radBandana")}
              />
              <Form.Check
                type="checkbox"
                label="Plain Satchel"
                {...register("items.plainSatchel")}
              />
              <Form.Check
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
                type="checkbox"
                label="Featured Character"
                {...register("bonuses.featuredCharacter")}
              />
              <Form.Check
                type="checkbox"
                label="Setting Bonus"
                {...register("bonuses.settingBonus")}
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
              {...register("repeatableBonuses.extraCharacter")}
            />
          </Col>
          <Col>
            <Form.Label>Pippets</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.pippets")}
            />
          </Col>
          <Col>
            <Form.Label>Fauna</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.fauna")}
            />
          </Col>
          <Col>
            <Form.Label>Megafauna</Form.Label>
            <Form.Control
              type="number"
              {...register("repeatableBonuses.megafauna")}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Epic Quest Bonuses</Form.Label>
        <Row>
          <Col>
            <Form.Label>Story Summaries</Form.Label>
            <Form.Control
              type="number"
              {...register("epicQuestBonuses.summary")}
            />
          </Col>
          <Col>
            <Form.Label>Moodboard OR Playlist</Form.Label>
            <Form.Check
              type="checkbox"
              label="Moodboard or Playlist"
              {...register("epicQuestBonuses.moodboard")}
            />
          </Col>
        </Row>
      </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Overachiever Badge (5c)"
              {...register(`characters.${index}.overachiever`)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Wanderberry Badge (2c)"
              {...register(`characters.${index}.wanderberry`)}
            />
          </Form.Group>
        </div>
      ))}
      <Button variant="primary" onClick={handleAddCharacter}>
        Add Character
      </Button>

      <Button variant="primary" type="submit">
        Calculate Rewards
      </Button>

      {copyText && (
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
      )}
    </Form>
  );
}

export default RewardForm;
