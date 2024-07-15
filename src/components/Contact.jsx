import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { styles } from '../style'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'



const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: [value] })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    // template_y640w0g from template/setting
    // service_7n85fdo from services
    // YacyubX8K8-0QD0q9 by clicking on name we get this id
    emailjs.send(
      'service_7n85fdo',
      'template_y640w0g',
      {
        from_name: form.name,
        to_name: "Viney",
        from_email: form.email,
        to_email: "aroraviney2004@gmail.com",
        message: form.message
      },
      'YacyubX8K8-0QD0q9'
    )
      .then(() => {
        setLoading(false);
        alert("Thank You, I will get back to you as soon as possible.");
        setForm({
          name: '',
          email: '',
          message: '',
        })
      },(error) => {
        setLoading(false);
        console.log(error)
        alert("Something went wrong.")
      })
  }
  return (
    <div
      className='xl:mt-12 xl:flex-row flex-col-reverse 
    flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input type="text" name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary 
        text-white rounded-lg border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input type="email" name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary 
        text-white rounded-lg border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea rows="7"
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary 
        text-white rounded-lg border-none font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold
          shadow-md shadow-primary rounded-xl'
          >
            {loading ? 'Sending...' : "Send"}
          </button>
        </form>
      </motion.div>
      {/* Earth canvas */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] text-white'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")