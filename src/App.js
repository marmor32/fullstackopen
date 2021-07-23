import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons'
import personServices from './services/persons'
import Notification from './components/notification';

function App() {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ msg, setMsg ] = useState(null)
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    const all_names = persons.map(person => person.name)
    if (all_names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    personServices.create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewNumber('')
      setNewName('')
      setMsg(`added ${response.data.name}`)
    })
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))
        
  const row_names = () => personsToShow.map(person => {
    return(
      <div key={person.name}>
        <p key={person.name}>{person.name} {person.number}</p>
        <button onClick={() => deletePerson(person)}>delete</button>
      </div>
     )
    }
  )
  const deletePerson = (person) => {
    if(window.confirm(`confirm deletion of ${person.name}`)) {
      personServices.deletePerson(person.id)
      setPersons(persons.filter(n => n.name !== person.name))
    }
  }
  useEffect(() => {
    personServices.getAll()
      .then(response => setPersons(response.data))
  },[])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <Notification msg={msg} timeout={() => setMsg(null)} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={{value: newName, onChange: handleNameChange}}
        number={{value: newNumber, onChange: handleNumberChange}}
      />
      <h2>Numbers</h2>
      <Persons persons={row_names()} />
    </div>
  )
}

export default App;