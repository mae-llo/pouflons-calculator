import { forwardRef } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FieldPathByValue, UseFormReturn } from 'react-hook-form';
import { badges, CharacterFields, FormFields } from './form.types';

type CharacterFormProps = {
  form: UseFormReturn<FormFields>;
  name: FieldPathByValue<FormFields, CharacterFields>;
  onRemove: () => void;
};
const CharacterForm = forwardRef<HTMLDivElement, CharacterFormProps>(
  function CharacterForm(props, ref) {
    const { form, name, onRemove } = props;
    const { register } = form;
    return (
      <div ref={ref} className="d-flex flex-column gap-3">
        <h6>Character Details</h6>
        <Form.Group controlId={`${name}.name`}>
          <Form.Label>Character Name</Form.Label>
          <Form.Control
            type="text"
            {...register(`${name}.name`)}
            placeholder="Enter character name"
          />
        </Form.Group>

        <Row>
          <Form.Group as={Col} controlId={`${name}.badges.0`}>
            <Form.Label>Badge 1</Form.Label>
            <Form.Select {...register(`${name}.badges.0`)}>
              <option value="">Select a badge</option>
              {badges.map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId={`${name}.badges.1`}>
            <Form.Label>Badge 2</Form.Label>
            <Form.Select {...register(`${name}.badges.1`)}>
              <option value="">Select a badge</option>
              {badges.map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId={`${name}.badges.2`}>
            <Form.Label>Badge 3</Form.Label>
            <Form.Select {...register(`${name}.badges.2`)}>
              <option value="">Select a badge</option>
              {badges.map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <h6>Character Bonuses</h6>
        <Form.Group controlId={`${name}.overachiever`}>
          <Form.Check
            type="checkbox"
            inline
            {...register(`${name}.overachiever`)}
          />
          <Form.Label>Overachiever Badge (5c)</Form.Label>
        </Form.Group>
        <Form.Group controlId={`${name}.wanderberry`}>
          <Form.Check
            type="checkbox"
            inline
            {...register(`${name}.wanderberry`)}
          />
          <Form.Label>Wanderberry Badge (2c)</Form.Label>
        </Form.Group>
        <Form.Group controlId={`${name}.redBandana`}>
          <Form.Check
            type="checkbox"
            inline
            {...register(`${name}.radBandana`)}
          />
          <Form.Label>Rad Bandana (1c)</Form.Label>
        </Form.Group>
        <Button
          variant="link"
          onClick={onRemove}
          className="position-absolute bottom-0 end-0 m-2"
        >
          Remove Character
        </Button>
      </div>
    );
  },
);

export { CharacterForm };
