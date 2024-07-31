'use client'
import { useState } from 'react'

import { FlexGrid, Row, Column } from '@carbon/react'
import { Form, Button, Checkbox, CodeSnippet, DatePicker, DatePickerInput, RadioButton, RadioButtonGroup, TextInput } from '@carbon/react'

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
  const [applicantName, setApplicantName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [indigenous, setIndigenous] = useState(false);
  const [nationality, setNationality] = useState('');
  
  // Hook for toggling visibility of NationalityInput
  const [showNationalityInput, setShowNationalityInput] = useState(false);

  // Hook for JSON string
  const [json, setJson] = useState('');
  
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

  const submit = () => {
    // Construct and format JSON object as a string
    // The lack of indentation within the template literal is necessary for the string to render correctly
    const formString = `{
  "applicantName": "${applicantName}",
  "maritalStatus": "${maritalStatus}",
  "address": "${address}",
  "birthDate": "${birthDate}",
  "email": "${email}",
  "phone": "${phone}",
  "indigenous": ${indigenous},
  "nationality": "${nationality}"
}`
    setJson(formString)
  }

  return (
    <FlexGrid>
      <Row>
        <Column>
          <header>
            <h1>Ministry of Social Development and Poverty Reduction</h1>
          </header>

          <main>
            <Form aria-label="form body" action={submit}>
              <TextInput id="applicant-name" labelText="Applicant Name (required)" required={true} value={applicantName} onChange={e => setApplicantName(e.target.value)} />
              <RadioButtonGroup legendText="Marital Status" name="Marital Status" orientation="horizontal" defaultChecked={false} value={maritalStatus} onChange={v => setMaritalStatus(v)} >
                <RadioButton id="married" labelText="Married" value="married" />
                <RadioButton id="common-law" labelText="Living common-law" value="common-law" />
                <RadioButton id="separated" labelText="Separated" value="separated" />
                <RadioButton id="widowed" labelText="Widowed" value="widowed" />
                <RadioButton id="divorced" labelText="Divorced" value="divorced" />
                <RadioButton id="single" labelText="Single" value="single" />
              </RadioButtonGroup>
              <TextInput id="canadian-address" labelText="Canadian Address" onChange={e => setAddress(e.target.value)} value={address} />
              <DatePicker datePickerType="single" value={birthDate} onChange={e => setBirthDate(e[0])}>
                <DatePickerInput id="date-of-birth" labelText="Date of Birth" placeholder="mm/dd/yyyy" />
              </DatePicker>
              <TextInput id="email" labelText="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <TextInput id="phone" labelText="Canadian Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
              <Checkbox  id="Indigenous" labelText="I identify as Indigenous" onChange={(event, { checked, id }) => toggleNationalityInput(event, { checked, id })} />
              <NationalityInput show={showNationalityInput} value={nationality} onChange={e => setNationality(e.target.value)} />
              <Button type="submit">Submit</Button>
            </Form>
            <div>
              <CodeSnippet type="multi" feedback="Copied to clipboard">{json}</CodeSnippet>
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
