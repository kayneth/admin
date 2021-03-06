import {
  BooleanInput,
  DateInput,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  TextInput,
} from 'admin-on-rest';
import React from 'react';
import getReferenceNameField from './getReferenceNameField';

export default (field, options) => {
  const props = {...field.inputProps};
  if (field.input) {
    return (
      <field.input
        key={field.name}
        options={options}
        source={field.name}
        {...props}
      />
    );
  }

  if (!props.validate && field.required) props.validate = [required];

  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return (
        <ReferenceInput
          key={field.name}
          label={field.name}
          reference={field.reference.name}
          source={field.name}
          {...props}
          allowEmpty>
          <SelectInput optionText={getReferenceNameField(field.reference)} />
        </ReferenceInput>
      );
    }

    return (
      <ReferenceArrayInput
        key={field.name}
        label={field.name}
        reference={field.reference.name}
        source={field.name}
        {...props}
        allowEmpty>
        <SelectArrayInput optionText={getReferenceNameField(field.reference)} />
      </ReferenceArrayInput>
    );
  }

  switch (field.range) {
    case 'http://www.w3.org/2001/XMLSchema#integer':
      return <NumberInput key={field.name} source={field.name} {...props} />;

    case 'http://www.w3.org/2001/XMLSchema#decimal':
      return (
        <NumberInput
          key={field.name}
          source={field.name}
          step="0.1"
          {...props}
        />
      );

    case 'http://www.w3.org/2001/XMLSchema#boolean':
      return <BooleanInput key={field.name} source={field.name} {...props} />;

    case 'http://www.w3.org/2001/XMLSchema#date':
    case 'http://www.w3.org/2001/XMLSchema#dateTime':
      return <DateInput key={field.name} source={field.name} {...props} />;

    default:
      return <TextInput key={field.name} source={field.name} {...props} />;
  }
};
