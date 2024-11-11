import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

function CharacterBadgeForm({ onCharactersChange }) {
  const badges = ['Agriculture','Art','Astronomy','Athletics','Aviator','Beloved','Boss','Buddy','Chivalrous','Clumsy','Commoner','Dancer','Detective','Eloquent','Flirty','Floriculture','Foodie','Geology','Healer','Hospitality','Inventor','Lazybones','Loner','Macabre','Merchant','Meteorology','Music','Nobility','Nurturing','Party','Performer','Ranger','Safari','Scholar','Seafarer','Smith','Tailor','Tamer','Thief','Traveler','Trickster','Urchin','Woodworker','Captain','City Guard','Hired Sword','Instructor','Royal Messanger','Scout','Squire','Templar','Village Guard','Air','Candle','Earth','Fire','Ice','Nature','Potion','Seeker','Water']
  const [showForm, setShowForm] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [badge1, setBadge1] = useState('');
  const [badge2, setBadge2] = useState('');
  const [badge3, setBadge3] = useState('');
  const [overachiever, setOverachiever] = useState(false);
  const [wanderberry, setWanderberry] = useState(false);
  const [characters, setCharacters] = useState([]);

  // Function to get badge values based on conditions
  const getBadgeValue = (badge) => {
    if (badge === "Tamer") return 2;
    if ((badge === "Nurturing" || badge === "Agriculture") && wanderberry) return 2;
    return 1;
  };

  // Calculate the total badge value including Wanderberry (2c) and Overachiever (5c)
  const calculateTotalBadgeValue = (badges) => {
    let totalValue = 0;

    // Add values of each badge
    badges.forEach((badge) => {
      totalValue += getBadgeValue(badge);
    });

    // Add value for Wanderberry (2c)
    if (wanderberry) {
      totalValue += 2;
    }

    // Add value for Overachiever (5c)
    if (overachiever) {
      totalValue += 5;
    }

    return totalValue;
  };

  const handleAddCharacter = () => {
    const badges = [badge1, badge2, badge3].filter(Boolean);
    const totalBadgeValue = calculateTotalBadgeValue(badges);

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
    onCharactersChange(updatedCharacters);

    // Reset form fields
    setCharacterName('');
    setBadge1('');
    setBadge2('');
    setBadge3('');
    setOverachiever(false);
    setWanderberry(false);
  };

  return (
    <div>
      <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Character Badge Form" : "Add Character and Badges"}
      </Button>

      {showForm && (
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
              label="Overachiever Badge"
              checked={overachiever}
              onChange={(e) => setOverachiever(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Wanderberry Badge"
              checked={wanderberry}
              onChange={(e) => setWanderberry(e.target.checked)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddCharacter}>
            Add Character and Badges
          </Button>
        </div>
      )}

      <div className="mt-3">
        <h5>Added Characters:</h5>
        {characters.map((char, index) => (
          <div key={index} className="p-2 mb-2 border rounded bg-light">
            <strong>{char.characterName}</strong>
            <div>
              Badges:{" "}
              {char.badges.map((badge, i) => (
                <span key={i}>
                  {badge.name} ({badge.value}c)
                  {i < char.badges.length - 1 ? " + " : ""}
                </span>
              ))}
            </div>
            <div>Overachiever Badge: {char.overachiever ? "Yes (5c)" : "No"}</div>
            <div>Wanderberry Badge: {char.wanderberry ? "Yes (2c)" : "No"}</div>
            <div>Total Badge Value: {char.totalBadgeValue}c</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterBadgeForm;
