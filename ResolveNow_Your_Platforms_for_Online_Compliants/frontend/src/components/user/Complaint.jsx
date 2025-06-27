import axios from 'axios'
import React, { useState } from 'react'
import '../styles/Complaint.css'

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [userComplaint, setUserComplaint] = useState({
    userId: user?._id || '',
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserComplaint({ ...userComplaint, [name]: value })
  }

  const handleClear = () => {
    setUserComplaint({
      userId: user?._id || '',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint)
      alert('Your Complaint has been sent!')
      handleClear()
    } catch (err) {
      console.error(err)
      alert('Something went wrong!')
    }
  }

  return (
    <div className="complaint-box">
      <form onSubmit={handleSubmit} className="compliant-form row">
        {[{ label: 'Name', name: 'name' },
          { label: 'Address', name: 'address' },
          { label: 'City', name: 'city' },
          { label: 'State', name: 'state' },
          { label: 'Pincode', name: 'pincode' },
          { label: 'Status', name: 'status', placeholder: 'type pending' }
        ].map(({ label, name, placeholder }) => (
          <div className="col-md-6 p-3" key={name}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input
              id={name}
              name={name}
              type="text"
              className="form-control"
              value={userComplaint[name]}
              onChange={handleChange}
              placeholder={placeholder || ''}
              required
            />
          </div>
        ))}

        <div className="col-12 p-3">
          <label htmlFor="comment" className="form-label">Description</label>
          <textarea
            id="comment"
            name="comment"
            className="form-control"
            value={userComplaint.comment}
            onChange={handleChange}
            rows="4"
            placeholder="Enter your complaint details..."
            required
          />
        </div>

        <div className="text-center col-12">
          <button type="submit" className="btn btn-success mt-3">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Complaint
