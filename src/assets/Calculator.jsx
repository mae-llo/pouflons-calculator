import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import CharacterBadgeForm from './CharacterBadgeForm';

function RewardForm() {
  const badges = ['Agriculture','Art','Astronomy','Athletics','Aviator','Beloved','Boss','Buddy','Chivalrous','Clumsy','Commoner','Dancer','Detective','Eloquent','Flirty','Floriculture','Foodie','Geology','Healer','Hospitality','Inventor','Lazybones','Loner','Macabre','Merchant','Meteorology','Music','Nobility','Nurturing','Party','Performer','Ranger','Safari','Scholar','Seafarer','Smith','Tailor','Tamer','Thief','Traveler','Trickster','Urchin','Woodworker','Captain','City Guard','Hired Sword','Instructor','Royal Messanger','Scout','Squire','Templar','Village Guard','Air','Candle','Earth','Fire','Ice','Nature','Potion','Seeker','Water']
  const [baseReward, setBaseReward] = useState(0);
  const [wcReq, setWcReq] = useState(0);
  const [wcSubm, setWcSubm] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [copyText, setCopyText] = useState('');
  const [showCharacterForm, setShowCharacterForm] = useState(false);

  const [items, setItems] = useState({
    radBandana: false,
    plainSatchel: false,
    badgeOMatic: false,
  });
  
  const [bonuses, setBonuses] = useState({
    settingBonus: false,
    featuredCharacter: false,
  });
  
  const [repeatableBonuses, setRepeatableBonuses] = useState({
    extraCharacter: 0,
    pippets: 0,
    fauna: 0,
    megafauna: 0,
  });

  const [epicQuestBonuses, setEpicQuestBonuses] = useState({
    summary: 0,
    moodboard: false,
  });

  // Function to get badge values based on conditions
  const getBadgeValue = (badge, wanderberry) => {
    if (badge === "Tamer") return 2;
    if ((badge === "Nurturing" || badge === "Agriculture") && wanderberry) return 2;
    return 1;
  };

    // Calculate total badge value including Wanderberry and Overachiever bonuses
    const calculateTotalBadgeValue = (badges, overachiever, wanderberry) => {
        let totalValue = 0;
    
        badges.forEach((badge) => {
          totalValue += getBadgeValue(badge, wanderberry);
        });
    
        if (wanderberry) totalValue += 2;
        if (overachiever) totalValue += 5;
    
        return totalValue;
      };

      const handleAddCharacter = () => {
        const badges = [badge1, badge2, badge3].filter(Boolean);
        const totalBadgeValue = calculateTotalBadgeValue(badges, overachiever, wanderberry);
    
        const newCharacter = {
          characterName,
          badges: badges.map((badge) => ({
            name: badge,
            value: getBadgeValue(badge),
          })),
          overachiever,
          wanderberry,
          totalBadgeValue,
        };
    
        const updatedCharacters = [...characters, newCharacter];
        setCharacters(updatedCharacters);
    
        // Reset character form inputs
        setCharacterName('');
        setBadge1('');
        setBadge2('');
        setBadge3('');
        setOverachiever(false);
        setWanderberry(false);
      };

  const calculateRewards = () => {
    let totalCoins = parseInt(baseReward);
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

    if (bonuses.featuredCharacter){
        breakdown += `Featured Character: 2c\n`;
        totalCoins += 2;
    }

    if (bonuses.settingBonus){
        breakdown += `Setting Bonus: 2c\n`;
        totalCoins += 2;
    }

    // Repeatable Bonuses
    if (repeatableBonuses.extraCharacter > 0) {
      breakdown += `Extra Character x${repeatableBonuses.extraCharacter}: ${repeatableBonuses.extraCharacter * 1} coins\n`;
      totalCoins += repeatableBonuses.extraCharacter * 1;
    }
    if (repeatableBonuses.pippets > 0) {
      breakdown += `Pippets x${repeatableBonuses.pippets}: ${repeatableBonuses.pippets * 1} coins\n`;
      totalCoins += repeatableBonuses.pippets * 1;
    }
    if (repeatableBonuses.fauna > 0) {
      breakdown += `Fauna x${repeatableBonuses.fauna}: ${repeatableBonuses.fauna * 1} coins\n`;
      totalCoins += repeatableBonuses.fauna * 1;
    }
    if (repeatableBonuses.megafauna > 0) {
      breakdown += `Megafauna x${repeatableBonuses.megafauna}: ${repeatableBonuses.megafauna * 1} coins\n`;
      totalCoins += repeatableBonuses.megafauna * 1;
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
        let badgeDetails = `${character.characterName} Badges: `;
        let badgeValueTotal = 0;
  
        character.badges.forEach((badge) => {
          badgeValueTotal += badge.value;
          badgeDetails += `${badge.name} (${badge.value}c) + `;
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

    // Set the formatted text to copy
    setCopyText(breakdown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRewards();
  };

    // Character form state
    const [characterName, setCharacterName] = useState('');
    const [badge1, setBadge1] = useState('');
    const [badge2, setBadge2] = useState('');
    const [badge3, setBadge3] = useState('');
    const [overachiever, setOverachiever] = useState(false);
    const [wanderberry, setWanderberry] = useState(false);

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">


<Row className="mb-3">
    <Col>
    <Form.Group as={Col} controlId="baseReward">
          <Form.Label>Base Reward</Form.Label>
          <Form.Control 
            type="number" 
            value={baseReward} 
            onChange={(e) => setBaseReward(e.target.value)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="wcReq">
          <Form.Label>WC Req (Max)</Form.Label>
          <Form.Control 
            type="number" 
            value={wcReq} 
            onChange={(e) => setWcReq(e.target.value)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="wcSubm">
          <Form.Label>WC of Submission</Form.Label>
          <Form.Control 
            type="number" 
            value={wcSubm} 
            onChange={(e) => setWcSubm(e.target.value)} 
          />
        </Form.Group>
    </Col>

    <Col>
    <Form.Group className="mb-3">
        <Form.Label>Applicable Items</Form.Label>
        <InputGroup>
          <Form.Check 
            type="checkbox" 
            label="Rad Bandana" 
            checked={items.radBandana} 
            onChange={() => setItems({ ...items, radBandana: !items.radBandana })} 
          />
          <Form.Check 
            type="checkbox" 
            label="Plain Satchel" 
            checked={items.plainSatchel} 
            onChange={() => setItems({ ...items, plainSatchel: !items.plainSatchel })} 
          />
          <Form.Check 
            type="checkbox" 
            label="Badge-o-matic" 
            checked={items.badgeOMatic} 
            onChange={() => setItems({ ...items, badgeOMatic: !items.badgeOMatic })} 
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Other Bonuses</Form.Label>
        <InputGroup>
          <Form.Check 
            type="checkbox" 
            label="Featured Character" 
            checked={bonuses.featuredCharacter} 
            onChange={() => setBonuses({ ...bonuses, featuredCharacter: !bonuses.featuredCharacter })} 
          />
          <Form.Check 
            type="checkbox" 
            label="Setting Bonus" 
            checked={bonuses.settingBonus} 
            onChange={() => setBonuses({ ...bonuses, settingBonus: !bonuses.settingBonus })} 
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
              value={repeatableBonuses.extraCharacter} 
              onChange={(e) => setRepeatableBonuses({ ...repeatableBonuses, extraCharacter: e.target.value })} 
            />
          </Col>
          <Col>
            <Form.Label>Pippets</Form.Label>
            <Form.Control 
              type="number" 
              value={repeatableBonuses.pippets} 
              onChange={(e) => setRepeatableBonuses({ ...repeatableBonuses, pippets: e.target.value })} 
            />
          </Col>
          <Col>
            <Form.Label>Fauna</Form.Label>
            <Form.Control 
              type="number" 
              value={repeatableBonuses.fauna} 
              onChange={(e) => setRepeatableBonuses({ ...repeatableBonuses, fauna: e.target.value })} 
            />
          </Col>
          <Col>
            <Form.Label>Megafauna</Form.Label>
            <Form.Control 
              type="number" 
              value={repeatableBonuses.megafauna} 
              onChange={(e) => setRepeatableBonuses({ ...repeatableBonuses, megafauna: e.target.value })} 
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
              value={epicQuestBonuses.summary} 
              onChange={(e) => setEpicQuestBonuses({ ...epicQuestBonuses, summary: e.target.value })} 
            />
          </Col>
          <Col>
            <Form.Label>Moodboard OR Playlist</Form.Label>
            <Form.Check 
            type="checkbox" 
            label="Moodboard or Playlist" 
            checked={epicQuestBonuses.moodboard} 
            onChange={() => setEpicQuestBonuses({ ...epicQuestBonuses, moodboard: !epicQuestBonuses.moodboard })} 
          />
          </Col>
        </Row>
      </Form.Group>

       {/* Character Badge Form */}
       <Button
          variant="secondary"
          onClick={() => setShowCharacterForm(!showCharacterForm)}
        >
          {showCharacterForm ? "Hide Character Form" : "Add Character"}
        </Button>

        {showCharacterForm && (
          <div className="mt-3 p-3 border rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Character Name</Form.Label>
              <Form.Control
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter character name"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Label>Badge 1</Form.Label>
                <Form.Select value={badge1} onChange={(e) => setBadge1(e.target.value)}>
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
                <Form.Select value={badge2} onChange={(e) => setBadge2(e.target.value)}>
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
                <Form.Select value={badge3} onChange={(e) => setBadge3(e.target.value)}>
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
                checked={overachiever}
                onChange={(e) => setOverachiever(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Wanderberry Badge (2c)"
                checked={wanderberry}
                onChange={(e) => setWanderberry(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleAddCharacter}
            >
              Add Character
            </Button>
          </div>
        )}

      <Button variant="primary" type="submit">Calculate Rewards</Button>

      {copyText && (
        <Form.Group className="mt-4">
          <Form.Label>Copy/Paste Result</Form.Label>
          <Form.Control 
            as="textarea" 
            value={copyText} 
            readOnly 
            rows="4" 
            onClick={(e) => e.target.select()} 
          />
        </Form.Group>
      )}
    </Form>
  );
}

export default RewardForm;
