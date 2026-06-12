import { useState } from "react";
import axios from "axios";
import { FiClock, FiMail, FiMapPin, FiPhoneCall, FiSend } from "react-icons/fi";
import { company } from "../data/siteData";
import "./Contact.css";

const CONTACT_INFO = [
  {
    icon: FiMapPin,
    label: "Head office",
    value: company.headOffice,
  },
  {
    icon: FiMapPin,
    label: "Guwahati Branch",
    value: (
      <>
        Santi Basti, Amsing Jorabat, (Narangi Army Cantt)
        <br />
        Guwahati - 781027, ASSAM
        <br />
        Mob - 9085184086
      </>
    ),
  },
  {
    icon: FiPhoneCall,
    label: "Phone Number",
    value: `${company.phone} , ${company.phoneAlt}`,
  },
  {
    icon: FiMail,
    label: "Email Address",
    value: company.email,
  },
  {
    icon: FiClock,
    label: "Working Hours",
    value: company.hours,
  },
];

const SERVICES = [
  "Printing Machines",
  "Machine Repair",
  "Installation",
  "Technical Support",
  "Spare Parts",
];

function Contact_Us() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      setLoading(true);

      await axios.post("https://osr-solutions.onrender.com/api/contact", {
        name: `${form.first} ${form.last}`,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      });

      setSent(true);

      setForm({
        first: "",
        last: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-bg">
      <div className="contact-shell">
        <div className="contact-head reveal">
          <span className="eyebrow">Contact Us</span>
          <h2>
            Let's Work
            <span>Together</span>
          </h2>
          <p>Need printing machines, installation, servicing, or technical support? Contact our experts today.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-left reveal">
            <div className="contact-list">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="ci" key={item.label}>
                    <div className="ci-icon">
                      <Icon />
                    </div>
                    <div>
                      <div className="ci-label">{item.label}</div>
                      <div className="ci-val">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-box reveal">
            <h3 className="form-h3">Send Message</h3>

            <div className="form-row">
              <div className="fg">
                <label>First Name</label>
                <input
                  name="first"
                  placeholder="Rahul"
                  value={form.first}
                  onChange={handle}
                />
              </div>

              <div className="fg">
                <label>Last Name</label>
                <input
                  name="last"
                  placeholder="Sharma"
                  value={form.last}
                  onChange={handle}
                />
              </div>
            </div>

            <div className="fg">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="rahul@email.com"
                value={form.email}
                onChange={handle}
              />
            </div>

            <div className="fg">
              <label>Phone</label>
              <input
                name="phone"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={handle}
              />
            </div>

            <div className="fg">
              <label>Service Needed</label>
              <select name="service" value={form.service} onChange={handle}>
                <option value="">Select Service</option>
                {SERVICES.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="fg">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your requirement..."
                value={form.message}
                onChange={handle}
              />
            </div>

            <button
              className={`btn-submit ${sent ? "sent" : ""}`}
              onClick={submit}
              disabled={loading}
            >
              <FiSend />
              {loading ? "Sending..." : sent ? "Message Sent" : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact_Us;
