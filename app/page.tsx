'use client'
import { useState } from 'react'

import { FlexGrid, Row, Column } from '@carbon/react'
import { Form, Button, Checkbox, DatePicker, DatePickerInput, RadioButton, RadioButtonGroup, TextInput } from '@carbon/react'

function NationalityInput({ show, value, onChange }) {
  if (show) {
    return (
      <TextInput id="nationality" labelText="Nationality" value={value} onChange={onChange} />
    );
  } else {
    return null;
  }
}

export default function Home() {
  // Hooks for form fields
  const [indigenous, setIndigenous] = useState(false);
  const [nationality, setNationality] = useState('');
  
  // Hook for toggling visibility of NationalityInput
  const [showNationalityInput, setShowNationalityInput] = useState(false);
  
  // Toggle visibility of NationalityInput
  const toggleNationalityInput = (event, { checked: indigenous, id }) => { 
    if (indigenous) {
      setShowNationalityInput(true); 
    } else {
      setShowNationalityInput(false);
      setNationality(''); // clear NationalityInput value
    }
    setIndigenous(indigenous)
  }
  return (
    <FlexGrid>
      <Row>
        <Column>
          <header>
            <h1>Ministry of Social Development and Poverty Reduction</h1>
          </header>

          <main>
            <Form aria-label="form body">
              <TextInput id="applicant-name" labelText="Applicant Name (required)" required={true} />
              <RadioButtonGroup legendText="Marital Status" name="Marital Status" orientation="vertical" defaultChecked={false} >
                <RadioButton id="married" labelText="Married" value="married" />
                <RadioButton id="common-law" labelText="Living common-law" value="common-law" />
                <RadioButton id="separated" labelText="Separated" value="separated" />
                <RadioButton id="widowed" labelText="Widowed" value="widowed" />
                <RadioButton id="divorced" labelText="Divorced" value="divorced" />
                <RadioButton id="single" labelText="Single" value="single" />
              </RadioButtonGroup>
              <TextInput id="canadian-address" labelText="Canadian Address" />
              <DatePicker datePickerType="single">
                <DatePickerInput id="date-of-birth" labelText="Date of Birth" placeholder="mm/dd/yyyy" />
              </DatePicker>
              <TextInput id="email" labelText="Email" />
              <TextInput id="phone" labelText="Canadian Phone Number" />
              <Checkbox  id="Indigenous" labelText="I identify as Indigenous" onChange={(event, { checked, id }) => toggleNationalityInput(event, { checked, id })} />
              <NationalityInput show={showNationalityInput} value={nationality} onChange={e => setNationality(e.target.value)} />
              <Button type="submit">Submit</Button>
            </Form>
            <div>
              
            </div>
          </main>

          <footer>
            <div>
              This is not an official BC SDPR form! This is Joh Yoshida's submission for the ISL 18R Full Stack Developer competition. Thank you for your consideration :)
            </div>
          </footer>
        </Column>
      </Row>
    </FlexGrid>
  );
}
