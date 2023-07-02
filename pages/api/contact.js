// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { transporter, mailOptions } = require("../../config/nodemailer")

const CONTACT_MESSAGE_FIELDS = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message'
}

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) => 
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    "")

  const htmlData = Object.entries(data).reduce(
    (str, [key, val]) => 
      (str += `<h1 style="font-size:20px;">${CONTACT_MESSAGE_FIELDS[key]}</h1><p>${val}</p>`), 
    "")
  

  return {
    text: stringData,
    html: `${htmlData}`
  }
}

const handler = async (req, res)  => {
  if (req.method ===   "POST") {
    //const { name, email, subject, message} = req.body
    const data = req.body
    if (!data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).json({message: "Bad request" })
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: data.subject,
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({message: error.message })
    }
  }

  return res.status(400).json({message: "Bad request" })
}

module.exports = handler