'use client'
import { useState } from 'react'
import { FlexGrid, Row, Column } from '@carbon/react'
import { Form, Button, Checkbox, CodeSnippet, DatePicker, DatePickerInput, RadioButton, RadioButtonGroup, TextInput } from '@carbon/react'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import Image from 'next/image'
import logo from '../public/SDPR logo.png'

function NationalityInput({ show, value, onChange }) {
  if (show) {
    return (
      <TextInput id="nationality" labelText="Nationality" className="field-margin" value={value} onChange={onChange} />
    );
  } else {
    return null;
  }
}

function CodeWindow({ show, json }) {
  if (show) {
    return (
      <CodeSnippet type="multi" feedback="Copied to clipboard">{json}</CodeSnippet>
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
  
  // Hook for toggling visibility of components
  const [showNationalityInput, setShowNationalityInput] = useState(false);
  const [showCodeWindow, setShowCodeWindow] = useState(false);

  // Hooks for validations
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

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

  const validateEmail = (email) => {
    // Sourced from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    return isValidPhoneNumber(phone, "CA")
  }

  const submit = () => {
    // Check validations
    if (email && !validateEmail(email)) {
      // Email validation failed
      setInvalidEmail(true)
      return
    }
    if (phone && !validatePhone(phone)) {
      // Phone number validation failed
      setInvalidPhone(true)
      return
    }
    // Format phone number
    let num; 
    if (phone) {
      num = parsePhoneNumber(phone, "CA")
      num = num.format("NATIONAL")    
      setPhone(num)
    } else [
      num = ""
    ]
    // Construct and format JSON object as a string
    // The lack of indentation within the template literal is necessary for the string to render correctly
    const formString = `{
  "applicantName": "${applicantName}",
  "maritalStatus": "${maritalStatus}",
  "address": "${address}",
  "birthDate": "${birthDate}",
  "email": "${email}",
  "phone": "${num}",
  "indigenous": ${indigenous},
  "nationality": "${nationality}"
}`
    // Set JSON and make code window visible
    setJson(formString)
    setShowCodeWindow(true)
  }

  return (
    <FlexGrid>
      <header className="header" >
        <div className="image">
          <Image 
            src={logo} 
            width={123 * 2.33}
            height={123}
            priority={true}
            placeholder="blur"
            alt="Fake logo for the Ministry of Social Development and Poverty Reduction" 
          />
        </div>
        <div className="title">
          <h1>Applicant Form</h1>
          <h2>ISD Forms Modernization</h2>
        </div>
      </header>
      <Row>
        <Column>
          <main>
            <Form aria-label="form body" action={submit}>              
              <TextInput 
                id="applicant-name" 
                labelText="Applicant Name (required)" 
                className="field-margin" 
                required={true} 
                value={applicantName} 
                onChange={e => setApplicantName(e.target.value)} 
              />
              <RadioButtonGroup 
                legendText="Marital Status" 
                name="Marital Status" 
                orientation="vertical" 
                className="field-margin" 
                defaultChecked={false} 
                value={maritalStatus} 
                onChange={v => setMaritalStatus(v)} 
              >
                <RadioButton id="married" value="married" labelText="Married" />
                <RadioButton id="common-law" value="common-law" labelText="Living common-law" />
                <RadioButton id="separated" value="separated" labelText="Separated" />
                <RadioButton id="widowed" value="widowed" labelText="Widowed" />
                <RadioButton id="divorced" value="divorced" labelText="Divorced" />
                <RadioButton id="single" value="single" labelText="Single" />
              </RadioButtonGroup>
              <TextInput id="canadian-address" labelText="Canadian Address" className="field-margin" value={address} onChange={e => setAddress(e.target.value)} />
              <DatePicker datePickerType="single" className="field-margin" value={birthDate} onChange={e => setBirthDate(e[0])}>
                <DatePickerInput id="date-of-birth" labelText="Date of Birth" placeholder="mm/dd/yyyy" className="field-margin" />
              </DatePicker>
              <TextInput 
                id="email" 
                labelText="Email" 
                className="field-margin" 
                invalidText="Please provide a valid email address" 
                value={email} 
                invalid={invalidEmail} 
                onChange={e => {
                  setEmail(e.target.value)
                  setInvalidEmail(false)
                }} 
              />
              <TextInput 
                id="phone" 
                labelText="Canadian Phone Number"
                className="field-margin" 
                placeholder="(123) 456 7890" 
                invalid={invalidPhone}
                invalidText="Please enter a valid Canadian phone number"
                value={phone} 
                onChange={e => {
                  setPhone(e.target.value)
                  setInvalidPhone(false)
                }} 
              />
              <Checkbox 
                id="Indigenous" 
                labelText="I identify as Indigenous" 
                className="field-margin" 
                onChange={(event, { checked, id }) => toggleNationalityInput(event, { checked, id })} 
              />
              <NationalityInput show={showNationalityInput} value={nationality} onChange={e => setNationality(e.target.value)} />
              <Button type="submit" className="button-margin">Submit</Button>
            </Form>
            <div>
              <CodeWindow show={showCodeWindow} json={json}/>
            </div>
          </main>

          <footer>
            <div>
              <p>This is not an official BC SDPR form!</p>
              <p>This is Joh Yoshida{`'`}s submission for the ISL 18R Full Stack Developer competition.</p> 
              <p>Thank you for your consideration :{`)`}</p>
            </div>
          </footer>
        </Column>
      </Row>
    </FlexGrid>
  );
}
