import { forwardRef } from 'react';
import { FieldPathByValue, UseFormReturn } from 'react-hook-form';
import { Button } from './components/button';
import { Checkbox } from './components/checkbox';
import { Input } from './components/input';
import { Select } from './components/select';
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
      <div ref={ref} className="flex flex-col gap-3">
        <h4>Character Details</h4>
        <div className="absolute top-2 right-2">
          <Button variant="link" color="red" onClick={onRemove}>
            Remove Character
          </Button>
        </div>
        <Input
          label="Character Name"
          {...register(`${name}.name`)}
          placeholder="Enter character name"
        />

        <div className="grid grid-cols-3 gap-4">
          <Select label="Badge 1" {...register(`${name}.badges.0`)}>
            <option value="">Select a badge</option>
            {badges.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </Select>
          <Select label="Badge 2" {...register(`${name}.badges.1`)}>
            <option value="">Select a badge</option>
            {badges.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </Select>
          <Select label="Badge 3" {...register(`${name}.badges.2`)}>
            <option value="">Select a badge</option>
            {badges.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </Select>
        </div>
        <h4>Character Bonuses</h4>
        <div className="flex flex-col">
          <Checkbox
            label="Overachiever Badge (5c)"
            {...register(`${name}.overachiever`)}
          />
          <Checkbox
            label="Wanderberry Badge (2c)"
            {...register(`${name}.wanderberry`)}
          />
          <Checkbox
            label="Rad Bandana (1c)"
            {...register(`${name}.radBandana`)}
          />
        </div>
      </div>
    );
  },
);

export { CharacterForm };
