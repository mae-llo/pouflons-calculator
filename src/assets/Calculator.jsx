import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import CharacterBadgeForm from './CharacterBadgeForm';

function RewardForm() {
  const [baseReward, setBaseReward] = useState(0);
  const [wcReq, setWcReq] = useState(0);
  const [wcSubm, setWcSubm] = useState(0);

  const [items, setItems] = useState({
    radBandana: false,
    plainSatchel: false,
    badgeOMatic: false,
  });
  
  const [bonuses, setBonuses] = useState({
    sceneSetting: false,
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

  const [copyText, setCopyText] = useState('');

  const calculateRewards = () => {
    let totalCoins = parseInt(baseReward);
    let breakdown = `Base Rewards: ${baseReward} coins\n`;

    // Applicable Items
    if (items.radBandana) {
      breakdown += `Rad Bandana: 1 coin\n`;
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

    breakdown += `\nTotal Coins: ${totalCoins}`;

    // Set the formatted text to copy
    setCopyText(breakdown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRewards();
  };

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

      <CharacterBadgeForm
  onCharacterBadgeChange={(characterData) => {

  }}
/>

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
